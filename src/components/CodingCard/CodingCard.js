/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import {PortalMap, SuccessToast, ErrorToast} from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import UpdateCodingProfile from '../UpdateModals/UpdateCodingProfile';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import { ClickAwayListener } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setRankWidgets } from '../../features/user/userSlice';

export default function CodingCard({name, rank, id, logo, hide, open, close, url}){      
    const dispatch = useDispatch();  
    var invisible = hide;
    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [icon1, seticon1] = useState(true);
    const [icon2, seticon2] = useState(true);
    const [icon3, seticon3] = useState(true);
    const [modalShow, setModalShow] = React.useState(false);

    const OptionDrawer = () => {
        setdrawer(true);
        setbullets(false);
    }
    const CloseOptionDrawer = () => {
        setdrawer(false);
        setbullets(true);
    }

    const formatPortal = portal => {
        return portal.split(' ').join('').toLowerCase();
    }

    const updateRankWidget = async (name) => { 
          open();       
          var website_name = formatPortal(name);
          var website_id = PortalMap.get(website_name).id;
          const rankWidgetData = {
            'website_id' : website_id,
            'rank' : rank,
            'username': id,
            'invisible' : invisible,
            'link' : url,
          }
          AdminService.updateRankWidget(rankWidgetData)
            .then(response => {
              SuccessToast('Card Updated!');
              AdminService.getUserData()
                .then(resp => {
                  dispatch(setRankWidgets(resp.data));
                  close();
                })
                .catch(err => {
                  ErrorToast('Some Error Occured!');
                  close();
                });
            })
            .catch(error => {
              ErrorToast('Error Updating!');
              close();
            });
        }

      const unHideCard = (name) => {
        open();
        invisible = false;
        updateRankWidget(name);
      }
  
      const HideCard = (name) => {
        open();
        invisible = true;
        updateRankWidget(name)
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
                <h2 className="modal-head">Delete Card</h2>
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
                <a onClick={(e) => {DeleteCard(name); setModalShow(false); }} className="flexAlignCenter modal-button mr-10">Delete</a>
                <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
              </div>
      
            </div>
          </Modal>
        );
      }

    const DeleteCard = async (name) => {
        open();
        var website_name = formatPortal(name);
        var website_id = PortalMap.get(website_name).id;

        AdminService.deleteRankWidget(website_id)
            .then(response => {
                SuccessToast('Card Successfully Deleted');
                AdminService.getUserData()
                    .then(resp => {
                      dispatch(setRankWidgets(resp.data));
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

    const DeleteCardPortal = (name) => {
        setModalShow(true);
    }

    return(
          <ClickAwayListener onClickAway={() => CloseOptionDrawer()}>
            <div className="grow1 card11 flexColumn profile-card">
                {
                    invisible ? (
                        <div id="overlay" onClick={() => unHideCard(name)} className="flexColumn flexCenter flexAlignCenter">
                            <img src={hidecards} alt="hidden" className="hide-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                            <p className="options-text" style={{color: 'white'}}>Hidden</p>
                        </div>
                    ) : null
                }
                <div className="flexRow flexCenter" style={{position: 'relative'}}>
                    {logo === "" ? (
                        <div className="flexRow flexCenter flexAlignCenter empty-logo">
                            <p className="profile-name" style={{fontWeight: 700, color: 'white'}}>LOGO</p>
                        </div>
                    ) : (
                        <img className="logo" src={logo} alt="logo" />
                    )}
                    { bullets ? (
                        <div onClick={() => OptionDrawer()} className="flexRow option-drawer flexCenter flexAlignCenter iconcontainer">
                            <BsThreeDotsVertical className="portfolio-icon" />                    
                        </div>
                        ) : null 
                    }
                    { drawer ? (
                        <div className="flexColumn flexStart options contestProfile">
                            {icon1 ? (<img src={deleted} alt="delete" onMouseEnter={() => {setoption1(true); seticon1(false);}} onClick={() => DeleteCardPortal(name)} className="delete-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option2 ? 50 : null || option3 ? 50 : null}} />) : null }
                            { option1 ? (
                                <div className="flexRow flexAlignCenter option delete-option drawerOption1" onClick={() => DeleteCardPortal(name)} onMouseLeave={() => {setoption1(false); seticon1(true);}} >
                                    <img src={deleted} alt="delete" className="drawerImg" />
                                    <p className="options-text">Delete</p>
                                </div>                            
                                ) : null
                            }
                            {icon2 ? (<img src={edited} alt="edit" onMouseEnter={() => {setoption2(true); seticon2(false);}} className="edit-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option1 ? 50 : null || option3 ? 50 : null}} />) : null}
                            { option2 ? (
                                <ClickAwayListener onClickAway={() => {setoption2(false); seticon2(true);}}>
                                  <div className="flexRow flexAlignCenter option edit-option drawerOption1">
                                      <UpdateCodingProfile portalName={name} Rank={rank} userName={id} open={open} close={close} url={url} />
                                      <p className="options-text">Edit</p>
                                  </div>                                
                                </ClickAwayListener>
                                ) : null
                            }
                            {icon3 ? (<img src={hidden} alt="hide" onMouseEnter={() => {setoption3(true); seticon3(false);}} className="hide-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option2 ? 50 : null || option1 ? 50 : null}} />) : null}
                            { option3 ? (
                                <div className="flexRow flexAlignCenter option hide-option drawerOption1" onClick={() => HideCard(name)} onMouseLeave={() => {setoption3(false); seticon3(true);}} >
                                    <img src={hidden} alt="hide" className="drawerImg" />
                                    <p className="options-text">Hide</p>
                                </div>
                                ) : null
                            }
                        </div>
                        ) : null
                    }
                </div>
                <DeleteModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div style={{cursor: 'pointer'}}  onClick={() => window.open(url)}>
                  <p className="profile-head mb-10"> {name === "" ? "Company Name" : name}</p>
                  <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
                  <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
                </div>
            </div>
          </ClickAwayListener>
    );
}