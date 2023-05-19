/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import '../../styles/HelperStyles.css'
import { Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import '../../styles/HelperStyles.css'
import axios from 'axios';
import { ErrorToast } from '../../utility/localStorageControl';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';

export default function TermsnCondns({terms, setAccept, modalShow, setModalShow, setModalShow1}) {
    function MyVerticallyCenteredModal(props) {
        return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="flexColumn">
                <div className="flexRow flexBetween flexAlignCenter mb-40">
                    <h2 className="modal-head">Terms and Conditions</h2>
                    <button onClick={props.onHide}>
                        <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
                    </button>
                </div>
                
                <div className="modalBox">
                    {terms}
                </div>

                <div className="flexRow flexAlignCenter flexEnd">
                    <div className="share">
                        <a onClick={() => {props.setAccept(false); setModalShow1(false); props.onHide()}} className="flexAlignCenter modal-button newModalButton">Decline</a>
                    </div>
                    <div className="share">
                        <a onClick={() => {props.setAccept(true); setModalShow1(true); props.onHide()}} className="flexAlignCenter modal-button">I Agree</a>
                    </div>
                </div>
    
            </div>
        </Modal>
        );
    }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setAccept={setAccept}
      />
    </>
  );
}
