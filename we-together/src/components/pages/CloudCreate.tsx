import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Alert, Button, DatePicker, Flex, Form, Input, message, Spin } from "antd";
import { CopyOutlined, DoubleRightOutlined, LoadingOutlined, ShareAltOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { createCloud } from "../../api/createCloud";
import type { Couple, CoupleRole } from "../../api/createCloud";
import { ApiError, getCloudError } from "../../api/client";
import { createInvitation } from "../../api/invitation";
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import { page } from "../../styles/components-styles/background.css";
import { cloudPage } from "../../styles/components-styles/cloud.css";
import { datePicker, input } from "../../styles/components-styles/common.css";
import Background from "../Background";
import Footer from "../Footer";
import Header from "../Header";
import successImg from "../../assets/success.svg";

interface CloudSettings {
  cloudName: string;
  datingStart: Dayjs;
  weddingDay?: Dayjs;
}

const CloudCreate = () => {
  const { t } = useTranslation("cloud");
  const navigate = useNavigate();
  const [form] = Form.useForm<CloudSettings>();
  const cloudName = Form.useWatch("cloudName", form);
  const datingStart = Form.useWatch("datingStart", form);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [createdRole, setCreatedRole] = useState<CoupleRole>();
  const [createdName, setCreatedName] = useState<string>();
  const [createdMembers, setCreatedMembers] = useState<Couple["members"]>();
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (values: CloudSettings) => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const couple = await createCloud({
        title: values.cloudName.trim(),
        together_since: values.datingStart.format("YYYY-MM-DD"),
        ...(values.weddingDay ? { wedding_date: values.weddingDay.format("YYYY-MM-DD") } : {}),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      });
      setCreatedRole(couple.my_role);
      setCreatedName(couple.members.find(member => member.role === couple.my_role)?.display_name);
      setCreatedMembers(couple.members);
      setCreated(true);
      const invitation = await createInvitation();
      setInvitationCode(invitation.code);
    } catch (caught: unknown) {
      if (caught instanceof ApiError && (caught.code === "invalid_token" || caught.code === "missing_token")) {
        navigate("/login");
        return;
      }
      setError(getCloudError(caught));
    } finally {
      setLoading(false);
    }
  };

  const retryInvitation = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const invitation = await createInvitation();
      setInvitationCode(invitation.code);
    } catch (caught: unknown) {
      if (caught instanceof ApiError && (caught.code === "invalid_token" || caught.code === "missing_token")) {
        navigate("/login");
        return;
      }
      setError(getCloudError(caught));
    } finally {
      setLoading(false);
    }
  };

  const invitationLink = invitationCode
    ? `${window.location.origin}/cloud/join?code=${encodeURIComponent(invitationCode)}`
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      message.success(t("create.linkCopied"));
    } catch {
      message.error(t("create.copyFailed"));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url: invitationLink });
      } catch (caught: unknown) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        message.error(t("create.shareFailed"));
      }
    } else {
      await handleCopy();
    }
  };

  return (
    <div className={page}>
      <Background page={createdRole ?? "creator"} />
      <Header type="backLogo" />
      <div className={cloudPage}>
        <Flex vertical gap={10}>
          <Title style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{t("create.title")}</Title>
          {!created && !loading && (
            <section>
              <Form form={form} requiredMark={false} layout="vertical" onFinish={handleCreate}>
                {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
                <Form.Item name="cloudName" label={t("create.cloudName")} rules={[{ required: true, whitespace: true, message: t("create.nameRequired") }]}>
                  <Input className={input} placeholder={t("create.cloudNamePlaceholder")} />
                </Form.Item>
                <Form.Item name="datingStart" label={t("create.datingStart")} rules={[{ required: true, message: t("create.datingStartRequired") }]}>
                  <DatePicker format="DD/MM/YYYY" className={datePicker} placeholder={t("create.datePlaceholder")} />
                </Form.Item>
                <Form.Item name="weddingDay" label={t("create.weddingDate")}>
                  <DatePicker format="DD/MM/YYYY" className={datePicker} placeholder={t("create.datePlaceholder")} />
                </Form.Item>
                <Form.Item label={null}>
                  <Button className={filledButton} block htmlType="submit" disabled={!cloudName?.trim() || !datingStart?.isValid()} color="primary" variant="filled" size="large" shape="round">{t("create.button")}</Button>
                </Form.Item>
              </Form>
            </section>
          )}
          {loading && (
            <Flex vertical style={{ height: "80vh" }} justify="center" align="center" gap={12}>
              <Spin size="large" indicator={<LoadingOutlined />} />
              <Text style={{ color: "#EA006B" }}>{t("create.title")}</Text>
            </Flex>
          )}
          {created && !loading && (
            <Flex vertical style={{ minHeight: "80vh" }} justify="center" align="center" gap={36}>
              <Flex vertical gap={16} justify="center" align="center">
                <img width={240} src={successImg} alt="" />
                <Text style={{ color: "#EA006B", fontWeight: 600 }}>{t("create.created")}</Text>
              </Flex>
              {error && <Alert type="error" showIcon message={`${t("create.invitationFailed")} ${error}`} />}
              {invitationCode ? (
                <Flex vertical gap={16} style={{ width: 300, maxWidth: "100%" }}>
                  <Input className={input} value={invitationLink} readOnly suffix={<CopyOutlined onClick={handleCopy} style={{ cursor: "pointer" }} />} />
                  <Button className={outlinedButton} onClick={handleShare} icon={<ShareAltOutlined />} color="primary" variant="outlined" size="middle" shape="round">{t("create.share")}</Button>
                </Flex>
              ) : (
                <Button className={outlinedButton} onClick={retryInvitation} color="primary" variant="outlined" size="middle" shape="round">{t("create.retryInvitation")}</Button>
              )}
              <Button className={filledButton} onClick={() => navigate("/")} icon={<DoubleRightOutlined />} iconPlacement="end" color="primary" variant="filled" size="large" shape="round">{t("create.goToCloud")}</Button>
            </Flex>
          )}
        </Flex>
      </div>
      <Footer role={createdRole} displayName={createdName} members={createdMembers} />
    </div>
  );
};

export default CloudCreate;
