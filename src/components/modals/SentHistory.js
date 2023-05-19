/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../../styles/HelperStyles.css";
import { Modal, Table, Pagination } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AdminService from "../../AdminServices/AdminService";
import { ErrorToast } from "../../utility/localStorageControl";
import { useDispatch, useSelector } from "react-redux";
import {
  setHistory,
  userHistory,
  userMailSent,
} from "../../features/user/userSlice";

export default function SentHistoryModal() {
  const dispatch = useDispatch();
  const mailSent = useSelector(userMailSent);
  const mailHistory = useSelector(userHistory);
  const [modalShow, setModalShow] = React.useState(false);
  const [active, setActive] = useState(1);
  let items = [];
  const pages = Math.floor(mailSent / 5) + 1;
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setActive(number);
          GetHistory(number, 5);
        }}
        style={{ cursor: "pointer" }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const GetHistory = async (page, item) => {
    AdminService.SentHistory(page, item)
      .then((resp) => {
        dispatch(setHistory(resp.data));
      })
      .catch((err) => {
        ErrorToast("Some Error Occured.");
      });
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
            <h2 className="modal-head">List of E-mail Sent History</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Table striped bordered hover style={{ borderRadius: 8 }}>
            <thead>
              <tr>
                <th className="table-head">Date</th>
                <th className="table-head">Email ID</th>
              </tr>
            </thead>
            <tbody>
              {props.history
                ? props.history.map((table) => (
                    <tr>
                      <td className="table-date">{table.date.split(" ")[0]}</td>
                      <td className="table-element">{table.email}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
          <div>
            <Pagination className="pageNumbers">
              <Pagination.Item
                key="First"
                active={1 === active}
                disabled={active === 1 ? true : false}
                onClick={() => {
                  setActive(active === 1 ? 1 : active - 1);
                  GetHistory(active === 1 ? 1 : active - 1, 5);
                }}
                style={{ cursor: "pointer" }}
              >
                Prev
              </Pagination.Item>
              {items}
              <Pagination.Item
                key="Next"
                active={true}
                disabled={active === pages ? true : false}
                onClick={() => {
                  setActive(active + 1);
                  GetHistory(active + 1, 5);
                }}
                style={{ cursor: "pointer" }}
              >
                Next
              </Pagination.Item>
            </Pagination>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="history">
        <button
          className="flexAlignCenter history-button"
          style={{ outline: "none", marginRight: 0 }}
          onClick={() => {
            setModalShow(true);
            GetHistory(1, 5);
          }}
        >
          View Sent History
        </button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        history={mailHistory}
      />
    </>
  );
}
