import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import {users, setLocate} from '../faker/data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function MainPage() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function() {
      document.removeEventListener('scroll', scrollHandler);
    }
  })

  useEffect(() => {
    if(data.length === 0) {
      setData(users(10))
    } else {
      setData([...data, ...users(10)])
    }
    setFetching(false);
  }, [fetching])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  const selectHandler = (e) => {
    console.log(e.target.value)
  }

  return (
    <Container>
    <Row>
    <Col md={2} className='mb-2 mt-2'>
    <Form.Select aria-label="Default select example" onChange={selectHandler}>
      <option value="ru">Russia</option>
      <option value="pl">Polish</option>
      <option value="en_GB">Great Britain</option>
    </Form.Select>
    </Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    </Row>
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
      {data.map((elem, index) => 
            <tr key = {index}>
              <td>{index + 1}</td>
              <td>{elem.userId}</td>
              <td>{elem.fullName}</td>
              <td>{elem.address.city}, {elem.address.street}, {elem.address.streetAddress}</td>
              <td>{elem.phone}</td>
            </tr>
      )}
    </tbody>
  </Table>
  </Container>
    
);
}

export default MainPage