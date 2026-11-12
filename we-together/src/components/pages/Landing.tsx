import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";
import { filledButton, outlinedButton } from "../../styles/components-styles/button.css";
import logo from '../../assets/logo.svg';
import { customList, listText, margin } from "../../styles/components-styles/custom-list.css";
import Background from "../Background";
import { page } from "../../styles/components-styles/background.css";
import { useNavigate } from "react-router";

const Landing = () => {
    const { t } = useTranslation('common');

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
            <Flex className={margin} vertical align="center" gap={48}>
                <img width={310} src={logo} alt={t('together')}></img>
                <section className="list">
                    <h2 className={listText}>{t('landing.title')}</h2>
                    <ul className={customList}>
                        <li>{t('landing.notes')}</li>
                        <li>{t('landing.calendar')}</li>
                        <li>{t('landing.wishes')}</li>
                    </ul>
                </section>
                <Flex className="buttons" style={{width: '100%'}} vertical gap={16}>
                    <Button className={filledButton} onClick={handleLoginClick} color="primary" variant="filled" size="large" shape="round">{t('login')}</Button>
                    <Button className={outlinedButton} onClick={handleRegisterClick} color="primary" variant="outlined" size="large" shape="round">{t('register')}</Button>
                </Flex>
            </Flex>
        </div>
    )
}

export default Landing;
