import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import type { CoupleRole } from "../api/createCloud";
import type { CoupleNavigationState } from "../state/coupleNavigation";
import {
  profileAvatar,
  profileAvatarInvitee,
  profileHeader,
  profileName,
  profileSettingsLink,
  profileSettingsLinkInvitee,
} from "../styles/components-styles/profile.css";

type ProfileHeaderProps = {
  name: string;
  role: CoupleRole;
  settingsState?: CoupleNavigationState;
  showSettings?: boolean;
};

const ProfileHeader = ({ name, role, settingsState, showSettings = false }: ProfileHeaderProps) => {
  const initial = Array.from(name.trim())[0]?.toLocaleUpperCase("ru-RU") || "?";

  return (
    <div className={profileHeader}>
      <span className={role === "invitee" ? profileAvatarInvitee : profileAvatar} aria-hidden="true">
        {initial}
      </span>
      <span className={profileName}>{name}</span>
      {showSettings && (
        <Link
          to="/profile/settings"
          state={settingsState}
          className={role === "invitee" ? profileSettingsLinkInvitee : profileSettingsLink}
          aria-label="Настройки профиля"
        >
          <SettingOutlined />
        </Link>
      )}
    </div>
  );
};

export default ProfileHeader;
