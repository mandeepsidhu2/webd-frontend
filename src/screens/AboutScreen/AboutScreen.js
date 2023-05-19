import React from 'react';
import '../../styles/HelperStyles.css';
import './AboutScreen.css';
import Header1 from '../../components/Header/Header1';
import Footer from '../../components/Footer/Footer';
import aboutimg from '../../assets/images/aboutimg.png';
import pc from '../../assets/images/random.png';
import { Animated } from 'react-animated-css';

function AboutScreen() {
  return (
    <div className="about-screen">
        <Header1 />
        <div id="about-section">
          <div className="mw1100 flexColumn">
            <Animated isVisible={true} animationIn="slideInUp">
              <div className="flexColumn flexAlignCenter flexCenter mh-20 about-header">
                  <img className="about-tabber" src={aboutimg} alt="" style={{width: '90%'}} />
              </div>
            </Animated>
            <Animated isVisible={true} animationIn="slideInUp">
              <div className="flexColumn about-section">
                  <div className="flexRow flexAround flexAlignCenter dividerBottom pb-100 main-about">
                      <div className="flexColumn mv-20">
                          <div className="flexRow flexAlignCenter mainAbout">
                            <p className="mw500 about-text">
                              In this competitive world, students are finding various new ways to showcase their skills and profile, to ease their task so they can focus on more important things, we have developed Tabber. <br/><br/>
                              Tabber is an initiative to make resume sharing seamless, easing the burden on recruiters and increasing the chances of getting hired through on the go resume sharing.<br /><br />
                            </p>
                            <img className="about-img" src={pc} alt="about-tabber" />
                          </div>
                          <p className="about-text">
                            <strong>How can a student use Tabber?</strong><br />
                            <li>Get a shareable link of resume, send it to recruiter or attach this link in their resume</li>
                            <li>Send a pre-formatted email to recruiters containing basic details and the link to their tabber profile while a user is logged in from Tabber dashboard.</li>
                            <li>Add personal projects, ranks on competitive coding websites or contest ranks to their profile</li>
                            <li>Attach LinkedIn profile link to their resume profile</li>
                            <li>Attach a cloud link to their pdf format resume hosted on drive</li><br /><br />
                          </p>
                          <p className="about-text">
                            <strong>Benefits</strong><br />
                            <li>Users can change details on their tabber resume anytime after sharing the link, since the information is hosted on our servers and content refreshes every time someone opens the link</li>
                            <li>Option of sending email from tabber hosted email within dashboard avoids spamming and increases chances of getting noticed</li>
                            <li>Static resumes have a limitation of being limited to only 1 page(which is preferred by many recruiters) which inhibits the job seeker from fully showcasing their projects/achievements. Tabber removes this handicap.</li>
                            <li>A templated resume portfolio for all students will make the job of the recruiter easier, where they are easily able to filter out candidates according to their requirements</li>
                            <li>Avoids fatigue at the end of recruiter who can open the project link just by clicking on widgets, view contest ranks and achievements, open LinkedIn profile or cloud pdf hosted resume all from the tabber profile of the user</li>
                          </p>
                      </div>
                  </div>
              </div>
            </Animated>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default AboutScreen;
