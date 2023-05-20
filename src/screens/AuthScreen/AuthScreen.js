import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import Header1 from '../../components/Header/Header1';
import Axios from 'axios';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import  AdminService  from '../../AdminServices/AdminService';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import {logOutUser, logUser, setUser, userID, userLogin, userPortfolio} from '../../features/user/userSlice'
import { ErrorToast, setItem, SuccessToast, WarningToast } from '../../utility/localStorageControl';

function TermsScreen() {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();




  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    Axios.post(`${API_ENDPOINT}/github/login?idTokenString=${code}`)
    .then(response => {
      dispatch(logUser(response.data));
      setItem('accessToken', response.data.access_token);
      AdminService.getUserData()
        .then(resp => {
          console.log(resp)
          dispatch(setUser(resp.data));
         
          SuccessToast('Successfully Logged In');
          SuccessToast('User Details fetched!');
          history.push("/home")
          
       
        })
        .catch(err => {
          ErrorToast("Some Error Occured, Re-login");
        
        });
    })
    .catch(function (error) {
      ErrorToast('Login Failed, Retry!');
    });
  }, []);

  return (
   
    <div>
 <Header1/>
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
     </div>
  );
}

export default TermsScreen;
