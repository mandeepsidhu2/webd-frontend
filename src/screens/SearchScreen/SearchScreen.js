import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './SearchScreen.css';
import Header1 from '../../components/Header/Header1';
import Axios from 'axios';
import { ErrorToast } from '../../utility/localStorageControl';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import {  Table } from "react-bootstrap";

function TermsScreen() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;
  const history = useHistory();

  const loadDataFromGithub = async (query) => {
    Axios.get( "https://api.github.com"+ '/search/users?q='+query.username+'&per_page='+query.per_page+'&page='+query.page)
    .then(resp => {
        setItems(resp.data.items)
        setTotalItems(resp.data.total_count)
    })
    .catch(err => {
      
        ErrorToast("GitHub Free Rate Limit exceed! Please Wait");
      })
  
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadDataFromGithub({ username: query, per_page: itemsPerPage, page: pageNumber });
  };

  const renderTableRows = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td><a href={item.html_url}><img height="48px" width="48px" src={item.avatar_url} target ="_blank" ></img></a></td>
        <td>{item.login}</td>  
      </tr>
    ));
  };

  const renderPaginationButtons = () => {
   // const totalPages = Math.floor(totalItems / itemsPerPage);
   const totalPages =  Math.floor(1000 / itemsPerPage);// only first 1000 are available
    const buttons = [];

    // First page button
    buttons.push(
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} key="first">
        <button className="page-link" onClick={() => handlePageChange(1)}>
          First
        </button>
      </li>
    );

    // Previous page button
    buttons.push(
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} key="previous">
        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
      </li>
    );

    // Current page and total pages display
    buttons.push(
      <li className="page-item disabled" key="current">
        <span className="page-link">
          Page {currentPage} of {totalPages}
        </span>
      </li>
    );

    // Next page button
    buttons.push(
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} key="next">
        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </li>
    );

    // Last page button
    buttons.push(
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} key="last">
        <button className="page-link" onClick={() => handlePageChange(totalPages)}>
          Last
        </button>
      </li>
    );

    return buttons;
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('query');
    loadDataFromGithub({ username: queryParam, per_page: itemsPerPage, page: 1 });
    setQuery(queryParam);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('query');
      setQuery(queryParam);
      setCurrentPage(1);
      loadDataFromGithub({ username: queryParam, per_page: itemsPerPage, page: 1 });
    };

    history.listen(handleLocationChange);
  }, [history]);

  return (
    
    <div>
              <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header1 />
      <div style={{width:"80%",marginLeft:"10%",marginTop:"5%"}}>
      <Table striped bordered hover style={{ borderRadius: 8 }}>
            <thead>
              <tr>
                <th className="table-head">Login</th>
                <th className="table-head">Name</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </Table>

      <div style={{marginLeft:"26%"}}>
      <nav aria-label="Page navigation">
        <ul className="pagination">{renderPaginationButtons()}</ul>
      </nav>
      </div>
        </div>

    </div>
  );
}

export default TermsScreen;
