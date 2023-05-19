/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
    SuccessToast,
    ErrorToast,
    workExperiences,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import edited from "../../assets/images/Edit-Icon.png";
import { useDispatch } from "react-redux";
import { setExperiences } from "../../features/user/userSlice";

export default function UpdateExperience({
    type,
    companyName,
    description,
    start,
    end,
    id,
    open,
    close
}) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = React.useState(false);

    let Type = type;
    let CompanyName = companyName;
    let Description = description;
    let Start = start;
    let End = end;

    const updateExperienceWidget = async () => {
            let ExperienceData = {
                "type": Type,
                "company_name": CompanyName,
                "description": Description,
                "start_date": Start,
                "end_date": End ? End : null,
            };
            AdminService.updateExperienceWidget(id, ExperienceData)
                .then(() => {
                    SuccessToast("Experience Updated!");
                    AdminService.getUserData()
                        .then((resp) => {
                            dispatch(setExperiences(resp.data));
                            close();
                            setModalShow(false);
                        })
                        .catch((err) => {
                            ErrorToast("Some Error Occured.")
                        })
                    close();
                })
                .catch((error) => {
                    ErrorToast("Error, Something went wrong");
                    close();
                });
        
    };


    const UpdateCard = () => {
        open();
        if (Type && CompanyName && Description && Start) {
            updateExperienceWidget();        
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
                        <h2 className="modal-head">Update Work Experience</h2>
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
                            style={{width: "100%"}}
                            >
                                <option value="Eg. Internship/training" disabled>
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
                                defaultValue={Start}
                                onChange={(e) => (Start = e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail5" className="mb-20">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                defaultValue={End}
                                onChange={(e) => (End = e.target.value)}
                            />
                        </Form.Group>

                    </Form>

                    <div className="share" style={{ justifyContent: "center" }}>
                        <a
                            onClick={() => {
                                UpdateCard();
                            }}
                            className="flexAlignCenter modal-button"
                        >
                            Update Work Experience
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
                className="drawerImg"
                alt="edit"
                onClick={() => setModalShow(true)}
            />

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}