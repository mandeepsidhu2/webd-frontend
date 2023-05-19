import React from "react";
import { FaCookieBite } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "./CookiePopup.css";

const CookiePopup = (props) => {
  return (
    <Modal show={props.show} onHide={props.hidePopup} centered scrollable>
      <div className="cookieContainer">
        <div className="cookieIcon">
          <FaCookieBite />
        </div>
        <div className="cookieText">
          We use <span>cookies</span> to ensure that we give you the best
          experience on our website.
        </div>
        <div className="cookieButtons">
          <button onClick={props.acceptCookie}>Allow</button>
          <button onClick={props.hidePopup}>Decline</button>
        </div>
      </div>
    </Modal>
  );
};

export default CookiePopup;
