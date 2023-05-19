import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './TermsScreen.css';
import Header1 from '../../components/Header/Header1';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import { ErrorToast } from '../../utility/localStorageControl';
import { Animated } from 'react-animated-css';

function TermsScreen() {
  const [terms, setTerms] = useState(null);
  const [loader, setloader] = useState(false);

  const getData = async () => {
    setloader(true);
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=TNC&key=tncAll`)
      .then(resp => {
        setTerms(resp.data.value.body);
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
    terms && setloader(false);
  }, [terms])

  return (
    <div className="policy-screen">
      {loader ? <Loader /> : null}
      <Header1 />
      <div id="policy-section">
        <div className="mw1100 flexColumn">
          <Animated isVisible={true} animationIn="slideInUp">
            <div className="flexColumn flexAlignCenter flexCenter mh-20 about-header">
              <h1 className="policyhead">Terms and Conditions</h1>
            </div>
          </Animated>
          <Animated isVisible={true} animationIn="slideInUp">
            <div className="flexColumn policy-section">
              <div className="flexRow flexAround flexAlignCenter dividerBottom pb-100">
                <p className="policy-text" style={{ whiteSpace: "pre-wrap" }}>
                  {terms}
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

export default TermsScreen;



