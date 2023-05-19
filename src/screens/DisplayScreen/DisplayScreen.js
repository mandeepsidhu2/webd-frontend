import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import '../../styles/HelperStyles.css';
import './DisplayScreen.css';
import Footer from '../../components/Footer/Footer';
import { ErrorToast, ReversePortalMap } from '../../utility/localStorageControl';
import CodingCardDisplay from '../../components/CodingCard/CodingCardDisplay';
import ContestCardDisplay from '../../components/ContestCard/ContestCardDisplay';
import ProjectCardDisplay from '../../components/ProjectCard/ProjectCardDisplay';
import CookiePopup from '../../components/Cookie/CookiePopup';
import {isMobile} from 'react-device-detect';
import Axios from 'axios';
import {API_ENDPOINT} from '../../AdminServices/baseUrl';
import Header1 from '../../components/Header/Header1';
import Loader from '../../components/Loader/Loader';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiOutlineDown, AiOutlineLinkedin, AiOutlineUp } from 'react-icons/ai';
import { userToken } from '../../features/user/userSlice';
import AdminService from '../../AdminServices/AdminService';
import { CourseCardDisplay } from '../../components/CourseCard/CourseCardDisplay';
import { ExperienceCardDisplay } from '../../components/ExperienceCard/ExperienceCardDisplay';

const API_KEY = 'AJYGpQcugTouk4olbrEfWz';
const processAPI = 'https://cdn.filestackcontent.com';

function DisplayScreen() {
  const accessToken = useSelector(userToken);
  const [userData, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const [RankWidgets, setRank] = useState([]);
  const [ContestWidgets, setContests] = useState([]);
  const [ProjectWidgets, setProjects] = useState([]);
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const [cookieStatus, setCookieStatus] = useState(null);
  const [CourseWidgets, setCourses] = useState([]);
  const [ view, setView ] = useState(false);
  const [ExperienceWidgets, setExperiences] = useState([]);
  const [graduationStatus, setGraduationStatus] = useState(null);
  const [viewExperience, setViewExperience] = useState(false);

  const showPopupHandler = () => {
    setShowCookiePopup(true);
  };
  const hidePopupHandler = () => {
    setShowCookiePopup(false);
  };
  
  const generateUUID = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ ((crypto.getRandomValues(new Uint8Array(1))[0] & 15) >> (c / 4))).toString(16)
    );
  };

  const sendTrakingId = async(uuid) => {
    const getIDFromURL = () => {
      setloader(true);
      return window.location.href.split('d/')[1];
    };
    const user_id = getIDFromURL();
    Axios.get(`${API_ENDPOINT}/user/guest/resume?id=${user_id}&trakingId=${uuid}`)
      .then(() => {
        setloader(false);
      })
      .catch(err => { 
        ErrorToast('Something went wrong');
        setloader(false);
      })
  }

  const setCookie1 = (cname,cvalue,exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  
  const setCookie2 = (cname,cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (60*60*1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  const checkCookie = (cname) => {
    const check = getCookie(cname);
    if(check) {
      return true;
    }
    return false;
  };
  
  const cookieAcceptStatus = (checkCookie1) => {
    AdminService.GetCookie()
    .then(responce => {
      if(responce.data){
        setCookieStatus(true);
      } else {
        setCookieStatus(false);
        if(!cookieStatus) {
          if(!checkCookie1){
            showPopupHandler();
          }
        }
      }
    })
    .catch(() => {
      ErrorToast('Something Went Wrong!');
    })
  };
  
  const acceptCookieHandler = () => {
    let uuid = null;
    let isLoggedin;
    
    accessToken === null ? isLoggedin = false : isLoggedin = true;
    const checkCookie1 = checkCookie('cookieAccepted');
    
    if(!checkCookie1){
      setCookie1('cookieAccepted', true, 365);
      uuid = generateUUID();
      setCookie2('uuid', uuid);
      sendTrakingId(uuid);
    }
    if(isLoggedin) {
      AdminService.SetCookie()
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        ErrorToast('Something went wrong');
      })
    }
    setShowCookiePopup(false);
  };
  
  const responceData = (data) => {
    let text;
    const educationLevel = data.portfolio.education_level;
    const graduationStringMap = data.string_map;

    educationLevel === "postgraduate"
    ? (text = graduationStringMap["postgraduate"])
    : educationLevel === "undergraduate"
    ? (text = graduationStringMap["undergraduate"])
    : educationLevel === "pursuing postgraduation"
    ? (text = graduationStringMap["pursuing postgraduation"])
    : educationLevel === "pursuing undergraduation"
    ? (text = graduationStringMap["pursuing undergraduation"])
    : (text = " a student of ");

    setGraduationStatus(text);
  }
  
  useEffect(() => {
    let isLoggedin;
    accessToken === null ? isLoggedin = false : isLoggedin = true;
    const checkCookie1 = checkCookie('cookieAccepted');
    
    if(isLoggedin) {
      cookieAcceptStatus(checkCookie1);
      
      if(checkCookie1) {
        AdminService.SetCookie()
        .then((res) => {})
        .catch(() => {
          ErrorToast('Something went wrong');
        })
      }
      
      if(cookieStatus && !checkCookie1) {
        setCookie1('cookieAccepted', true, 365);
        const checkCookie2 = checkCookie('uuid');
        if(!checkCookie2) {
          let uuid = generateUUID();
          setCookie2('uuid', uuid);
          sendTrakingId(uuid);
        }
      }
    } else {
      if(!checkCookie1) {
        showPopupHandler();
      }
    }
    // if cookie2 has expired then generate new uuid
    if(checkCookie1) {
      const checkCookie2 = checkCookie('uuid');
      if(!checkCookie2) {
        let uuid = generateUUID();
        setCookie2('uuid', uuid);
        sendTrakingId(uuid);
      }
    }
  }, [accessToken, cookieStatus]);

  useEffect(() => {
    const getIDFromURL = () => {
      setloader(true);
      return window.location.href.split('d/')[1];
    };
    const user_id = getIDFromURL();

    const trakingId = getCookie("uuid");
    let urlTrakingId = "";
    if(trakingId) {
      urlTrakingId = `&trakingId=${trakingId}`;
    }

    Axios.get(`${API_ENDPOINT}/user/guest/resume?id=${user_id}${urlTrakingId}`)
      .then(resp => {
        setData([resp.data]);
        responceData(resp.data);
        setloader(false);
        window.scroll(0,150);
          adjustData(resp.data);
      })
      .catch(error => {
        ErrorToast("Some Error Occured.")
        setloader(false);
      })
  }, [])
  
  const adjustData = (data) => {
    var abc = data && data.rank_widgets && data.rank_widgets.filter(profile => profile.invisible === false);
    setRank(abc);
    abc = data && data.contest_widgets && data.contest_widgets.filter(profile => profile.invisible === false);
    setContests(abc);
    abc = data && data.personal_projects && data.personal_projects.filter(profile => profile.invisible === false);
    setProjects(abc);
    abc = data && data.course_widgets && data.course_widgets.filter(profile => profile.invisible === false);
    setCourses(abc);
    abc = data && data.experience_widgets && data.experience_widgets.filter(profile => profile.invisible === false );
    setExperiences(abc);
  }
  return (
    <div className="#display-screen">
    {loader ? <Loader /> : null}
      <Header1 />
      <div className="mw1100">
        <div className="p-40 flexColumn display-section">
          {userData && userData.map(user => (
            <div className="flexColumn" key={user.user_id}>
              <p className="title">{user.portfolio.title}</p>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn info-sec">
                <p className="name mb-20 pl-20">Hello! I am <strong>{user.name}</strong>{graduationStatus}<strong>{user.portfolio.college.split(',')[0]}({user.portfolio.graduation_year})</strong></p>
                <p className="desc">{user.portfolio.description}</p>
              </div>
              <div className="socialsRow">
                {user.portfolio.cloud_resume_link && user.portfolio.cloud_resume_link !== 'https://' ? (
                  <div className="flexColumn mv-20">
                    <p className="card-heading mb-20">Resume</p>
                    <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
                      <p className="resume-head">View Attached PDF</p>
                      <BsFillEyeFill onClick={() => window.open(user.portfolio.cloud_resume_link)} className="grow2 attach-resume__icon" />
                    </div>
                  </div>
                ) : null} 
                {user.portfolio.social_profiles[0] && user.portfolio.social_profiles[0].link !== '' ? (
                  <div className="flexColumn mv-20">
                    <p className="card-heading mb-20">LinkedIn Profile</p>
                    <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
                      <p className="resume-head">View LinkedIn Profile</p>
                      <AiOutlineLinkedin onClick={() => window.open(user.portfolio.social_profiles[0].link)} className="grow2 attach-resume__icon" />
                    </div>
                  </div>
                ) : null}  
              </div>
              {
                CourseWidgets && CourseWidgets.length > 0 ? (
                  <div className="courses mv-20">
                    <p className="card-heading mb-20">Courses Taken</p>
                    <div className="flexColumn courseList grow5">
                      {
                        CourseWidgets.length > 2 ? (
                          view ? (
                            <>
                              {CourseWidgets.map(profile => (
                                <CourseCardDisplay name={profile.course_name} link={profile.certificate_link} issuer={profile.issuer} />
                              ))}
                              {
                                <div className="viewCourses flexRow flexCenter" onClick={() => setView(false)}>
                                  <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                                    <p className="viewCourses__text">View Less</p>
                                    <AiOutlineUp />
                                  </div>
                                </div>
                              }
                            </>
                          ) : (
                            <>
                              {CourseWidgets.slice(0,2).map(profile => (
                                <CourseCardDisplay name={profile.course_name} link={profile.certificate_link} issuer={profile.issuer} />
                              ))}
                              {
                                <div className="viewCourses flexRow flexCenter" onClick={() => setView(true)}>
                                  <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                                    <p className="viewCourses__text">View More</p>
                                    <AiOutlineDown />
                                  </div>
                                </div>
                              }
                            </>
                          )
                        ) : (
                          CourseWidgets.map(profile => (
                            <CourseCardDisplay name={profile.course_name} link={profile.certificate_link} issuer={profile.issuer} />
                          ))
                        )                        
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                ExperienceWidgets && ExperienceWidgets.length > 0 ? (
                  <div className="courses mv-20">
                    <p className="card-heading mb-20">Work Experience</p>
                    <div className="flexColumn courseList grow5">
                      {
                        ExperienceWidgets.length > 2 ? (
                          viewExperience ? (
                            <>
                              {ExperienceWidgets.map(profile => (
                                <ExperienceCardDisplay type={profile.type} companyName={profile.company_name} description={profile.description} start={profile.start_date} end={profile.end_date} />
                              ))}
                              {
                                <div className="viewCourses flexRow flexCenter" onClick={() => setViewExperience(false)}>
                                  <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                                    <p className="viewCourses__text">View Less</p>
                                    <AiOutlineUp />
                                  </div>
                                </div>
                              }
                            </>
                          ) : (
                            <>
                              {ExperienceWidgets.slice(0,2).map(profile => (
                                <ExperienceCardDisplay type={profile.type} companyName={profile.company_name} description={profile.description} start={profile.start_date} end={profile.end_date} />
                              ))}
                              {
                                <div className="viewCourses flexRow flexCenter" onClick={() => setViewExperience(true)}>
                                  <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                                    <p className="viewCourses__text">View More</p>
                                    <AiOutlineDown />
                                  </div>
                                </div>
                              }
                            </>
                          )
                        ) : (
                          ExperienceWidgets.map(profile => (
                            <ExperienceCardDisplay type={profile.type} companyName={profile.company_name} description={profile.description} start={profile.start_date} end={profile.end_date} />
                          ))
                        )                        
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                RankWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Coding Profile</p>
                    <div className="flexRow flexWrap">
                      { 
                        RankWidgets.map(profile => (
                            <CodingCardDisplay url={profile.link} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                ContestWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Coding Contests</p>
                    <div className="flexRow flexWrap">
                      { 
                        ContestWidgets.map(profile => (
                            <ContestCardDisplay card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                ProjectWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Projects</p>
                    <div className="flexRow flexWrap">
                      { 
                        ProjectWidgets.map(project => (
                            <ProjectCardDisplay name={project.title} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} url={project.link} id={project.id} hide={project.invisible} techstack={project.tech_stack} desc={project.description} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
            </div>
          ))}
          <div className="flexRow end-section flexCenter ph-20 flexAlignCenter mv-40">
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
            <p className="end-text">Thats all folks</p>
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
          </div>
        </div>
      </div>
      <Footer />
      <CookiePopup show={showCookiePopup} hidePopup={hidePopupHandler} acceptCookie={acceptCookieHandler}/>
    </div>
  );
}

export default DisplayScreen;
