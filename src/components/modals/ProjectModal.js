/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Modal, Form } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import AdminService from "../../AdminServices/AdminService";
import { ErrorToast, SuccessToast } from "../../utility/localStorageControl";
import { useDispatch } from "react-redux";
import { setProjectWidgets } from "../../features/user/userSlice";

export default function ProjectModal({ open, close }) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  var url = "";
  var project = "";
  var description = "";
  var stack = "";
  var stacks = [];

  const createWidget = async () => {
      const projectWidgetData = {
        title: project,
        link: url,
        tech_stack: stacks,
        description: description,
      };
      AdminService.createProjectWidget(projectWidgetData)
        .then((response) => {
          SuccessToast("Details Entered!");
          AdminService.getUserData()
            .then((resp) => {
              dispatch(setProjectWidgets(resp.data));
              close();
              setModalShow(false);
            })
            .catch((err) => {
              ErrorToast("Some Error Occured.");
              close();
            });
        })
        .catch((error) => {
          ErrorToast("Error, Enter correct details!");
          close();
        });
  };

  const UpdateCard = () => {
    open();
    stacks = stack.split(",");
    if (url.length > 0 && project.length > 0) {
      createWidget();  setModalShow(false);
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
            <h2 className="modal-head">Add your work</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. Automated System, Buggy, Site Revamp"
                defaultValue={project}
                onChange={(e) => (project = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-20">
              <Form.Label>
                Project TechStack/Concepts Used *Separated by Commas(",")*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. Arduino, IOT, React"
                defaultValue={stack}
                onChange={(e) => (stack = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail3" className="mb-20">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. Automated System does this and that"
                defaultValue={description}
                onChange={(e) => (description = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword1" className="mb-20">
              <Form.Label>Project URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="http://www.google.com/"
                defaultValue={url}
                onChange={(e) => (url = e.target.value)}
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a
              onClick={() => UpdateCard()}
              className="flexAlignCenter modal-button"
            >
              Add to Profile
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div
        className="grow1 flexColumn flexCenter flexAlignCenter add-card"
        style={{ height: 280 }}
      >
        <button onClick={() => setModalShow(true)}>
          <AiOutlinePlusCircle style={{ fontSize: 80, color: "#C0C0C0" }} />
        </button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
