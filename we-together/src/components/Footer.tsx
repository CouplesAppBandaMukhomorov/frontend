import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { pinkFooter, yellowFooter } from '../styles/components-styles/common.css';
import { footerProfileButton } from '../styles/components-styles/button.css';
import { useLocation, useNavigate } from 'react-router';
import type { CoupleRole } from '../api/createCloud';

type FooterProps = {
    role?: CoupleRole;
}

const Footer = ({ role }: FooterProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isInvitee = role === 'invitee' || (!role && location.pathname === '/cloud/join');

    const handleProfileClick = () => {
        navigate('/profile');
    }

    return (
        <footer className={isInvitee ? yellowFooter : pinkFooter}>
            <Button className={footerProfileButton} onClick={handleProfileClick} icon={<UserOutlined />} shape="circle" size="large" />
        </footer>
    );
};

export default Footer;
