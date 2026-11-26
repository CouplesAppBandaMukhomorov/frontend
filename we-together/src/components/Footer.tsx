import { useEffect, useState } from 'react';
import { pinkFooter, yellowFooter } from '../styles/components-styles/common.css';
import {
    footerProfileButton,
    footerYellowProfileButton,
    footerCoupleLink,
    footerCreatorFrontCircle,
    footerInviteeBackCircle,
    footerInviteeFrontCircle,
    footerCreatorBackCircle,
} from '../styles/components-styles/button.css';
import { Link, useLocation, useNavigate } from 'react-router';
import type { Couple, CoupleRole } from '../api/createCloud';
import { getMyProfile } from '../api/users';
import { getRememberedDisplayName, rememberRegisteredUser } from '../state/currentUser';

type FooterProps = {
    role?: CoupleRole;
    displayName?: string;
    members?: Couple['members'];
}

function firstLetter(name: string): string {
    return Array.from(name.trim())[0]?.toLocaleUpperCase('ru-RU') || '?';
}

const Footer = ({ role, displayName, members }: FooterProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileName, setProfileName] = useState<string>();
    const isInvitee = role === 'invitee' || (!role && location.pathname === '/cloud/join');
    const name = profileName?.trim() || displayName?.trim() || getRememberedDisplayName() || '';
    const creator = members?.find(member => member.role === 'creator');
    const invitee = members?.find(member => member.role === 'invitee');
    const creatorName = role === 'creator' ? name : creator?.display_name || '';
    const inviteeName = role === 'invitee' ? name : invitee?.display_name || '';

    useEffect(() => {
        let active = true;

        getMyProfile().then(profile => {
            if (!active) return;
            rememberRegisteredUser(profile.email, profile.display_name);
            setProfileName(profile.display_name);
        }).catch(() => {
            // При недоступном профиле показываем имя из ответа пары или локального кеша.
        });

        return () => { active = false; };
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
    }

    return (
        <footer className={isInvitee ? yellowFooter : pinkFooter}>
            {creator && invitee ? (
                <Link to="/profile" className={footerCoupleLink} aria-label={`Профиль пары: ${creator.display_name} и ${invitee.display_name}`}>
                    <span className={isInvitee ? footerInviteeFrontCircle : footerCreatorFrontCircle}>
                        {firstLetter(isInvitee ? inviteeName : creatorName)}
                    </span>
                    <span className={isInvitee ? footerCreatorBackCircle : footerInviteeBackCircle}>
                        {firstLetter(isInvitee ? creatorName : inviteeName)}
                    </span>
                </Link>
            ) : (
                <button
                    type="button"
                    className={isInvitee ? footerYellowProfileButton : footerProfileButton}
                    onClick={handleProfileClick}
                    aria-label={name ? `Профиль ${name}` : 'Профиль'}
                >
                    {firstLetter(name)}
                </button>
            )}
        </footer>
    );
};

export default Footer;
