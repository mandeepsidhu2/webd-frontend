/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Modal, Form } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MailPreview from "../MailPreview/MailPreview";
import { ErrorToast, SuccessToast } from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import { setHistory } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { lte } from "lodash";

export default function SendViaEmail({ open, close }) {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  let mails = "";
  let resume = "";
  const resumeData = new FormData();

  const OptionalHeader = {
    "Content-Type":
      "multipart/form-data; boundary=<calculated when request is sent>",
  };

  const handleInput = (event) => {
    resume = event.target.files[0];
  };

  const SendMail = async () => {
    if (mails !== "" && mails.includes("@")) {
      setModalShow(false);
      open();
      resumeData.append("file", resume);
      AdminService.sendMailwithAttachment(mails, resumeData, OptionalHeader)
        .then((resp) => {
          if (resp.data.status === "success") {
            SuccessToast(resp.data.message);
            AdminService.getUserData().then((resp) =>
              dispatch(setHistory(resp.data))
            );
            close();
          } else {
            ErrorToast(resp.data.message);
            close();
          }
        })
        .catch((err) => {
          ErrorToast("Some Error occured.");
          close();
        });
    } else {
      ErrorToast("Missing email !");
    }
  };
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
            <div style={{ width: 20 }}></div>
            <h2 className="modal-head">Send via Email</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasic1" className="mb-20">
              <Form.Label>
                Enter the mail ID you would like to send the mail to
                <span style={{ color: "red" }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                type="email"
                defaultValue={mails}
                onChange={(event) => (mails = event.target.value.trim())}
                placeholder="example: anything@gmail.com"
              />
            </Form.Group>
            <Form.Group controlId="formBasic12" className="mb-20">
              <Form.Label>Upload Resume (Optional)</Form.Label>
              <Form.Control
                type="file"
                defaultValue={resume}
                onChange={(event) => handleInput(event)}
                placeholder="Click on Upload to attach resume"
              />
            </Form.Group>
          </Form>

          <div className="flexRow flexBetween">
            <div className="flexColumn">
              <span className="modal-list">
                • File size should not more than 10 MB.
              </span>
              <span className="modal-list">
                • File should be in PDF format.
              </span>
            </div>
          </div>

          <div className="share" style={{ justifyContent: "center" }}>
            <a onClick={SendMail} className="flexAlignCenter modal-button">
              Send Mail
            </a>
          </div>

          <div className="flexRow flexCenter end-section ph-20 flexAlignCenter mv-40">
            <hr style={{ width: "35%", color: "rgba(154,154,154,1)" }} />
            <p className="end-text" style={{ fontSize: 16 }}>
              Mail Preview
            </p>
            <hr style={{ width: "35%", color: "rgba(154,154,154,1)" }} />
          </div>

          <MailPreview />
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="share">
        <a
          className="flexRow flexAlignCenter email-button"
          style={{ cursor: "pointer" }}
          onClick={() => setModalShow(true)}
        >
          Send Email
        </a>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
