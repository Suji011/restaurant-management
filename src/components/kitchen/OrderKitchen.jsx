import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../services/baseurl';
import { orderContext } from '../../context/ContextShare';
import { Col, Card, Button, Container, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getOrderListAPI } from '../../services/allApiFile';
import "../../Stylings/kitchenModule.css"
function OrderKitchen() {
  const [orderList, setOrderList] = useState([])
  const [socket, setSocket] = useState(null);
  const getOrderListfn = async () => {
    console.log('Fetching order list...');
    try {
      const result = await getOrderListAPI();
      console.log('Order list result:', result);
      const data = await result.data;

      const filteredOrders = data.filter(order => order.orderStatus === 'Order Sent to Kitchen' || order.orderStatus === 'Started Preparation');

      setOrderList(filteredOrders);
    } catch (error) {
      console.error('Failed to fetch order list:', error);
    }
  };

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    newSocket.on('orderReceived', (receivedOrder) => {
      setOrderList((prevOrders) => [...prevOrders, receivedOrder]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    getOrderListfn();
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orderList.map(order =>
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    );

    socket.emit('updateOrderStatus', { orderId, newStatus });

    setOrderList(updatedOrders);
  };

  const processedOrderIds = new Set();

  return (
    <Container fluid>
      <Row>
        {orderList.map((order, index) => {
          if (order.orderStatus === "Order Rejected" || order.orderStatus === "Finished Preparation" || processedOrderIds.has(order.id)) {
            return null; 
          }
          processedOrderIds.add(order.id);

          return (
            <Col key={index} xs={12} sm={6} md={6} lg={4} xl={4} className='mt-5'>
        
        <Card className="card-custom">
      <Card.Header className="card-header-custom">Order #{index + 1}</Card.Header>
      <Card.Body className="card-body-custom">
        <Card.Title className="card-title-custom">{order.orderType}</Card.Title>
        <Card.Text>
          <strong>Status:</strong> <span className={
            order.orderStatus === 'Order Rejected' ? 'status-rejected' : 
            order.orderStatus === 'Finished Preparation' ? 'status-finished' : 
            'status-started'}>{order.orderStatus}</span>
          <ul>
            Items: {order.items.map((value, valueIndex) => (
              <li key={valueIndex} className="item-name">
                {value.foodItemName} (Code: {value.foodItemNumber}) - Quantity: {value.quantity}
              </li>
            ))}
          </ul>
          Placed at: {order.datePlaced}
        </Card.Text>
        <DropdownButton
          id="dropdown-basic-button"
          title={order.orderStatus ? order.orderStatus : "Order Status"}
          variant="danger"
          className="mb-3"
        >
          <Dropdown.Item 
            onClick={() => updateOrderStatus(order.id, 'Started Preparation')}
            className="dropdown-custom-warning"
          >
            Started Preparation
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={() => updateOrderStatus(order.id, 'Finished Preparation')}
            className="dropdown-custom-success"
          >
            Finished Preparation
          </Dropdown.Item>
          <Dropdown.Item 
            onClick={() => updateOrderStatus(order.id, 'Order Rejected')}
            className="dropdown-custom-danger"
          >
            Reject Order
          </Dropdown.Item>
        </DropdownButton>
      </Card.Body>
    </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default OrderKitchen;
