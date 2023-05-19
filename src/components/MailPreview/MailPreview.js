/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css';
import splashlogo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { userContestWidgets, userEmail, userID, userImage, userName, userPortfolio, userRankWidgets } from '../../features/user/userSlice';

export default function MailPreview(){
    const portfolio = useSelector(userPortfolio);
    const name = useSelector(userName);
    const email = useSelector(userEmail);
    const rank_widgets = useSelector(userRankWidgets);
    const contest_widgets = useSelector(userContestWidgets);
    const ID = useSelector(userID);
    const image = useSelector(userImage);
    return(
        <div className="mail-box">
            <img src={splashlogo} width="200" height="40" style={{alignSelf: 'center'}} className="d-inline-block" alt="logo" />
            <div className="mail-content-box">
                <div style={{backgroundColor: 'rgba(255,217,135,1)', borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
                    <h6 className="mailcontent-header">{portfolio.title}</h6>
                </div>
                <div style={{padding: 20, gap: 30}} className="flexRow">
                    <img src={image} className="profile-pic" alt="profile" />
                    <div className="flexColumn">
                        <h2 className="mailcontent-name">{name}</h2>
                        <h4 className="mailcontent-mail">{email}</h4>
                        <div className="flexRow numbers__code">
                            <div className="flexRow" style={{alignItems: 'baseline', gap: 10}}>
                                <h1 className="mailcontent-number">{rank_widgets.length}</h1>
                                <h5 className="mailcontent-sec">Profiles</h5>
                            </div>
                            <div className="flexRow" style={{alignItems: 'baseline', gap: 10}}>
                                <h1 className="mailcontent-number">{contest_widgets.length}</h1>
                                <h5 className="mailcontent-sec">Coding Contests</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="share" style={{justifyContent: 'center', padding: 0}} >
                <a href={`/d?id=${ID}`} className="flexAlignCenter modal-button">Visit Profile</a>
            </div>
            <div className="imp">
                <h2 className="imp_header">Important</h2>
                <li className="imp_point">Tabber is not accountable or liable for the content or truthfulness of the profile.</li>
                <li className="imp_point">If needed, kindly verify the candidate's information.</li>
            </div>
        </div>
    );
}