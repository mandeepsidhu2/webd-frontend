import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './PolicyScreen.css';
import Header1 from '../../components/Header/Header1';
import Footer from '../../components/Footer/Footer';
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import Loader from '../../components/Loader/Loader';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import { ErrorToast } from '../../utility/localStorageControl';

function PolicyScreen() {
  const [policy, setPolicy] = useState(null);
  const [loader, setloader] = useState(false);

  const getData = async () => {
    setloader(true);
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=PrivacyPolicy&key=PrivacyPolicy`)
      .then(resp => {
        setPolicy(resp.data.value.body);
        setloader(false);
      })
      .catch(err => {
        ErrorToast("Some Error Occured.");
        setloader(false);
      })
  }

  useEffect(() => {
    setloader(true);
    getData();
    policy && setloader(false);
  }, [policy])

  return (
    <div className="policy-screen">
      {loader ? <Loader /> : null}
      <Header1 />
      <div id="policy-section">
        <div className="mw1100 flexColumn">
          <Animated isVisible={true} animationIn="slideInUp">
            <div className="flexColumn flexAlignCenter flexCenter mh-20 about-header">
              <h1 className="policyhead">Privacy Policy</h1>
            </div>
          </Animated>
          <Animated isVisible={true} animationIn="slideInUp">
            <div className="flexColumn policy-section">
              <div className="flexRow flexAround flexAlignCenter dividerBottom pb-100">
                <p className="policy-text" style={{ whiteSpace: "pre-wrap" }}>
                  {policy}
                </p>
              </div>
            </div>
          </Animated>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PolicyScreen;
