import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { Alert, Button, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import { authPageMargin } from "../../styles/components-styles/auth.css";
import { input, link } from "../../styles/components-styles/common.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthError, login } from "../../api/auth";

interface LoginFormValues {
    email: string,
    password: string,
}

const Login = () => {
    const [form] = Form.useForm<LoginFormValues>();

    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');

    const { t } = useTranslation('auth');

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleBackClick = () => {
        navigate('/landing');
    };

    const handleLogin = async (values: LoginFormValues) => {
        setLoading(true);
        setGeneralError('');

        try {
            const data = await login(
                values.email,
                values.password
            );

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            navigate('/');
        } catch (error: unknown) {
            if (error instanceof AuthError) {
                if (error.code === 'invalid_credential') {
                    form.setFields([
                        {
                            name: 'password',
                            errors: [t('login.errors.invalidCredentials')]
                        }
                    ])
                } else {
                    setGeneralError(error.message || t('login.errors.general'));
                }
            } else {
                setGeneralError(t('login.errors.server'))
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={page}>
            <Background page="auth" />
            <Flex className={authPageMargin} vertical>
                <Button className={outlinedButton} onClick={handleBackClick} color="primary" variant="outlined" size="large" shape="round" icon={<ArrowLeftOutlined />} />
                <section>
                    <Flex justify="center">
                        <Title style={{ fontSize: '32px', fontWeight: '700' }}>{t('login.title')}</Title>
                    </Flex>
                    <Form form={form} requiredMark={false} onFinish={handleLogin} onValuesChange={() => setGeneralError("")} layout="vertical" style={{ flexGrow: '1' }}>
                        {generalError && (
                            <Alert message={generalError} type="error" showIcon style={{ marginBottom: "16px" }} />
                        )}

                        <Form.Item 
                            label={t('login.fields.email.label')} 
                            name='email' 
                            style={{ marginBottom: '16px'}} 
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required')
                                },
                                {
                                    type: "email",
                                    message: "Введите корректный email"
                                }
                            ]}>
                            <Input className={input} variant="outlined" placeholder={t('login.fields.email.placeholder')} />
                        </Form.Item>
                        <Form.Item 
                            label={t('login.fields.password.label')} 
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required')
                                }
                            ]}
                        >
                            <Input.Password className={input} placeholder={t('login.fields.password.placeholder')} />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button className={filledButton} block htmlType="submit" color="primary" variant="filled" size="large" shape="round" loading={loading} disabled={loading}>{t('login.submit')}</Button>    
                        </Form.Item>
                    </Form>
                </section>
                <Flex gap={4} justify="center" style={{ marginTop: '16px' }}>
                    <Text>{t('login.noAccount')}</Text>
                    <Link underline className={link} onClick={handleRegisterClick}>{t('login.registerLink')}</Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default Login;