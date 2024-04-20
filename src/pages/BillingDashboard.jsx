import React, { useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav, ListGroup, Card, CardTitle } from 'react-bootstrap';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AddFoodItems from '../components/admin/AddFoodItems';
import MakeBill from '../components/billing/MakeBill';
import OrderB from '../components/billing/OrderB';
import HeaderDashboard from '../components/admin/HeaderDashboard';
import FailurePay from '../components/billing/FailurePay';
import SuccessPay from '../components/billing/SuccessPay';

function BillingDashboard() {
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    console.log(location)
    if (location.pathname === '/billing-dashboard/' || location.pathname === '/billing-dashboard') {
      navigate('/billing-dashboard/create-order');
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
              <ListGroup.Item className='text-center' action href="#overview" active></ListGroup.Item>
              <ListGroup.Item action href="/billing-dashboard/create-order" ><i class="fa-solid fa-bowl-rice mx-1"></i>Create Order</ListGroup.Item>

              <ListGroup.Item action href="/billing-dashboard/orders"><i class="fa-solid fa-list mx-1"></i>Orders</ListGroup.Item>


            </ListGroup>

          </Col>
          <Col>
            <Routes>

              <Route path='/create-order' element={<MakeBill />} />
              <Route path='/orders' element={<OrderB />} />
              <Route path='/payment/success' element={<SuccessPay />} />
              <Route path='/payment/fail' element={<FailurePay />} />
            </Routes>
          </Col>
        </Row>

      </Container></>
  )
}

export default BillingDashboard