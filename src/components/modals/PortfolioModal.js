/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  ErrorToast,
  SuccessToast,
  WarningToast,
  graduationYears,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import { useSelector, useDispatch } from "react-redux";
import {
  setPortfolio,
  userImage,
  userLogin,
  userPortfolio,
  userToken,
} from "../../features/user/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../AdminServices/baseUrl";
import TermsnCondns from "./TermsnCondns";

export default function PortfolioModal({ home, open, close, terms }) {
  const token = useSelector(userToken);
  const dispatch = useDispatch();
  const image = useSelector(userImage);
  const isLogin = useSelector(userLogin);
  const portfolio = useSelector(userPortfolio);
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [accept, setAccept] = useState(false);
  const [collegeList, setList] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);

  let title = "";
  let desc = "";
  let college = -1;
  let other = "";
  let gradYear = 2010;
  let educationLevel = "postgraduate";

  const createPortfolio = async () => {
    if (token === "") {
      ErrorToast("Access Token not Retrieved!");
    } else {
        const portfolioData = {
          title: title,
          picture_url: image,
          description: desc,
          college: other.length >= 1 ? -1 : college,
          college_others: other,
          graduation_year: gradYear,
          education_level: educationLevel,
        };
        AdminService.createPortfolio(portfolioData)
          .then((resp) => {
            SuccessToast("Details Entered!");
            AdminService.getUserData()
              .then((resp) => {
                dispatch(setPortfolio(resp.data));
                setModalShow(false);
                history.push("/portfolio");
                close();
              })
              .catch((err) => {
                ErrorToast("Some Error Occured.");
                close();
              });
          })
          .catch((err) => {
            ErrorToast("Error, One User, One Portfolio!");
            close();
          });
    }
  };

  const Add = () => {
    open();
    if (title && desc && gradYear && educationLevel && (college !== -1 || other !== "")) {
      createPortfolio(); setModalShow(false);
    } else {
      ErrorToast("Error, Fields cannot be empty!");
      close();
    }
  };

  const getUnivList = () => {
    axios.get(`${API_ENDPOINT}/university/university_list`).then((res) => {
      const data = Object.values(res.data);
      setList(data);
    });
  };

  const getEducationLevels = () => {
    axios
      .get(`${API_ENDPOINT}/fe/get?page_type=portfolio&key=education_level`)
      .then((res) => {
        const data2 = Object.keys(res.data.value);
        setEducationLevels(data2);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  useEffect(() => {
    !home && !portfolio && (accept ? setModalShow(true) : setModalShow2(true));
    getUnivList();
    getEducationLevels();
  }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <div className="flexColumn">
          <div className="flexRow flexBetween flexAlignCenter mb-40">
            <div style={{ width: 20 }}></div>
            <h2 className="modal-head">Add Portfolio Details</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasic1" className="mb-20">
              <Form.Label>
                Your Portfolio Title<span style={{ color: "red" }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={title}
                onChange={(e) => (title = e.target.value)}
                placeholder="Eg. Web Developer, Analyst, Mechanic"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label>
                Your College Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <select
                defaultValue={college}
                onChange={(e) => (college = e.target.value)}
              >
                <option value="Select Your College/University">
                  Select Your College/University
                </option>
                {collegeList.map((college, index) => (
                  <option value={index}>{college}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="formBasic5" className="mb-20">
              <Form.Label>
                If not in above list:<span style={{ color: "red" }}></span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={other}
                onChange={(e) => (other = e.target.value.trim())}
                placeholder="Eg. Thapar University, Patiala"
              />
            </Form.Group>
            <Form.Group controlId="formBasic7" className="flexColumn mb-20">
              <Form.Label>
                Education Level<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <select
                defaultValue={educationLevel}
                onChange={(e) => (educationLevel = e.target.value)}
              >
                <option value="Eg. Undergraduate" disabled>
                  Eg. Undergraduate
                </option>
                {educationLevels.map((eduLevel) => (
                  <option value={eduLevel}>
                    {eduLevel.charAt(0).toUpperCase() + eduLevel.slice(1)}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="formBasic6" className="flexColumn mb-20">
              <Form.Label>
                Graduation Year<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <select
                defaultValue={gradYear}
                onChange={(e) => (gradYear = e.target.value)}
              >
                <option value="year" disabled>
                  Year
                </option>
                {graduationYears.map((year) => (
                  <option value={year.gradYear}>{year.gradYear}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="formBasic2">
              <Form.Label>
                Your Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={desc}
                onChange={(e) => (desc = e.target.value)}
                placeholder="Enter your short bio/description here"
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a onClick={() => Add()} className="flexAlignCenter modal-button">
              Create Portfolio
            </a>
          </div>
        </div>
      </Modal>
    );
  }
  
  const setAct = (option) => {
    setAccept(option)
  }

  return (
    <>
      {home ? (
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (isLogin) {
              if (portfolio) {
                history.push("/portfolio");
              } else {
                (accept ? setModalShow(true) : setModalShow2(true))
              }
            } else {
              WarningToast("You need to Login first!");
            }
          }}
          className="flexAlignCenter intro-button"
        >
          Get Started
        </a>
      ) : (
        <button
          onClick={() => {
            portfolio ? history.push("/portfolio") : (accept ? setModalShow(true) : setModalShow2(true));
          }}
          className="edit-your-portfolio grow1"
        >
          {portfolio ? "Move to your Portfolio" : "Edit your Portfolio"}
        </button>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {terms && !accept && <TermsnCondns setModalShow1={setModalShow} setModalShow={setModalShow2} modalShow={modalShow2} terms={terms} setAccept={setAct} />}
    </>
  );
}
