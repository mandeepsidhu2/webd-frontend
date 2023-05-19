/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  PortalMap,
  setItem,
  getItem,
  SuccessToast,
  ErrorToast,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import edited from "../../assets/images/Edit-Icon.png";
import { useDispatch } from "react-redux";
import { setRankWidgets } from "../../features/user/userSlice";

export default function UpdateCodingProfile({
  portalName,
  Rank,
  userName,
  open,
  close,
  url,
}) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  var portal = portalName;
  const data = [
    "Geeks for Geeks",
    "CodeChef",
    "CodeForces",
    "HackerRank",
    "TopCoder",
    "LeetCode",
  ];
  var username = userName;
  var rank = Rank;

  const formatPortal = (portal) => {
    return portal.split(" ").join("").toLowerCase();
  };

  const updateRankWidget = async () => {
      const rankWidgetData = {
        rank: getItem("Codingrank"),
        website_id: getItem("website_id"),
        username: getItem("Codingusername"),
        link: url,
      };
      AdminService.updateRankWidget(rankWidgetData)
        .then((response) => {
          SuccessToast("Card Updated!");
          AdminService.getUserData()
            .then((resp) => {
              dispatch(setRankWidgets(resp.data));
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

  const getPortalDetails = (portal) => {
    if (portal !== "") {
      setItem("url", PortalMap.get(portal).url);
      setItem("website_id", PortalMap.get(portal).id);
      setItem("logo", PortalMap.get(portal).logo);
    }
  };

  const UpdateCard = () => {
    open();
    setItem("Codingportal", portal);
    getPortalDetails(formatPortal(getItem("Codingportal")));
    setItem("Codingusername", username);
    setItem("Codingrank", rank);
    
    if (portal && username && rank) {
      updateRankWidget();
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
            <h2 className="modal-head">Update Coding Profile</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group
              controlId="formBasicEmail"
              className=" flexColumn mb-20"
            >
              <Form.Label>Website Name</Form.Label>
              <select
                defaultValue={portal}
                onChange={(e) => (portal = e.target.value)}
              >
                <option value="Eg. GeeksforGeeks, CodeChef" disabled>
                  Eg. GeeksforGeeks, CodeChef
                </option>
                {data.map((platform) => (
                  <option value={platform}>{platform}</option>
                ))}
              </select>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-20">
              <Form.Label>Your Profile Username </Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. abc_234"
                defaultValue={username}
                onChange={(e) => (username = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword2" className="mb-20">
              <Form.Label>Your Profile Link </Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. https://www.codechef.com/users/abc1234"
                defaultValue={url}
                onChange={(e) => (url = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Your Rank</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. 2512"
                defaultValue={rank}
                onChange={(e) => (rank = e.target.value)}
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a
              onClick={() => {UpdateCard();}}
              className="flexAlignCenter modal-button"
            >
              Update Profile
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
        onClick={() => setModalShow(true)}
        style={{ height: 30, width: 30, marginRight: 10 }}
      />

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
