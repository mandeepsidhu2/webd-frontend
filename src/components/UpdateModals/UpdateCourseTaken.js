/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  SuccessToast,
  ErrorToast,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import edited from "../../assets/images/Edit-Icon.png";
import { useDispatch } from "react-redux";
import { setCourses } from "../../features/user/userSlice";

export default function UpdateCourseTaken({
  name,
  link,
  issuer,
  id,
  open,
  close
}) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);

  let CourseName = name;
  let InstituteName = issuer;
  let CourseLink = link;

  const updateCourseWidget = async () => {
      let CourseData = {
        "course_name": CourseName,
        "issuer": InstituteName,
        "certificate_link": CourseLink
      };
      AdminService.updateCourseWidget(id,CourseData)
        .then(() => {
          SuccessToast("Course Updated!");
          AdminService.getUserData()
            .then((resp) => {
              dispatch(setCourses(resp.data));
              close();
              setModalShow(false);
            })
            .catch((err) => ErrorToast("Some Error Occured."));
          close();
        })
        .catch((error) => {
          ErrorToast("Error, Enter correct details!");
          close();
        });
  };

  const UpdateCard = () => {
    open();
    if (CourseName && InstituteName && CourseLink) {
      updateCourseWidget();
      setModalShow(false);
    } else {
      ErrorToast("Error, Fields cannot be empty!");
      close();
    }
  };

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
            <h2 className="modal-head">Update Course Taken</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Course Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  Data Structures & Algorithm"
                defaultValue={CourseName}
                onChange={(e) => (CourseName = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-20">
              <Form.Label>
                Institute Name*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  Coursera"
                defaultValue={InstituteName}
                onChange={(e) => (InstituteName = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail3" className="mb-20">
              <Form.Label>Course Certification Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  https://www.google.com"
                defaultValue={CourseLink}
                onChange={(e) => (CourseLink = e.target.value)}
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a
              onClick={() => {UpdateCard();}}
              className="flexAlignCenter modal-button"
            >
              Update Course
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <img
        src={edited}
        alt="edit"
        className="drawerImg"
        onClick={() => setModalShow(true)}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
