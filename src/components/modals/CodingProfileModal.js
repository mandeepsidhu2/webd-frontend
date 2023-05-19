/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import {
  PortalMap,
  setItem,
  getItem,
  ErrorToast,
  SuccessToast,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import { useDispatch, useSelector } from "react-redux";
import { setRankWidgets, userRankWidgets } from "../../features/user/userSlice";

export default function CodingProfileModal({ open, close }) {
  const rank_widgets = useSelector(userRankWidgets);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  var username = "";
  var link = "";
  var rank = "";
  var portal = "Eg. GeeksforGeeks, CodeChef";
  const data = [
    "Geeks for Geeks",
    "CodeChef",
    "CodeForces",
    "HackerRank",
    "TopCoder",
    "LeetCode",
  ];

  const formatPortal = (portal) => {
    return portal.split(" ").join("").toLowerCase();
  };

  const createRankWidget = async () => {
    var portalsArray = [];
    rank_widgets.map((rank) => portalsArray.push(rank.website_id));
    var exist = portalsArray.includes(getItem("website_id"));
    if (exist) {
      setModalShow(false);
      ErrorToast("Error, Site already exists!");
      close();
    } else {
      if (portal && username && rank && link) {
        const rankWidgetData = {
          rank: getItem("Codingrank"),
          website_id: getItem("website_id"),
          username: getItem("Codingusername"),
          link: link,
        };
        AdminService.createRankWidget(rankWidgetData)
          .then((response) => {
            SuccessToast("Details Entered!");
            AdminService.getUserData()
              .then((resp) => {
                setModalShow(false);
                dispatch(setRankWidgets(resp.data));
                close();
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
      } else {
        ErrorToast("Error, Fields cannot be empty!");
        close();
      }
    }
  };

  const getPortalDetails = (portal) => {
    if (portal !== "") {
      setItem("url", PortalMap.get(portal).url);
      setItem("website_id", PortalMap.get(portal).id);
      setItem("logo", PortalMap.get(portal).logo);
    }
  };

  const UpdateCard = () => {
    if (portal && username && rank && link) {
      open();
      setItem("Codingportal", portal);
      getPortalDetails(formatPortal(getItem("Codingportal")));
      setItem("Codingusername", username);
      setItem("Codingrank", rank);
      createRankWidget();
      setModalShow(false)
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
            <h2 className="modal-head">Add Coding Profile</h2>
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
                defaultValue={link}
                onChange={(e) => (link = e.target.value)}
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
