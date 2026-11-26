import { Flex } from 'antd';
import {
  ProfileOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { arrow, card, content, description, icon, title } from '../styles/components-styles/profile.css';

type Props = {
    menuTitle: string,
    menuDescription: string,
    color: string,
    onClick: () => void,
}

const QuestionnaireCard = ({menuTitle, menuDescription, color, onClick}: Props) => {
  return (
    <Flex align="center" gap={16} className={card} onClick={onClick}>
      <Flex align="center" justify="center" className={icon}>
        <ProfileOutlined style={{ color }} />
      </Flex>
      <Flex vertical justify="center" gap={4} className={content}>
        <span className={title}>{menuTitle}</span>
        <span className={description}>{menuDescription}</span>
      </Flex>
      <RightOutlined className={arrow} style={{ color }} />
    </Flex>
  );
};

export default QuestionnaireCard;