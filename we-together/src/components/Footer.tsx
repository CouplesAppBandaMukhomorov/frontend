import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { footer } from '../styles/components-styles/common.css';
import { footerProfileButton } from '../styles/components-styles/button.css';

const Footer = () => {
    return (
        <footer className={footer}>
            <Button className={footerProfileButton} icon={<UserOutlined />} shape="circle" size="large" />
        </footer>
    );
};

export default Footer;