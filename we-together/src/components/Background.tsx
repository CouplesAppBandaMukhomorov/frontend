import { background, ellipseYellowTopLanding, ellipsePurpleTopLanding, ellipseRedBottomLanding, ellipseYellowBottomLanding, ellipseYellowTopAuth, ellipsePurpleBottomAuth, ellipseRedBottomAuth, ellipseYellowBottomAuth, ellipseYellowTopCloudCreation, ellipseYellowBottomCloudCreation } from "../styles/components-styles/background.css";

type PageProps = {
    page: 'landing' | 'auth' | 'cloud-create';
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
    } else if (page === 'cloud-create') {
        return (
            <div className={background}>
                <div className={ellipseYellowTopCloudCreation} />
                <div className={ellipseYellowBottomCloudCreation} />
            </div>
        )
    }
}

export default Background;