/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ContactScreen.css';
import Footer from '../../components/Footer/Footer';
import contactimg from '../../assets/images/Contactimg.png';
import {Form} from 'react-bootstrap';
import Header1 from '../../components/Header/Header1';
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import {API_ENDPOINT} from '../../AdminServices/baseUrl';
import Loader from '../../components/Loader/Loader';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';

function ContactScreen() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [loader, setloader] = useState(false);

    const ClearFields = () => {
        setName('');
        setSubject('');
        setMessage('');
        setEmail('');
    }

    const SendMail = async () => {
        setloader(true);
        if(subject && message && email){
            const mailContent = {
                'subject': subject,
                'text': message,
                'email': email,
            }
            Axios.post(`${API_ENDPOINT}/email`, mailContent)
                .then(resp => {
                    SuccessToast('Mail Sent!')
                    setloader(false);
                    ClearFields();
                })
                .catch(err => {
                    ErrorToast('Some Error Occured!')
                    setloader(false);
                })
        } else{
            ErrorToast('Error, Fields cannot be empty!')
              setloader(false);
        }

    }
  return (
    <div className="contact-screen">
        {loader ? <Loader /> : null}
        <Header1 />
        <div id="contact-section">
          <div className="mw1100 flexColumn">
            <Animated isVisible={true} animationIn="slideInUp">
                <div className="flexColumn flexAlignCenter flexCenter mh-20 contact-header">
                    <img src={contactimg} alt="" style={{width: '90%'}} />
                </div>
            </Animated>
            <Animated isVisible={true} animationIn="slideInUp">
                <div className="flexColumn contact-section">
                    <h1 className="contact-heading">Have anything to ask?</h1>
                    <div className="flexColumn flexAround flexAlignCenter mv-40">
                        <Form style={{width: '75%'}}>
                            <Form.Group controlId="formBasicEmail" className="mb-20">
                                <Form.Label>Name*</Form.Label>
                                <Form.Control type="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-20">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2" className="mb-20">
                                <Form.Label>Subject*</Form.Label>
                                <Form.Control type="text" defaultValue={subject} onChange={(e) => setSubject(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword3">
                                <Form.Label>Message*</Form.Label>
                                <Form.Control as="textarea" rows={5} defaultValue={message} onChange={(e) => setMessage(e.target.value)} />
                            </Form.Group>

                            <div className="share" onClick={() => SendMail()} style={{cursor: 'pointer', justifyContent: 'flex-start', paddingLeft: 0, paddingTop: 30}}>
                                <a className="flexAlignCenter modal-button">Send</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </Animated>
          </div>
      </div>
        <Footer />
    </div>
  );
}

export default ContactScreen;
