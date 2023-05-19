/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Modal, Form } from "react-bootstrap";
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiOutlineLink,
} from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import AdminService from "../../AdminServices/AdminService";
import { ErrorToast, SuccessToast } from "../../utility/localStorageControl";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPortfolio, userPortfolio } from "../../features/user/userSlice";

export default function AttachResumeModal({ open, close }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const portfolio = useSelector(userPortfolio);
  const [modalShow, setModalShow] = React.useState(false);
  var url = portfolio.cloud_resume_link;

  const ResumeAttach = async () => {
    open();
      if (url !== portfolio.cloud_resume_link && url !== "") {
        setModalShow(false);
        AdminService.AttachResume(url)
          .then((resp) => {
            AdminService.getUserData()
              .then((resp) => {
                setModalShow(false);
                dispatch(setPortfolio(resp.data));
                if (url.length > 0) {
                  SuccessToast("Resume Added!");
                  close();
                } else {
                  SuccessToast("Resume Removed!");
                  close();
                }
              })
              .catch((err) => {
                ErrorToast("Some Error Occured.");
                close();
              });
          })
          .catch((err) => {
            ErrorToast("Some Error Occured.");
            close();
          });
      } else {
        if(portfolio.cloud_resume_link === 'https://'){
          ErrorToast("Empty Field");
        } else {
          ErrorToast("No Change");
        }
        close();
      }
    close();
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
            <h2 className="modal-head">Attach your Resume</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label style={{ fontStyle: "Poppins" }}>
                Enter your Resume link in the form of PDF below
              </Form.Label>
              <textarea
                style={{
                  fontStyle: "Poppins",
                  borderRadius: 32,
                  margin: "10px 0",
                }}
                rows={5}
                type="text"
                class="form-control"
                defaultValue={url ? url : ""}
                placeholder="Example https://www.gdrive.com/profile/abc,.pdf"
                onChange={(event) => (url = event.target.value.trim())}
              />
            </Form.Group>
          </Form>

          <span className="modal-list">
            • Enter a proper Gdrive/Dropbox or any cloud link.
          </span>
          <span className="modal-list">
            • Upload the file in cloud in pdf format (Recommended).
          </span>
          <span className="modal-list">
            • Give Public Access to your shared link (Recommended).
          </span>

          <div className="share" style={{ justifyContent: "center" }}>
            <a
              className="flexAlignCenter modal-button"
              onClick={() => ResumeAttach()}
            >
              Add to profile
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
        <p className="resume-head">
          {url && url !== "https://"
            ? "View attached PDF"
            : "Attach your Resume"}
        </p>
        {url && url !== "https://" && (
          <div style={{ display: "flex", gap: 20 }}>
            <AiOutlineLink
              onClick={() => setModalShow(true)}
              className="grow2 attach-resume__icon"
            />
            <BsFillEyeFill
              onClick={() => window.open(url)}
              className="grow2 attach-resume__icon"
            />
          </div>
        )}
        {(!url || url === "https://") && (
          <AiOutlinePlusCircle
            onClick={() => setModalShow(true)}
            className="grow2 attach-resume__icon"
          />
        )}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
