/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  ErrorToast,
  SuccessToast,
  graduationYears,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import { useSelector, useDispatch } from "react-redux";
import {
  setPortfolio,
  setName,
  userName,
  userPortfolio,
} from "../../features/user/userSlice";
import { API_ENDPOINT } from "../../AdminServices/baseUrl";
import axios from "axios";

export default function UpdatePortfolioModal({ open, close }) {
  const dispatch = useDispatch();
  const name = useSelector(userName);
  const portfolio = useSelector(userPortfolio);
  const [modalShow, setModalShow] = useState(false);
  const [collegeList, setList] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);

  let title = portfolio && portfolio.title;
  let desc = portfolio && portfolio.description;
  let college = portfolio && portfolio.college_num - 1;
  let name11 = name;
  let other = portfolio && portfolio.college_num !== -1 ? "" : portfolio && portfolio.college;
  let gradYear = portfolio && portfolio.graduation_year;
  let educationLevel = portfolio && portfolio.education_level;

  const UpdatePortfolio = async () => {
      const UpdatePortfolioData = {
        title: title,
        description: desc,
        college: other.length >= 1 ? -1 : college,
        college_others: other,
        graduation_year: gradYear,
        education_level: educationLevel,
      };

      AdminService.updatePortfolio(UpdatePortfolioData)
        .then((resp) => {
          SuccessToast("Details Updated!");
          AdminService.getUserData()
            .then((resp) => {
              dispatch(setPortfolio(resp.data));
              setModalShow(false);
              close();
            })
            .catch((err) => {
              ErrorToast("Some Error Occured.");
              close();
            });
        })
        .catch((err) => {
          ErrorToast("Error, Please retry!");
          close();
        });    
      if (name11 && name11 !== name) {
        AdminService.UpdateName(name11)
          .then((res) => {
            AdminService.getUserData()
              .then((resp) => {
                dispatch(setName(resp.data));
                SuccessToast("Details Updated!");
                setModalShow(false);
                close();
              })
              .catch((err) => {
                ErrorToast("Some Error Occured.");
                close();
              });
          })
          .catch((err) => {
            ErrorToast("Error, Please retry!");
            close();
          });
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

  const Add = () => {
    open();
    if (
      title &&
      desc.length > 0 &&
      title.length > 0 &&
      (college !== -2 || other.length > 0) &&
      educationLevel &&
      gradYear
    ) {
      UpdatePortfolio(); setModalShow(false);
    } else {
      ErrorToast("Error, Fields cannot be empty!");
      close();
    }
  };

  useEffect(() => {
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
            <h2 className="modal-head">Update Portfolio Details</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasic2" className="mb-20">
              <Form.Label>
                Your Name<span style={{ color: "red" }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={name11}
                onChange={(e) => (name11 = e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>
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
                onChange={(e) => {
                  other = "";
                  return (college = e.target.value);
                }}
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
                onChange={(e) => {
                  other = e.target.value.trim();
                }}
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
            <a onClick={() => {Add();} } className="flexAlignCenter modal-button">
              Update Portfolio
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="history">
        <button
          className="flexAlignCenter history-button"
          style={{ outline: "none", marginRight: 0 }}
          onClick={() => {
            setModalShow(true);
          }}
        >
          Edit Portfolio
        </button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
