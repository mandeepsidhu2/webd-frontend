/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import AdminService from '../../AdminServices/AdminService';
import edited from '../../assets/images/Edit-Icon.png';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';
import { useDispatch } from 'react-redux';
import { setProjectWidgets } from '../../features/user/userSlice';

export default function UpdateProject({projectName, projectlink, ProjectDesc, ProjectStack, projectId, open, close}) {
  const dispatch = useDispatch();  
  const [modalShow, setModalShow] = React.useState(false);
  var url = projectlink;
  var project = projectName;
  var project_id = projectId;
  var stack = ProjectStack;
  var stacks = [];
  var description = ProjectDesc;

  const updateWidget = async (id) => {
    
        const projectWidgetData = {
          'title' : project,
          'link' : url,
          'tech_stack' : stacks,
          'description' : description
        }
      AdminService.updateProjectWidget(id, projectWidgetData)
        .then(response => {
          SuccessToast('Card Updated!')
          AdminService.getUserData()
            .then(resp => {
              dispatch(setProjectWidgets(resp.data));
              close();
              setModalShow(false);
            })
            .catch(err => ErrorToast("Some Error Occured."));
            close();
        })
        .catch(error => {
          ErrorToast('Error, Enter correct details!')
          close();
        });
  }

  const UpdateCard = (id) => {
    open();
    if(stack !== ProjectStack){
      stacks = stack.split(',')
    } else{
      stacks = stack;
    }
    if(url.length > 0 && project.length > 0 ){
      updateWidget(id);
      setModalShow(false);
    } else {
      ErrorToast('Error, Fields cannot be empty!')
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
      >
        <div className="flexColumn">
          <div className="flexRow flexBetween flexAlignCenter mb-40">
            <div style={{width: 20}}></div>
            <h2 className="modal-head">Update your Project</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Eg. Automated System" defaultValue={project} onChange={(e) => project = (e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-20">
              <Form.Label>Project TechStack   *Separated by Commas(",")*</Form.Label>
              <Form.Control type="text" placeholder="Eg. Arduino, IOT, React" defaultValue={stack} onChange={(e) => stack = (e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail3" className="mb-20">
              <Form.Label>Project Description</Form.Label>
              <Form.Control type="text" placeholder="Eg. Automated System does this and that" defaultValue={description} onChange={(e) => description = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword1" className="mb-20">
              <Form.Label>Project URL</Form.Label>
              <Form.Control type="text" placeholder="http://www.google.com/" defaultValue={url} onChange={(e) => url = (e.target.value)} />
            </Form.Group>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard(project_id)} className="flexAlignCenter modal-button">Update Card</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
        <img src={edited} alt="hidden" onClick={() => setModalShow(true)} className="edit-card-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer'}} />
  
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </>
  );
}