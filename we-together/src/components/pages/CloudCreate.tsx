import { useTranslation } from "react-i18next";
import { Button, DatePicker, Flex, Form, Input } from "antd";
import { filledButton } from "../../styles/components-styles/button.css";
import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import Footer from "../Footer";
import Header from "../Header";
import { cloudPage } from "../../styles/components-styles/cloud.css";
import Title from "antd/es/typography/Title";
import { datePicker, input } from "../../styles/components-styles/common.css";

interface CloudSettings {
    cloudName: string,
    datingStart: Date,
    weddingDay: Date,
}

const CloudCreate = () => {
    const { t } = useTranslation('cloud');

    const [form] = Form.useForm<CloudSettings>();

    const dateFormat = 'DD/MM/YYYY';
    
    return (
        <div className={page}>
            <Background page="cloud-create" />
            <Header></Header>
            <div className={cloudPage}>
                <Flex vertical gap={10}>
                    <Title style={{ fontSize: '24px', fontWeight: '700', margin: '0' }}>{t('create.title')}</Title>
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
                                <Button className={filledButton} disabled block htmlType="submit" color="primary" variant="filled" size="large" shape="round">{t('create.button')}</Button>    
                            </Form.Item>
                        </Form>
                    </section>
                </Flex>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default CloudCreate;
