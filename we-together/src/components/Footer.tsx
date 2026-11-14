import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { footer } from '../styles/components-styles/common.css';
import { footerProfileButton } from '../styles/components-styles/button.css';
import { useNavigate } from 'react-router';

const Footer = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    }

    return (
        <footer className={footer}>
            <Button className={footerProfileButton} onClick={handleProfileClick} icon={<UserOutlined />} shape="circle" size="large" />
        </footer>
    );
};

export default Footer;