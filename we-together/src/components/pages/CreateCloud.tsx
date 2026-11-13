import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import logo from '../../assets/logo.svg';
import { margin } from "../../styles/components-styles/custom-list.css";
import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { useNavigate } from "react-router";
import { PlusCircleOutlined, TeamOutlined } from '@ant-design/icons';
import Text from "antd/es/typography/Text";
import Footer from "../Footer";

const CreateCloud = () => {
    const { t } = useTranslation('cloud');

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleLoginClick = () => {
        navigate('/login');
    }
    
    return (
        <div className={page}>
            <Background page="landing" />
            <Flex className={margin} vertical justify="center" align="center" gap={32} style={{ minHeight: '100vh' }}>
                <img width={310} src={logo} alt={t('together')}></img>
                <Flex className="buttons" style={{width: '100%'}} vertical gap={48}>
                    <Flex vertical gap={8} align="center">
                        <Button className={filledButton} iconPlacement="start" icon={<PlusCircleOutlined />} onClick={handleLoginClick} color="primary" variant="filled" size="large" shape="round">{t('create.new')}</Button>
                        <Text>{t('create.newLabel')}</Text>
                    </Flex>
                    <Flex vertical gap={8} align="center">
                        <Button className={outlinedButton} iconPlacement="start" icon={<TeamOutlined />} onClick={handleRegisterClick} color="primary" variant="outlined" size="large" shape="round">{t('create.connect')}</Button>    
                        <Text>{t('create.connectLink')}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Footer></Footer>
        </div>
    )
}

export default CreateCloud;
