import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router";
import { Alert, Button } from "antd";
import Title from "antd/es/typography/Title";
import { ApiError, getCloudError } from "../../api/client";
import { getMyCouple } from "../../api/createCloud";
import type { Couple } from "../../api/createCloud";
import { getCouplePreview } from "../../state/coupleNavigation";
import type { CoupleNavigationState, CouplePreview } from "../../state/coupleNavigation";
import { getRememberedDisplayName } from "../../state/currentUser";
import { page } from "../../styles/components-styles/background.css";
import { filledButton } from "../../styles/components-styles/button.css";
import { profileContent } from "../../styles/components-styles/profile.css";
import Background from "../Background";
import Footer from "../Footer";
import Header from "../Header";

type SettingsState =
  | { status: "loading"; couple: CouplePreview | null | undefined }
  | { status: "ready"; couple: Couple | null }
  | { status: "unauthorized" }
  | { status: "error"; message: string; couple: CouplePreview | null | undefined };

const ProfileSettings = () => {
  const { t } = useTranslation("profile");
  const location = useLocation();
  const initialDisplayName = (location.state as CoupleNavigationState | null)?.displayName;
  const [state, setState] = useState<SettingsState>(() => ({
    status: "loading",
    couple: getCouplePreview(location.state),
  }));
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;

    getMyCouple().then(
      couple => { if (active) setState({ status: "ready", couple }); },
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
    return <Navigate to="/login?next=%2Fprofile%2Fsettings" replace />;
  }

  const { couple } = state;
  const displayName = initialDisplayName || couple?.members.find(member => member.role === couple.my_role)?.display_name || getRememberedDisplayName() || "";
  const navigationState: CoupleNavigationState = {
    role: couple?.my_role,
    members: couple?.members,
    daysTogether: couple?.days_together,
    displayName,
  };

  return (
    <div className={page}>
      {couple !== undefined && <Background page={couple?.my_role ?? "creator"} />}
      <Header type="backLogo" backState={navigationState} />
      <main className={profileContent}>
        <Title level={1} style={{ margin: 0, fontSize: 28 }}>{t("settings")}</Title>
        {state.status === "error" && (
          <>
            <Alert type="error" showIcon message={state.message} />
            <Button className={filledButton} onClick={() => {
              setState({ status: "loading", couple });
              setRetry(value => value + 1);
            }}>{t("retry")}</Button>
          </>
        )}
      </main>
      {couple !== undefined && (
        <Footer
          role={couple?.my_role}
          displayName={displayName}
          members={couple?.members}
          daysTogether={couple?.days_together}
          withNavigation={Boolean(couple)}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
