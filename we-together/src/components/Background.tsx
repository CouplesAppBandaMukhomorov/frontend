import { background, ellipse1, ellipse2, ellipse3, ellipse4 } from "../styles/components-styles/background.css";

const Background = () => {
    return (
        <div className={background}>
            <div className={ellipse1} />
            <div className={ellipse2} />
            <div className={ellipse3} />
            <div className={ellipse4} />
        </div>
    )
}

export default Background;