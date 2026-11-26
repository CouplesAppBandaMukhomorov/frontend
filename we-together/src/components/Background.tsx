import {
    background,
    ellipseYellowTopLanding,
    ellipsePurpleTopLanding,
    ellipseRedBottomLanding,
    ellipseYellowBottomLanding,
    ellipseYellowTopAuth,
    ellipsePurpleBottomAuth,
    ellipseRedBottomAuth,
    ellipseYellowBottomAuth,
    ellipseYellowTopCreator,
    ellipseYellowBottomCreator,
    ellipsePinkTopInvitee,
    ellipsePinkBottomInvitee,
} from "../styles/components-styles/background.css";

type PageProps = {
    page: 'landing' | 'auth' | 'creator' | 'invitee';
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
    } else if (page === 'creator') {
        return (
            <div className={background}>
                <div className={ellipseYellowTopCreator} />
                <div className={ellipseYellowBottomCreator} />
            </div>
        )
    } else if (page === 'invitee') {
        return (
            <div className={background}>
                <div className={ellipsePinkTopInvitee} />
                <div className={ellipsePinkBottomInvitee} />
            </div>
        )
    }
}

export default Background;
