import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { Button, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import { authPageMargin } from "../../styles/components-styles/auth.css";
import { input, link } from "../../styles/components-styles/common.css";
import { useNavigate } from "react-router";


const Login = () => {
    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleBackClick = () => {
        navigate('/landing');
    }
    
    return (
        <div className={page}>
            <Background page="auth" />
            <Flex className={authPageMargin} vertical>
                <Button className={outlinedButton} onClick={handleBackClick} color="primary" variant="outlined" size="large" shape="round" icon={<ArrowLeftOutlined />} />
                <section>
                    <Flex justify="center">
                        <Title style={{ fontSize: '32px', fontWeight: '700' }}>{t('login.title')}</Title>
                    </Flex>
                    <Form.Item layout="vertical" label={t('login.fields.email.label')} name='email' style={{ marginBottom: '16px'}}>
                        <Input className={input} variant="outlined" placeholder={t('login.fields.email.placeholder')} />
                    </Form.Item>
                    <Form.Item layout="vertical" label={t('login.fields.password.label')} name='password'>
                        <Input.Password className={input} placeholder={t('login.fields.password.placeholder')} />
                    </Form.Item>
                </section>
                <Button className={filledButton} color="primary" variant="filled" size="large" shape="round">{t('login.submit')}</Button>
                <Flex gap={4} justify="center" style={{ marginTop: '16px' }}>
                    <Text>{t('login.noAccount')}</Text>
                    <Link underline className={link} onClick={handleRegisterClick}>{t('login.registerLink')}</Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login;