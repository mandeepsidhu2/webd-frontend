import React from 'react';
import '../../styles/HelperStyles.css';
import Header1 from '../../components/Header/Header1';
import Footer from '../../components/Footer/Footer';
import {  useEffect } from 'react';
import { useState } from "react";

import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import AdminService from '../../AdminServices/AdminService';

import {  Table } from "react-bootstrap";
function AdminScreen() {
    const [items, setItems] = useState([]);
  
    useEffect(async () => {
        const users =await AdminService.getListOfUsers();
        setItems(users.data)   
       
      }, []);
      const handleDropdownChange = (userId)=> async (event) => {
       // setSelectedValue(event.target.value);
       const updatedItems = items.map((item) => {
        if (item.user_id === userId) {
          return { ...item, plan_id: event.target.value };
        }
        return item;
      });
      
     await AdminService.updatePlanID(event.target.value,userId);
    
      setItems(updatedItems);
      };

      const renderTableRows = () => {
        return items.map((item) => (
          <tr key={item.user_id}>
            <td>{item.user_id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td> 
         
            <td><select value={item.plan_id} onChange={handleDropdownChange(item.user_id)}>
                <option value="0">Lite Plan</option>
                <option value="1">Blue Plan</option>
                <option value="2">Silver Plan</option>
      </select></td>  
          </tr>
        ));
      };

 

  return (
    <div className="about-screen">
        <Header1 />
        
        <div style={{width:"80%",marginLeft:"10%",marginTop:"5%"}}>
        <Table striped bordered hover style={{ borderRadius: 8 }}>
      <thead>
        <tr>
          <th className="table-head">User Id</th>
          <th className="table-head">Name</th>
          <th className="table-head">Email</th>
          <th className="table-head">Plan Level</th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </Table>
    </div>
        <Footer />
    </div>
  );
}

export default AdminScreen;
