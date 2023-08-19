import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import {users, setLocate} from '../faker/data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MainPage() {
  const FIRST_ITEMS_IN_PAGE = 20;
  const ITEMS_IN_PAGE = 10;
  const MAX_RANDOM = 1000;

  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [select, setSelect] = useState(true);
  const [page, setPage] = useState(1);
  const [random, setRandom] = useState(Math.floor(Math.random() * MAX_RANDOM));
  const [range, setRange] = useState(0);


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function() {
      document.removeEventListener('scroll', scrollHandler);
    }
  })

  useEffect(() => {
    if(data.length === 0) {
      setData(users(FIRST_ITEMS_IN_PAGE, page, random, range))
    } else {
      setData([...data, ...users(ITEMS_IN_PAGE, page, random, range)])
    }
    setFetching(false);
    setPage(prev=> prev + 1);
  }, [fetching])


  
  useEffect(() => {
    setData(users(FIRST_ITEMS_IN_PAGE, page, random, range))
    setFetching(false);
  }, [select])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  const selectHandler = (e) => {
    setLocate(e.target.value);
    setSelect(prevState => !prevState);
    setPage(1)
  }

  const randomHandler = () => {
    setRandom(Math.floor(Math.random() * MAX_RANDOM));
    setSelect(prevState => !prevState);
    setPage(1)
  }

  const onChangeRandom = (e) => {
    setRandom(+e.target.value);
    setSelect(prevState => !prevState);
    setPage(1)
  }

  const mistakeHandler = (e) => {
    if(e.target.value > MAX_RANDOM) {
      setRange(MAX_RANDOM)
    } else {
      setRange(+e.target.value)
    }
    setSelect(prevState => !prevState);
    setPage(1);
  }

  const rangeHandler = (e) => {
    setSelect(prevState => !prevState);
    setRange(+e.target.value);
    setPage(1);
  }

  return (
    <div>
      <Row className='pt-2 pb-2 m-auto'>
      <Col md={2}>
      <Form.Select aria-label="Default select example" onChange={selectHandler}>
        <option value="0">Russia</option>
        <option value="1">Polish</option>
        <option value="2">USA</option>
      </Form.Select>
      </Col>
      <Col md={3} className="d-flex align-items-center">
        <Button className='m-auto' variant="dark" onClick={randomHandler}>Random seed</Button>
        <Form.Control className='w-25' value = {random} onChange={onChangeRandom} />
      </Col>
      <Col md={3} className="d-flex align-items-center justify-content-between">
        <input type="range" value = {range} className="form-range w-50" min="0" max="10" step="0.25" id="customRange3" onChange={rangeHandler}/>
        <Form.Control className='w-25' value = {range} onChange={mistakeHandler} />
      </Col>
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
              <td>{elem.address}</td>
              <td>{elem.phone}</td>
            </tr>
      )}
    </tbody>
  </Table>
  </div> 
);
}

export default MainPage