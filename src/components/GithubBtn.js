/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'

import PortfolioModal from '../components/modals/PortfolioModal';
import { AiFillGithub } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';
import {logOutUser, logUser, setUser, userID, userLogin, userPortfolio} from '../features/user/userSlice'


const CLIENT_ID = '4bbf2c8cbb0a20ff5a7c';

const GithubBtn = ({open, close}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector( userLogin );
  const userid = useSelector(userID);
  const [terms, setTerms] = useState(null);
  

  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;



  const login = () => {
    window.location.assign(oauthUrl);
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
          <button type="button" class="btn btn-success"
            onClick={login}
            buttonText='Sign in with Github'
          >Login With Github  <AiFillGithub style={{marginLeft:"5px"}}/></button>
        )
      }
    </div>
  );
}

export default GithubBtn;

