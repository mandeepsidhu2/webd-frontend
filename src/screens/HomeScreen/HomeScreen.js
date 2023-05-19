/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import '../../styles/HelperStyles.css';
import './HomeScreen.css';
import Header from '../../components/Header/Header';
import whytabber from '../../assets/images/drawkit-content-man-colour.png'
import {BiCheckCircle} from 'react-icons/bi';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import AchievementCard from '../../components/AchievementCard/AchievementCard';
import FAQCard from '../../components/FAQCard/FAQCard';
import Footer from '../../components/Footer/Footer';
import PortfolioModal from '../../components/modals/PortfolioModal';
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import users from '../../assets/images/users.png';
import links from '../../assets/images/links.png';
import review from '../../assets/images/Review.png';
import onpoint from '../../assets/images/OnPoint.png';
import modify from '../../assets/images/Modifiable.png';
import nolimit from '../../assets/images/NoLimit.png';
import projects from '../../assets/images/Projects.png';
import achievements from '../../assets/images/Achievements.png';
import {API_ENDPOINT} from '../../AdminServices/baseUrl';
import Loader from '../../components/Loader/Loader';
import { ErrorToast, isDesktop, isMobile } from '../../utility/localStorageControl';
import {ToastContainer} from 'react-toastify';
import TrendingProfile from '../../components/TrendingProfile/TrendingProfile';
import Slider from 'react-slick';
import { isMobileOnly } from 'react-device-detect';

function HomeScreen() {
  const [QnA, setQnA] = useState([]);
  const [Achievements, setAments] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [TrendingProf, setProfiles] = useState([]);
  const [loader, setloader] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const getData = async () =>{
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=QnA`)
      .then(resp => {
        setQnA(resp.data.value);
      })
    .catch(err => ErrorToast("Some Error Occured."));
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=Achievements`)
      .then(resp => {
        setAments(resp.data.value)
      })
      .catch(err => ErrorToast("Some Error Occured."));
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=Features`)
      .then(resp => {
        setFeatures(resp.data.value);;
      })
      .catch(err => {ErrorToast("Some Error Occured.")
        setloader(false);
      })
    Axios.get(`${API_ENDPOINT}/website/trendingProfiles`)
      .then(resp => {
        setProfiles(resp.data)
      })
      .catch(err => {
        ErrorToast("Some Error Occured.")
        setloader(false);
      });
  }

  useEffect(() => {
    setloader(true);
    getData();
    TrendingProf && setloader(false);
  }, [])
  
  return (
    <div className="#home-screen">
      {loader ? <Loader /> : null}
      <Header open={() => setloader(true)} close={() => setloader(false)} />
      <Animated animationIn="slideInUp" isVisible={true}>
        <div id="intro-section">
          <div className="mw1100 mobile-column flexRow flexAround flexAlignCenter">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title="Tabber Advertisement Video" frameBorder="0" className="embed-responsive-item" src="https://www.youtube.com/embed/_2S0x-YV3XQ?rel=0" allowFullScreen />
            </div>
            <div className="mw600 mobile-center flexColumn">
                <h1 className="intro-text">
                    Improve your chances of getting hired, just Tab it for 
                    <span style={{color: 'rgba(0,229,216,1)'}}> FREE</span>
                </h1>
                <PortfolioModal open={() => setloader(true)} close={() => setloader(false)} home={true} />
            </div>
          </div>
        </div>
      </Animated>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Animated animationIn="slideInUp" isVisible={true}>
        <div id="why-tabber">
          {TrendingProf && <div className="pl-20 flexColumn trending__profiles mw1100" style={{width: 1100}}>
            <h1 className="trending__profilesHeader">Trending Profiles</h1>
            <div className="trending__profilesCards flexRow flexAlignCenter">
              {/* <Slider {...settings}> */}
                {isDesktop() && Object.values(TrendingProf).splice(0,3).map(prof => <TrendingProfile profile={prof} />)}
                {window.innerWidth <= 768 && window.innerWidth > 600 && Object.values(TrendingProf).splice(0,2).map(prof => <TrendingProfile profile={prof} />)}
                {isMobileOnly && Object.values(TrendingProf).splice(0,1).map(prof => <TrendingProfile profile={prof} />)}
              {/* </Slider> */}
            </div>
          </div> }
          <div className="mw1100 flexRow mobile-column flexAround flexAlignCenter">
            <div className="mw600 flexColumn mv-40">
                <h1 className="whytabber-heading">Why <span style={{color: '#077A73'}}>tabber?</span></h1>
                <p className="whytabber-text">Are you tired of sending <strong>each and every link</strong> to recruiters taking the hassle of mentioning each and every <strong>rank</strong>? Say no more! because Tabber is here to make this a possibility.</p>
                <p className="whytabber-features mt-50 mb-20">The features which are covered in this</p>
                <ul className="whyTabberlist">
                  <div className="flexRow flexAlignCenter">
                    <BiCheckCircle style={{color: '#077A73', marginRight: 10, marginTop: 5, fontSize: 21}} />
                    <li className="ml-19 whytabber-point flexAlignCenter">Add all your portfolio profiles.</li>
                  </div>
                  <div className="flexRow flexAlignCenter">
                    <BiCheckCircle style={{color: '#077A73', marginRight: 10, marginTop: 5, fontSize: 21}} />
                    <li className="ml-19 whytabber-point flexAlignCenter">Edit your resume live on the go.</li>
                  </div>
                  <div className="flexRow flexAlignCenter">
                    <BiCheckCircle style={{color: '#077A73', marginRight: 10, marginTop: 5, fontSize: 23}} />
                    <li className="ml-19 whytabber-point flexAlignCenter">Send and keep track of emails to recruiters within Tabby.</li>
                  </div>
                  <div className="flexRow ">
                    <BiCheckCircle style={{color: '#077A73', marginRight: 10, marginTop: 1, fontSize: 30}} />
                    <li className="ml-19 whytabber-point flexAlignCenter">Tabby avoids spamming, thus increasing the chances of you getting noticed!</li>
                  </div>
                  <div className="flexRow flexAlignCenter">
                    <BiCheckCircle style={{color: '#077A73', marginRight: 10, marginTop: 5, fontSize: 20}} />
                    <li className="ml-19 whytabber-point flexAlignCenter">Get a single shareable link.</li>
                  </div>
                </ul>
            </div>
            <img className="intro-img" src={whytabber} alt="why-tabber" />
          </div>
        </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="tabberfeatures">
        <div className="mw1100 pl-40 flexColumn">
          <h1 className="tabberfeatures-heading">What we got you</h1>
          <div className="flexRow flexBetween" style={{flexWrap: 'wrap'}}>
              {Features.map(feature => (
                  <FeatureCard key={feature.sr} name={feature.name} desc={feature.desc} 
                    img={feature.sr === 1 ? review :
                      feature.sr === 2 ? onpoint : 
                      feature.sr === 3 ? modify : 
                      feature.sr === 4 ? nolimit :
                      feature.sr === 5 ? projects : achievements} 
                  />
              ))}
          </div>
        </div>
      </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="achievements">
        <div className="mw1100 pl-40 flexColumn">
          <h1 className="achievements-heading">Achievements we have made, so far</h1>
          <div className="flexRow flexCenter" style={{flexWrap: 'wrap'}}>
              {Achievements.map(achievement => (
                  <AchievementCard key={achievement.sr} name={achievement.desc} desc={achievement.name} image={achievement.sr === 1 ? users : links} />
              ))}
          </div>
        </div>
      </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="faq">
        <div className="mw1100 ph-40 flexColumn">
          <h1 className="tabberfeatures-heading">Frequently Asked Questions</h1>
          {QnA.map(ques => (
              <FAQCard key={ques.sr} ques={ques.ques} ans={ques.ans} />
          ))}
        </div>
       </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
        <Footer />
      </Animated>
    </div>
  );
}

export default HomeScreen;
