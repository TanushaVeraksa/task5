import React from 'react'
import Table from 'react-bootstrap/Table';
import {users} from '../faker/data'

function MainPage() {
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>№</th>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      {users.map((elem, index) => 
            <tr>
              <td>{index + 1}</td>
              <td>{elem.userId}</td>
              <td>{elem.fullName}</td>
              <td>{elem.address.city}, {elem.address.street}, {elem.address.streetAddress}</td>
              <td>{elem.phone}</td>
            </tr>
      )}
    </tbody>
  </Table>
);
}

export default MainPage