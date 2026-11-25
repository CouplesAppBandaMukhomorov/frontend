import { ArrowLeftOutlined } from '@ant-design/icons';
import { header } from '../styles/components-styles/common.css';
import { useNavigate } from 'react-router';
import logo from '../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { iconButton } from '../styles/components-styles/button.css';

type HeaderProps = {
    type: 'back' | 'backLogo',
};

const Header = ({ type }: HeaderProps) => {
    const navigate = useNavigate();

    const { t } = useTranslation('common');

    const handleClickProfile = () => {
        navigate('/profile');
    }

    return (
        <>
            {type === 'backLogo' && (
                <header className={header}>
                    <button onClick={handleClickProfile} className={iconButton}>
                        <ArrowLeftOutlined />
                    </button>
                    <img height={40} width={120} src={logo} alt={t('together')}></img>
                </header>
            )}
            {type === 'back' && (
                <header className={header}>
                    <button onClick={handleClickProfile} className={iconButton}>
                        <ArrowLeftOutlined />
                    </button>
                </header>
            )}
        </>
    );
};

export default Header;