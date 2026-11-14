import { useTranslation } from "react-i18next";
import { Button, DatePicker, Flex, Form, Input, message, Spin } from "antd";
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import Footer from "../Footer";
import Header from "../Header";
import { cloudPage } from "../../styles/components-styles/cloud.css";
import Title from "antd/es/typography/Title";
import { datePicker, input } from "../../styles/components-styles/common.css";
import { LoadingOutlined, ShareAltOutlined, DoubleRightOutlined, CopyOutlined } from '@ant-design/icons';
import { useState } from "react";
import Text from "antd/es/typography/Text";
import successImg from '../../assets/success.svg';
import errorImg from '../../assets/error.svg';

interface CloudSettings {
    cloudName: string,
    datingStart: Date,
    weddingDay: Date,
}

const CloudCreate = () => {
    const { t } = useTranslation('cloud');

    const [form] = Form.useForm<CloudSettings>();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const dateFormat = 'DD/MM/YYYY';

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 800);
        setSuccess(true);
    }

    const handleError = () => {
        setError(true);
    }

    const handleCopyLink = () => {
        message.success(t('create.linkCopied'));
    }
    
    return (
        <div className={page}>
            <Background page="cloud-create" />
            <Header></Header>
            <div className={cloudPage}>
                <Flex vertical gap={10}>
                    <Title style={{ fontSize: '24px', fontWeight: '700', margin: '0' }}>{t('create.title')}</Title>
                    {!loading && !success && !error && (
                        <section>
                            <Form form={form} requiredMark={false} layout="vertical">
                                <Form.Item label={t('create.cloudName')}>
                                    <Input className={input} placeholder={t('create.cloudNamePlaceholder')}></Input>
                                </Form.Item>
                                <Form.Item label={t('create.datingStart')}>
                                    <DatePicker format={dateFormat} className={datePicker} placeholder={t('create.datePlaceholder')}></DatePicker>
                                </Form.Item>
                                <Form.Item label={t('create.weddingDate')}>
                                    <DatePicker format={dateFormat} className={datePicker} placeholder={t('create.datePlaceholder')}></DatePicker>
                                </Form.Item>
                                <Form.Item label={null}>
                                    <Button className={filledButton} onClick={handleClick} block htmlType="submit" color="primary" variant="filled" size="large" shape="round">{t('create.button')}</Button>    
                                </Form.Item>
                            </Form>
                        </section>
                    )}
                    {loading && (
                        <Flex vertical style={{ height: '80vh' }} justify="center" align="center" gap={12}>
                            <Spin size="large" indicator={<LoadingOutlined />}/>
                            <Text style={{ color: '#EA006B'}}>{t('create.title')}</Text>
                        </Flex>
                    )}
                    {!loading && success && !error && (
                        <Flex vertical style={{ height: '80vh' }} justify="center" align="center" gap={36}>
                            <Flex vertical gap={16} justify="center" align="center">
                                <img width={240} src={successImg}></img>
                                <Text style={{ color: '#EA006B', fontWeight: '600' }}>{t('create.created')}</Text>
                            </Flex>
                            <Flex vertical gap={16} style={{ width: '300px' }}>
                                <Input className={input} suffix={<CopyOutlined />} size="middle" />
                                <Button className={outlinedButton} onClick={handleCopyLink} style={{ fontWeight: '400'}} iconPlacement="start" icon={<ShareAltOutlined />} color="primary" variant="outlined" size="middle" shape="round">{t('create.share')}</Button>
                            </Flex>
                            <Button className={filledButton} onClick={handleError} style={{ marginTop: '36px' }} iconPlacement="end" icon={<DoubleRightOutlined />} color="primary" variant="filled" size="large" shape="round">{t('create.goToCloud')}</Button>                           
                        </Flex>
                    )}
                    {error && (
                        <Flex vertical style={{ height: '80vh' }} justify="center" align="center" gap={36}>
                            <Flex vertical gap={16} justify="center" align="center">
                                <img width={240} src={errorImg}></img>
                                <Text style={{ fontWeight: '600' }}>{t('create.error')}</Text>
                            </Flex>
                            <Button className={filledButton} color="primary" variant="filled" size="large" shape="round">{t('create.tryAgain')}</Button>                           
                        </Flex>
                    )}
                </Flex>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default CloudCreate;
