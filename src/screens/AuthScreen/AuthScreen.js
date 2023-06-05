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
import { Modal, Form } from "react-bootstrap";

import contactimg from '../../assets/images/Contactimg.png';
import { Animated } from 'react-animated-css';

function TermsScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState('');
  const [newUser, setNewUser] = useState(false);




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
          if(response.data.new_user=="false")
           history.push("/home")
           else
           setNewUser(true)
          
       
        })
        .catch(err => {
          ErrorToast("Some Error Occured, Re-login");
        
        });
    })
    .catch(function (error) {
      ErrorToast('Login Failed, Retry!');
    });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const signUp = (value) => {
   console.log(selectedOption)
   AdminService.updateUserType(selectedOption).then(()=>SuccessToast("User Type Updated!"))
   // update user type here
   history.push("/home")
  };
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

    { newUser ?
    <div id="contact-section">
          <div className="mw1100 flexColumn">
            <Animated isVisible={true} animationIn="slideInUp">
        
                    <div className="flexColumn flexAround flexAlignCenter mv-40">
                    <h4>Chose the user role you would like to sign up with</h4>

                            <select id="option" value={selectedOption} onChange={handleOptionChange}>
                              <option value="">Choose an option</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                           
                            <div className="share" onClick={() => signUp()} style={{cursor: 'pointer', justifyContent: 'flex-start', paddingLeft: 0, paddingTop: 30}}>
                                <a className="flexAlignCenter modal-button">Sign Up!</a>
                            </div>
                    
                    </div>
              
            </Animated>
          </div>
      </div>:null
    }
     </div>
  );
}

export default TermsScreen;
