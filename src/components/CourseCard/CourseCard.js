import React, {useState} from 'react'
import { ClickAwayListener } from '@material-ui/core';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import AdminService from '../../AdminServices/AdminService';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCourses } from '../../features/user/userSlice';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';
import UpdateCourseTaken from '../UpdateModals/UpdateCourseTaken';

export const CourseCard = ({name, issuer, link, id, hide, open, close}) => {  
    let invisible = hide;
    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch()

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
        updateCourseWidget(uid);
    }

    const HideCard = (uid) => {
        open();
        invisible = true;
        updateCourseWidget(uid)
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
                <div style={{width: 20}}></div>
                <h2 className="modal-head">Delete Course</h2>
                <button onClick={props.onHide}>
                  <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
                </button>
              </div>
              <Form>
                <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
                  <Form.Label style={{textAlign: 'center'}}>Are you sure you want to delete this card?</Form.Label>
                </Form.Group>
              </Form>
      
              <div className="share" style={{justifyContent: 'center'}}>
                <a onClick={(e) => {
                    DeleteCard(props.uid); 
                    setModalShow(false); 
                }} style={{marginRight: 10}} className="flexAlignCenter modal-button">Delete</a>
                <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
              </div>
      
            </div>
          </Modal>
        );
    }

    const updateCourseWidget = async () => {
        if (name && issuer && link) {
          let CourseData = {
            "course_name": name,
            "issuer": issuer,
            "certificate_link": link,
            "invisible": invisible,
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
        } else {
          ErrorToast("Error, Fields cannot be empty!");
          close();
        }
    };

    const DeleteCard = async (uid) => {
        open();
        AdminService.deleteCourseWidget(uid)
            .then(response => {
                SuccessToast('Card Successfully Deleted');
                AdminService.getUserData()
                    .then(resp => {
                      dispatch(setCourses(resp.data));
                      close();
                    })
                    .catch(err => {
                        close();
                      });
                })
            .catch(error => {
                ErrorToast('Error, Cannot delete this card!');
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
                            <img src={hidecards} alt="hidden" className="hide-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                            <p className="options-text" style={{color: 'white'}}>Hidden</p>
                        </div>
                    )
                }
                <DeleteModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    uid={id}
                />
                {/* <img 
                    src="https://play-lh.googleusercontent.com/qq5__wITsoCx2kUK8TqVW2-8UDRuxET9kCzPzAPHad8umXiHRF2N0tZKuLezd0tiBQg" 
                    className="course__logo"  
                /> */}
                <div className="flexColumn">
                    <a href={link} className="course__name" >{name}</a>
                    <span className="course__issuer">{issuer}</span>
                </div>
                <div className="flexRow flexCenter" style={{position: 'relative'}}>
                    { bullets ? (
                        <div onClick={() => OptionDrawer()} className="flexRow option-drawer flexCenter flexAlignCenter iconcontainerCourse">
                            <BsThreeDotsVertical className="portfolio-icon" />                    
                        </div>
                        ) : null 
                    }
                    { drawer ? (
                        <div className="flexRow flexStart options" style={{position: 'absolute', zIndex: 1000}}>
                            <div className="flexRow flexAlignCenter option delete-option drawerOption" onClick={() => DeleteCardPortal()}>
                                <img src={deleted} alt="delete" className="drawerImg" />
                            </div>    
                            <div className="flexRow flexAlignCenter option edit-option drawerOption">
                                <UpdateCourseTaken name={name} link={link} issuer={issuer} open={open} close={close} id={id} />
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
    )
}