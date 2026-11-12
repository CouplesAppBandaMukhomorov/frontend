import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { Button, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import { input, link } from "../../styles/components-styles/common.css";
import { authPageMargin } from "../../styles/components-styles/auth.css";
import { useNavigate } from "react-router";


const Register = () => {
    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
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
                        <Title style={{ fontSize: '32px', fontWeight: '700' }}>{t('register.title')}</Title>
                    </Flex>
                    <Form.Item layout="vertical" label={t('register.fields.name.label')} name='name' style={{ marginBottom: '16px'}}>
                        <Input className={input} variant="outlined" placeholder={t('register.fields.name.placeholder')} />
                    </Form.Item>
                    <Form.Item layout="vertical" label={t('register.fields.email.label')} name='email' style={{ marginBottom: '16px'}}>
                        <Input className={input} placeholder={t('register.fields.email.placeholder')} />
                    </Form.Item>
                    <Form.Item layout="vertical" label={t('register.fields.password.label')} name='password'>
                        <Input.Password className={input} placeholder={t('register.fields.password.placeholder')} />
                    </Form.Item>
                </section>
                <Button className={filledButton} color="primary" variant="filled" size="large" shape="round">{t('register.submit')}</Button>
                <Flex gap={4} justify="center" style={{ marginTop: '16px' }}>
                    <Text>{t('register.haveAccount')}</Text>
                    <Link underline className={link} onClick={handleLoginClick}>{t('register.loginLink')}</Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default Register;