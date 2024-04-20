import React from 'react';
import { Container, Row, Col, Navbar, Nav, ListGroup, Card, CardTitle } from 'react-bootstrap';
import AddFoodItems from '../components/admin/AddFoodItems';
import { Link, Route, Routes } from 'react-router-dom';
import Users from '../components/admin/Users';
import OrderB from '../components/billing/OrderB';
import Profile from '../components/GeneralComponents/Profile';
import HeaderDashboard from '../components/admin/HeaderDashboard';
import Reports from '../components/admin/Reports';

const Dashboard = () => {
  return (
    <>
      <HeaderDashboard />
      <div></div>

      <Container fluid>

        <Row>
          <Col xs={12} md={3} lg={2} className="bg-light pt-3 sidebar">
            <ListGroup>
              <ListGroup.Item className='text-center' action href="/admin-dashboard" active><i class="fa-solid fa-file mx-1"></i>Reports</ListGroup.Item>
              <ListGroup.Item action href="/admin-dashboard/food-items" ><i class="fa-solid fa-bowl-food mx-1"></i>Food Items</ListGroup.Item>
              <ListGroup.Item action href="/admin-dashboard/users"> <i class="fa-regular fa-user mx-1"></i>Users</ListGroup.Item>
              <ListGroup.Item action href="/admin-dashboard/orders"><i class="fa-solid fa-list mx-1"></i>Orders</ListGroup.Item>


            </ListGroup>

          </Col>
          <Col>
            <Routes>
              <Route path='/' element={<Reports />} />

              <Route path='/food-items' element={<AddFoodItems />} />
              <Route path='/users' element={<Users />} />
              <Route path='/orders' element={<OrderB />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default Dashboard;
