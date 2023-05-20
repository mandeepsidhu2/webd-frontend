/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import { ErrorToast, setItem, SuccessToast, WarningToast } from '../utility/localStorageControl';
import Axios from 'axios';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';
import {API_ENDPOINT} from '../AdminServices/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import {logOutUser, logUser, setUser, userID, userLogin, userPortfolio} from '../features/user/userSlice'
import { useHistory } from 'react-router-dom';
import TermsnCondns from './modals/TermsnCondns';
import { GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '954820964588-l8ba8pbqa49riqctv9fa6ckrt1dbul77.apps.googleusercontent.com';

const GoogleBtn = ({open, close}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector( userLogin );
  const userid = useSelector(userID);
  const [terms, setTerms] = useState(null);

  const getData = async () => {
    open();
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=TNC&key=tncAll`)
      .then(resp => {
        setTerms(resp.data.value.body);
        close();
      })
      .catch(err => {
        ErrorToast("Some Error Occured.");
        close();
      })
  }

  useEffect(() => {
    open();
    getData();
    terms && close();
  }, [terms])

  const loginSuccess = (response) => {
    open();
   // console.log(response)
    if(response.credential){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.credential}`)
        .then(response => {
          dispatch(logUser(response.data));
          setItem('accessToken', response.data.access_token);
          AdminService.getUserData()
            .then(resp => {
              console.log(resp)
              dispatch(setUser(resp.data));
              SuccessToast('Successfully Logged In');
              SuccessToast('User Details fetched!');
              close();
            })
            .catch(err => {
              ErrorToast("Some Error Occured, Re-login");
              close();
            });
        })
        .catch(function (error) {
          ErrorToast('Login Failed, Retry!');
          close();
        });
    }
  }

  const loginFailure = (response) => {
    open();    
    console.log(JSON.stringify(response))
    ErrorToast('Login Failed, Retry!');
    close();
  }

  isLogin &&
    setTimeout(() => {
      dispatch(logOutUser());
    }, 604800000)

  return (
    <div>
      { isLogin && userid ? (
        <>
          <PortfolioModal home={false} open={() => open()} close={() => close()} terms={terms} />
        </>
        )
        : 
        (
          <GoogleLogin
            buttonText='Sign in with Google'
            onSuccess={ loginSuccess }
            onFailure={ loginFailure }
            cookiePolicy={ 'single_host_origin' }
            responseType='code,token'
            className="google-button"
          />
        )
      }
    </div>
  );
}

export default GoogleBtn;

