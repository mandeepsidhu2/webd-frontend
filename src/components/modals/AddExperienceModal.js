/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Modal, Form } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import AdminService from "../../AdminServices/AdminService";
import { ErrorToast, SuccessToast, workExperiences } from "../../utility/localStorageControl";
import { useDispatch } from "react-redux";
import { setExperiences } from "../../features/user/userSlice";

export default function AddExperienceModal({ open, close }) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);

    let Type = "";
    let CompanyName = "";
    let Description = "";
    let StartDate = "";
    let EndDate = "";

    const AddExperience = () => {
        open();
        if (Type && CompanyName && Description && StartDate) {
            let ExperienceData = {
                "type": Type,
                "company_name": CompanyName,
                "description": Description,
                "start_date": StartDate,
                "end_date": EndDate ? EndDate : null,
            }
            AdminService.createExperienceWidget(ExperienceData)
                .then(res => {
                    SuccessToast("Details Entered!");
                    AdminService.getUserData()
                        .then((resp) => {
                            dispatch(setExperiences(resp.data));
                            close();
                            setModalShow(false);
                        })
                        .catch(err => {
                            ErrorToast("Some Error Occured.");
                            close();
                        });
                })
                .catch(error => {
                    ErrorToast("Error, Something went wrong");
                    close();
                });
        } else {
            ErrorToast("Error, Fields cannot be empty!");
            close();
        }
    }

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
                        <h2 className="modal-head">Add Work Experience</h2>
                        <button onClick={props.onHide}>
                            <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
                        </button>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="mb-20">
                            <Form.Label>Type*</Form.Label>
                            <br />
                            <select
                                defaultValue={Type}
                                onChange={e => (Type = e.target.value)}
                                style={{ width: "100%" }}
                            >
                                <option value="Eg. Internship/training">
                                    Eg. Internship/Training
                                </option>
                                {workExperiences.map((exp) => (
                                    <option value={exp.experience} key={exp.id}>
                                        {exp.experience}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail2" className="mb-20">
                            <Form.Label>
                                Company Name*
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Eg.  Tabber"
                                defaultValue={CompanyName}
                                onChange={(e) => (CompanyName = e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail3" className="mb-20">
                            <Form.Label>Description*</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description"
                                defaultValue={Description}
                                onChange={(e) => (Description = e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail4" className="mb-20">
                            <Form.Label>Start Date*</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={StartDate}
                                onChange={(e) => (StartDate = e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail5" className="mb-20">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={EndDate}
                                onChange={(e) => (EndDate = e.target.value)}
                            />
                        </Form.Group>

                    </Form>

                    <div className="share" style={{ justifyContent: "center" }}>
                        <a
                            onClick={() => {
                                AddExperience();
                                setModalShow(false);
                            }}
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
            <a className="mr-60 pointer grow1" onClick={() => setModalShow(true)}>
                <AiOutlinePlusCircle style={{ fontSize: 30, color: "#C0C0C0" }} />
            </a>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}