import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './SearchScreen.css';
import Header1 from '../../components/Header/Header1';
import Axios from 'axios';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import { ErrorToast } from '../../utility/localStorageControl';
import  AdminService  from '../../AdminServices/AdminService';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

function TermsScreen() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
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
    loadDataFromGithub({ username: query, per_page: 10, page: pageNumber });
  };

  const renderTableRows = () => {
    return items.map((item) => (
      <tr key={item.id}>
        <td><a target="_blank" href={item.html_url}><img height="48px" width="48px"  src={item.avatar_url}></img></a></td>
        <td>{item.login}</td>
        <td>{item.url}</td>
      </tr>
    ));
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
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
    loadDataFromGithub({ username: queryParam, per_page: 10, page: 1 });
    setQuery(queryParam);
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('query');
      setQuery(queryParam);
      setCurrentPage(1);
      loadDataFromGithub({ username: queryParam, per_page: 10, page: 1 });
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
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination">{renderPaginationButtons()}</ul>
      </nav>
    </div>
  );
}

export default TermsScreen;
