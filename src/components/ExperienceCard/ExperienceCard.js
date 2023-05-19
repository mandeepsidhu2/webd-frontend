import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import AdminService from '../../AdminServices/AdminService';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setExperiences } from '../../features/user/userSlice';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';
import UpdateExperience from '../UpdateModals/UpdateExperience';

export const ExperienceCard = ({ type, companyName, description, start, end, id, hide, open, close }) => {
    let invisible = hide;
    const [bullets, setbullets] = useState(true);
    const [drawer, setdrawer] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const text = description;
    const [isReadMore, setIsReadMore] = useState(true);

    const myStartMonth = new Date(start).toDateString().split(' ')[1];
    const myStartYear = new Date(start).toDateString().split(' ')[3];
    const startDate = myStartMonth + ' ' + myStartYear;

    let endDate;
    if(end) {
        const myEndMonth = new Date(end).toDateString().split(' ')[1];
        const myEndYear = new Date(end).toDateString().split(' ')[3];
        endDate = myEndMonth + ' ' + myEndYear;
    } else {
        endDate = "Present";
    }

    const OptionDrawer = () => {
        setdrawer(true);
        setbullets(false);
    }
    const CloseOptionDrawer = () => {
        setdrawer(false);
        setbullets(true);
    }

    const unHideCard = (uid) => {
        open();
        invisible = false;
        updateExperienceWidget(uid);
    }

    const HideCard = (uid) => {
        open();
        invisible = true;
        updateExperienceWidget(uid);
    }

    const toggleReadMore = () => {
        setIsReadMore(prevState => !prevState);
    }

    function DeleteModal(props) {
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
                        <h2 className="modal-head">Delete Work Experience</h2>
                        <button onClick={props.onHide}>
                            <AiOutlineCloseCircle style={{ fontSize: 40, color: 'black' }} />
                        </button>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
                            <Form.Label style={{ textAlign: 'center' }}>Are you sure you want to delete this card?</Form.Label>
                        </Form.Group>
                    </Form>
                    <div className="share" style={{ justifyContent: 'center' }}>
                        <a onClick={(e) => {
                            DeleteCard(props.uid);
                            setModalShow(false);
                        }} style={{ marginRight: 10 }} className="flexAlignCenter modal-button">Delete</a>
                        <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
                    </div>
                </div>
            </Modal>
        );
    }

    function ReadMore() {
        return (
            <p>
                {isReadMore ? text.slice(0, 300) : text}
                <span onClick={toggleReadMore} style={{color: "#4285F4", cursor: "pointer"}}>
                    {text.length > 300 ?  isReadMore ? " ...show more" : <div>show less</div> : null}
                </span>
            </p>
        );
    }

    const updateExperienceWidget = async () => {
        if (type && companyName && description && start) {
            let ExperienceData = {
                "type": type,
                "company_name": companyName,
                "description": description,
                "start_date": start,
                "end_date": end,
                "invisible": invisible,
            };

            AdminService.updateExperienceWidget(id, ExperienceData)
                .then(() => {
                    SuccessToast("Experience Updated!");
                    AdminService.getUserData()
                        .then((resp) => {
                            dispatch(setExperiences(resp.data));
                            close();
                            setModalShow(false)
                        })
                        .catch((err) => {
                            ErrorToast("Some Error Occured.");
                        })
                    close();
                })
                .catch((error) => {
                    ErrorToast("Error, Enter correct details!");
                    close();
                })
        } else {
            ErrorToast("Error, Fields cannot be empty!");
            close();
        }
    };

    const DeleteCard = async (uid) => {
        open();
        AdminService.deleteExperienceWidget(uid)
            .then(response => {
                SuccessToast("Card Successfully Deleted");
                AdminService.getUserData()
                    .then(resp => {
                        dispatch(setExperiences(resp.data));
                        close();
                    })
                    .catch(err => {
                        close();
                    });
            })
            .catch(error => {
                ErrorToast("Error, Cannot delete this card!");
                close();
            });
    }

    const DeleteCardPortal = () => {
        setModalShow(true);
    }

    return (
        <ClickAwayListener onClickAway={() => CloseOptionDrawer()}>
            <div className="course-card flexRow flexBetween">
                {
                    invisible && (
                        <div id="overlay" onClick={() => unHideCard(id)} className="flexColumn flexCenter flexAlignCenter mv-5">
                            <img src={hidecards} alt="hidden" className="hide-card-icon" style={{ height: 30, width: 30, marginBottom: 10 }} />
                            <p className="options-text" style={{ color: 'white' }}>Hidden</p>
                        </div>
                    )
                }
                <DeleteModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    uid={id}
                />
                <div className="flexColumn experience__section">
                    <span className="company__name" > <strong>{companyName}</strong> </span>
                    <span className="experience__date">{startDate} - {endDate} </span>
                    <div className="experience__desc">
                        <ReadMore />
                    </div>
                    <div className="experience__type">
                        <em>{type}</em>
                    </div>
                </div>
                <div className="flexRow flexCenter" style={{ position: 'relative' }}>
                    {bullets ? (
                        <div onClick={() => OptionDrawer()} className="flexRow option-drawer flexCenter flexAlignCenter iconcontainerCourse">
                            <BsThreeDotsVertical className="portfolio-icon" />
                        </div>
                    ) : null
                    }
                    {drawer ? (
                        <div className="flexColumn options" style={{ position: 'absolute', zIndex: 1000, left: 25 }}>
                            <div className="flexRow flexAlignCenter option delete-option drawerOption" onClick={() => DeleteCardPortal()}>
                                <img src={deleted} alt="delete" className="drawerImg" />
                            </div>
                            <div className="flexRow flexAlignCenter option edit-option drawerOption">
                                <UpdateExperience
                                    type={type}
                                    companyName={companyName}
                                    description={description}
                                    start={start}
                                    end={end}
                                    open={open}
                                    close={close}
                                    id={id} />
                            </div>
                            <div className="flexRow flexAlignCenter option hide-option drawerOption" onClick={() => HideCard(id)}>
                                <img src={hidden} alt="hide" className="drawerImg" />
                            </div>
                        </div>
                    ) : null
                    }
                </div>
            </div>
        </ClickAwayListener>
    );
}