import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { Alert, Button, Flex, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import { ApiError, getCloudError } from "../../api/client";
import { acceptInvitation, getInvitation } from "../../api/invitation";
import type { InvitationPreview } from "../../api/invitation";
import type { Couple, CoupleRole } from "../../api/createCloud";
import { filledButton } from "../../styles/components-styles/button.css";
import logo from "../../assets/logo.svg";
import successImg from "../../assets/success.svg";
import { margin } from "../../styles/components-styles/custom-list.css";
import { page } from "../../styles/components-styles/background.css";
import Background from "../Background";
import Footer from "../Footer";
import Header from "../Header";

function parseCode(value: string): string | null {
  const trimmed = value.trim();
  if (/^[a-z0-9]{8}$/i.test(trimmed)) return trimmed.toUpperCase();
  try {
    const url = new URL(trimmed);
    const code = url.searchParams.get("code");
    if (code && /^[a-z0-9]{8}$/i.test(code)) return code.toUpperCase();
  } catch {
    // Обычный текст проверяется ниже как неверный код.
  }
  return null;
}

const LinkCloud = () => {
  const { t } = useTranslation("cloud");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("code") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<InvitationPreview | null>(null);
  const [joined, setJoined] = useState(false);
  const [joinedRole, setJoinedRole] = useState<CoupleRole>();
  const [joinedName, setJoinedName] = useState<string>();
  const [joinedMembers, setJoinedMembers] = useState<Couple["members"]>();

  const handleError = (caught: unknown) => {
    if (caught instanceof ApiError && (caught.code === "invalid_token" || caught.code === "missing_token")) {
      navigate(`/login?next=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }
    setError(getCloudError(caught));
  };

  const handleSearch = async () => {
    if (loading) return;
    setError("");
    setPreview(null);
    const code = parseCode(value);
    if (!code) {
      setError(t("join.linkError"));
      return;
    }

    setLoading(true);
    try {
      const invitation = await getInvitation(code);
      if (invitation.status !== "pending") {
        setError(invitation.status === "expired" ? t("join.expired") : t("join.inactive"));
        return;
      }
      setPreview(invitation);
    } catch (caught: unknown) {
      handleError(caught);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!preview || loading) return;
    setLoading(true);
    setError("");
    try {
      const { couple } = await acceptInvitation(preview.code);
      setJoinedRole(couple.my_role);
      setJoinedName(couple.members.find(member => member.role === couple.my_role)?.display_name);
      setJoinedMembers(couple.members);
      setJoined(true);
      setPreview(null);
    } catch (caught: unknown) {
      handleError(caught);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={page}>
      <Background page={joinedRole ?? "invitee"} />
      <Header type="back" />
      <Flex className={margin} vertical justify="center" align="center" gap={32} style={{ minHeight: "80vh" }}>
        <img width={310} src={logo} alt={t("together")} />
        {!joined && (
          <Flex vertical gap={8} align="center" style={{ width: "100%" }}>
            <Text>{t("join.link")}</Text>
            <Input.Search
              value={value}
              placeholder={t("join.linkPlaceholder")}
              onChange={event => {
                setValue(event.target.value);
                setPreview(null);
                setError("");
              }}
              onSearch={handleSearch}
              disabled={loading}
            />
          </Flex>
        )}
        {loading && (
          <Flex vertical justify="center" align="center" gap={12}>
            <Spin size="large" indicator={<LoadingOutlined />} />
            <Text style={{ color: "#EA006B" }}>{t("join.search")}</Text>
          </Flex>
        )}
        {error && <Alert type="error" showIcon message={error} style={{ width: "100%" }} />}
        {preview && !loading && (
          <Flex vertical align="center" gap={12}>
            <Text strong>{preview.couple_title || t("join.untitled")}</Text>
            <Text>{t("join.invitedBy", { name: preview.inviter.display_name })}</Text>
            <Button className={filledButton} onClick={handleAccept} color="primary" variant="filled" size="large" shape="round">{t("join.accept")}</Button>
          </Flex>
        )}
        {joined && !loading && (
          <Flex vertical justify="center" align="center" gap={12}>
            <img width={83} src={successImg} alt="" />
            <Text>{t("join.joined")}</Text>
            <Button className={filledButton} onClick={() => navigate("/")} color="primary" variant="filled" size="large" shape="round">{t("create.goToCloud")}</Button>
          </Flex>
        )}
      </Flex>
      <Footer role={joinedRole} displayName={joinedName} members={joinedMembers} />
    </div>
  );
};

export default LinkCloud;
