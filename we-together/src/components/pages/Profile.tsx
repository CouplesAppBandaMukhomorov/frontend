import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Alert, Button, Divider, Flex } from "antd";
import { ApiError, getCloudError } from "../../api/client";
import { getMyCouple } from "../../api/createCloud";
import type { Couple } from "../../api/createCloud";
import { getMyProfile } from "../../api/users";
import type { UserProfile } from "../../api/users";
import { getCouplePreview } from "../../state/coupleNavigation";
import type { CoupleNavigationState, CouplePreview } from "../../state/coupleNavigation";
import { getRememberedDisplayName, rememberRegisteredUser } from "../../state/currentUser";
import { filledButton } from "../../styles/components-styles/button.css";
import { page } from "../../styles/components-styles/background.css";
import {
  profileContent,
  profileDetailIcon,
  profileDetailRow,
  profileDetailValue,
  profileDetails,
  profileDivider,
  profileMailIcon,
  profilePartnerDetailIcon,
  profilePartnerMailIcon,
  spaceDetailIcon,
  spaceDetailLabel,
  spaceDetailRow,
  spaceDetails,
  spaceDetailText,
  spaceDetailValue,
  spaceTitle,
} from "../../styles/components-styles/profile.css";
import Background from "../Background";
import Footer from "../Footer";
import Header from "../Header";
import ProfileHeader from "../ProfileHeader";
import Text from "antd/es/typography/Text";
import { HeartOutlined, MailOutlined, RubyOutlined } from "@ant-design/icons";
import QuestionnaireCard from "../QuestionnaireCard";

type ProfileState =
  | { status: "loading"; couple: CouplePreview | null | undefined }
  | { status: "ready"; couple: Couple | null }
  | { status: "unauthorized" }
  | { status: "error"; message: string; couple: CouplePreview | null | undefined };

function formatCoupleDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date).replace(/\s*г\.$/, "");
}

const ProfileDetails = ({ email, birthDate, partner = false }: { email: string; birthDate?: string | null; partner?: boolean }) => {
  return (
    <div className={profileDetails}>
      {birthDate && (
        <div className={profileDetailRow}>
          <span className={partner ? profilePartnerDetailIcon : profileDetailIcon} aria-hidden="true" />
          <Text className={profileDetailValue}>{formatCoupleDate(birthDate)}</Text>
        </div>
      )}
      <div className={profileDetailRow}>
        <MailOutlined className={partner ? profilePartnerMailIcon : profileMailIcon} aria-hidden="true" />
        <Text className={profileDetailValue}>{email}</Text>
      </div>
    </div>
  );
};

const Profile = () => {
  const { t } = useTranslation("profile");
  const location = useLocation();
  const navigate = useNavigate();
  const initialDisplayName = (location.state as CoupleNavigationState | null)?.displayName;
  const [state, setState] = useState<ProfileState>(() => ({
    status: "loading",
    couple: getCouplePreview(location.state),
  }));
  const [displayName, setDisplayName] = useState(() => initialDisplayName?.trim() || getRememberedDisplayName() || "");
  const [userProfile, setUserProfile] = useState<UserProfile | null | undefined>();
  const [profileRetry, setProfileRetry] = useState(0);
  const [retry, setRetry] = useState(0);

  const handleClickMyQuestions = () => {
    navigate('/questions/me');
  };

  const handleClickPartnerQuestions = () => {
    navigate('/questions/partner');
  };

  const handleClickCoupleQuestions = () => {
    navigate('/questions/couple');
  }

  useEffect(() => {
    let active = true;

    getMyProfile().then(profile => {
      if (!active) return;
      rememberRegisteredUser(profile.email, profile.display_name);
      setDisplayName(profile.display_name);
      setUserProfile(profile);
    }).catch(() => {
      if (active) setUserProfile(null);
    });

    return () => { active = false; };
  }, [profileRetry]);

  useEffect(() => {
    let active = true;

    getMyCouple().then(
      couple => {
        if (active) setState({ status: "ready", couple });
      },
      (error: unknown) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 404 && error.code === "couple_not_found") {
          setState({ status: "ready", couple: null });
        } else if (error instanceof ApiError && error.status === 401) {
          setState({ status: "unauthorized" });
        } else {
          setState(previous => ({
            status: "error",
            message: getCloudError(error),
            couple: previous.status === "unauthorized" ? undefined : previous.couple,
          }));
        }
      },
    );

    return () => { active = false; };
  }, [retry]);

  if (state.status === "unauthorized") {
    return <Navigate to="/login?next=%2Fprofile" replace />;
  }

  const { couple } = state;
  const space = state.status === "ready" ? state.couple : null;
  const ownMember = couple?.members.find(member => member.id === userProfile?.id)
    ?? couple?.members.find(member => member.role === couple.my_role);
  const ownName = displayName.trim() || ownMember?.display_name || t("profile");
  const partner = ownMember
    ? couple?.members.find(member => member.id !== ownMember.id)
    : couple?.members.find(member => member.role !== couple.my_role);
  const ownEmail = userProfile?.email || (
    userProfile === null ? t("emailLoadError") : t("emailLoading")
  );
  const settingsState: CoupleNavigationState = {
    role: couple?.my_role,
    members: couple?.members,
    daysTogether: couple?.days_together,
    displayName: ownName,
  };

  return (
    <div className={page}>
      {couple !== undefined && <Background page={couple?.my_role ?? "creator"} />}
      <Header type="logo" />
      <main className={profileContent} aria-label={t("profile")}>
        {couple !== undefined && (
          <>
            <ProfileHeader name={ownName} role={couple?.my_role ?? "creator"} showSettings settingsState={settingsState} />
            <ProfileDetails email={ownEmail} birthDate={userProfile?.birth_date} />
            {userProfile === null && (
              <Button type="link" onClick={() => {
                setUserProfile(undefined);
                setProfileRetry(value => value + 1);
              }}>{t("retry")}</Button>
            )}
            <QuestionnaireCard menuTitle={t("questionnaire.me")} menuDescription={t("questionnaire.myPlaceholder")} color="#EA006B" onClick={handleClickMyQuestions} />
          </>
        )}
        {partner && (
          <>
            <Divider className={profileDivider} variant="dotted" size="small" />
            <ProfileHeader name={partner.display_name} role={partner.role} />
            <ProfileDetails email={partner.email?.trim() || t("emailUnavailable")} birthDate={partner.birth_date} partner />
            <QuestionnaireCard menuTitle={t("questionnaire.partner")} menuDescription={t("questionnaire.partnerPlaceholder")} color="#7B0038" onClick={handleClickPartnerQuestions}/>
          </>
        )}
        {space && (
          <>
            <Divider className={profileDivider} variant="dotted" size="small" />
            <h2 className={spaceTitle}>{space.title}</h2>
            <div className={spaceDetails}>
              <div className={spaceDetailRow}>
                <HeartOutlined className={spaceDetailIcon} aria-hidden="true" />
                <div className={spaceDetailText}>
                  <span className={spaceDetailValue}>{formatCoupleDate(space.together_since)}</span>
                  <span className={spaceDetailLabel}>{t("relationshipStart")}</span>
                </div>
              </div>
              {space.wedding_date && (
                <div className={spaceDetailRow}>
                  <RubyOutlined className={spaceDetailIcon} aria-hidden="true" />
                  <div className={spaceDetailText}>
                    <span className={spaceDetailValue}>{formatCoupleDate(space.wedding_date)}</span>
                    <span className={spaceDetailLabel}>{t("weddingDate")}</span>
                  </div>
                </div>
              )}
            </div>
            <QuestionnaireCard menuTitle={t("questionnaire.couple")} menuDescription={t("questionnaire.myPlaceholder")} color="#7B0038" onClick={handleClickCoupleQuestions}/>
          </>
        )}
        {state.status === "error" && (
          <Flex vertical gap={16} align="center">
            <Alert type="error" showIcon message={state.message} />
            <Button className={filledButton} onClick={() => {
              setState({ status: "loading", couple });
              setRetry(value => value + 1);
            }}>{t("retry")}</Button>
          </Flex>
        )}
      </main>
      {couple !== undefined && (
        <Footer
          role={couple?.my_role}
          displayName={ownName}
          members={couple?.members}
          daysTogether={couple?.days_together}
          withNavigation={Boolean(couple)}
        />
      )}
    </div>
  );
};

export default Profile;
