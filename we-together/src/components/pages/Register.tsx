import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { Alert, Button, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import { useTranslation } from "react-i18next";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Link from "antd/es/typography/Link";
import { input, link } from "../../styles/components-styles/common.css";
import { authPageMargin } from "../../styles/components-styles/auth.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthError, register } from "../../api/auth";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

const Register = () => {
    const [form] = Form.useForm<RegisterFormValues>();
    const [loading, setLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");

    const { t } = useTranslation('auth');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleBackClick = () => {
        navigate('/landing');
    }

    const handleRegister = async (values: RegisterFormValues) => {
        setLoading(true);
        setGeneralError("");

        try {
            const data = await register(
                values.email,
                values.password,
                values.name
            );

            // Сохраняем токены
            localStorage.setItem(
                "access_token",
                data.access_token
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh_token
            );

            // Переходим на главную
            navigate("/");

        } catch (error: unknown) {

            if (error instanceof AuthError) {

                // Email уже зарегистрирован
                if (error.code === "email_already_registered") {
                    form.setFields([
                        {
                            name: "email",
                            errors: ["Этот email уже зарегистрирован"]
                        }
                    ]);
                } else {
                    setGeneralError(
                        error.message || "Произошла ошибка"
                    );
                }

            } else {
                setGeneralError(
                    "Не удалось подключиться к серверу"
                );
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
                        <Title style={{ fontSize: '32px', fontWeight: '700' }}>{t('register.title')}</Title>
                    </Flex>
                    <Form form={form} layout="vertical" requiredMark={false} onFinish={handleRegister} onValuesChange={() => setGeneralError("")}>
                        {generalError && (
                            <Alert
                                message={generalError}
                                type="error"
                                showIcon
                                style={{ marginBottom: "16px" }}
                            />
                        )}
                        <Form.Item 
                            label={t('register.fields.name.label')} 
                            name='name' 
                            style={{ marginBottom: '16px'}}
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required')
                                }
                            ]}
                        >
                            <Input className={input} variant="outlined" placeholder={t('register.fields.name.placeholder')} />
                        </Form.Item>
                        <Form.Item 
                            label={t('register.fields.email.label')}
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
                            ]}
                        >
                            <Input className={input} placeholder={t('register.fields.email.placeholder')} />
                        </Form.Item>
                        <Form.Item
                            label={t('register.fields.password.label')}
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.required')
                                }
                            ]}
                        >
                            <Input.Password className={input} placeholder={t('register.fields.password.placeholder')} />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button className={filledButton} block htmlType="submit" loading={loading} disabled={loading} color="primary" variant="filled" size="large" shape="round">{t('register.submit')}</Button>
                        </Form.Item>
                    </Form>
                </section>
                <Flex gap={4} justify="center" style={{ marginTop: '16px' }}>
                    <Text>{t('register.haveAccount')}</Text>
                    <Link underline className={link} onClick={handleLoginClick}>{t('register.loginLink')}</Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default Register;