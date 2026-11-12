import { background, ellipseYellowTopLanding, ellipsePurpleTopLanding, ellipseRedBottomLanding, ellipseYellowBottomLanding, ellipseYellowTopAuth, ellipsePurpleBottomAuth, ellipseRedBottomAuth, ellipseYellowBottomAuth } from "../styles/components-styles/background.css";

type PageProps = {
    page: 'landing' | 'auth';
}

const Background = ({ page }: PageProps) => {
    if (page === 'landing') {
        return (
            <div className={background}>
                <div className={ellipseYellowTopLanding} />
                <div className={ellipsePurpleTopLanding} />
                <div className={ellipseRedBottomLanding} />
                <div className={ellipseYellowBottomLanding} />
            </div>
        )          
    } else if (page === 'auth') {
        return (
            <div className={background}>
                <div className={ellipseYellowTopAuth} />
                <div className={ellipsePurpleBottomAuth} />
                <div className={ellipseRedBottomAuth} />
                <div className={ellipseYellowBottomAuth} />
            </div>
        ) 
    }
}

export default Background;