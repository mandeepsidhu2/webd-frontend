import React from 'react'
import '../styles/HelperStyles.css';
import Header from '../components/Header/Header';
import Lottie from 'react-lottie';
import animationData from '../assets/44191-404-animation-1.json';

function Error404() {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="error_page">
            <Header />
            <Lottie options={defaultOptions} height={400} width={400} />
        </div>
    )
}

export default Error404
