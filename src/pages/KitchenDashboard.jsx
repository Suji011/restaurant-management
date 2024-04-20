import React, { useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, ListGroup, Card, CardTitle } from 'react-bootstrap';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import OrderKitchen from '../components/kitchen/OrderKitchen';
import OrderB from '../components/billing/OrderB';
import HeaderDashboard from '../components/admin/HeaderDashboard';

const KitchenDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    console.log(location)
    if (location.pathname === '/kitchen-dashboard/' || location.pathname === '/kitchen-dashboard') {
      navigate('/kitchen-dashboard/order-management');
    }
  }, [navigate, location.pathname]);
  return (
    <>
      <HeaderDashboard />
      <div></div>
      <Container fluid>

        <Row>
          <Col xs={12} md={3} lg={2} className="bg-light pt-3 sidebar">
            <ListGroup>
              <ListGroup.Item className='text-center' action href="" active><i class="fa-solid fa-caret-down"></i></ListGroup.Item>
              <ListGroup.Item action href="/kitchen-dashboard/order-management" ><i class="fa-solid fa-bowl-food mx-1"></i>Live Orders</ListGroup.Item>
              <ListGroup.Item action href="/kitchen-dashboard/orders"><i class="fa-solid fa-list mx-1"></i>Orders</ListGroup.Item>


            </ListGroup>

          </Col>
          <Col>

            <Routes>
              <Route path='/order-management' element={<OrderKitchen />} />
              <Route path='/orders' element={<OrderB />} />

            </Routes>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default KitchenDashboard;
