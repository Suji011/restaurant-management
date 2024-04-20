import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { getFoodListAPI, updateOrdersAPI, getOrderListAPI, updateAOrderAPI, AddOrderAPI, editFoodItemAPI } from '../../services/allApiFile';
import { orderContext } from '../../context/ContextShare';
import io from 'socket.io-client';
import { BASE_URL } from '../../services/baseurl';
import Pay from './Pay';
import Checkout from './Checkout';
function MakeBill() {
    const [foodListBiller, setFoodListBiller] = useState([]);
    const [order, setOrder] = useState({});
    const [orderType, setOrderType] = useState('Dine In');
    const [orderList, setOrderList] = useState([]);
    const [originalOrderList, setOriginalOrderList] = useState([])
    const taxRate = 0.0525;
    const [socket, setSocket] = useState(null);
    const [token, setToken] = useState();
    const getOrderListfn = async () => {
        const result = await getOrderListAPI();
        const data = await result.data;
        setOrderList(data);
        setOriginalOrderList(JSON.parse(JSON.stringify(data)));

    };
    useEffect(() => {
        setToken(sessionStorage.getItem('token'));
    }, []);
    useEffect(() => {
        getOrderListfn();
    }, []);
    const updateOrders = async (orderId, orderDetails) => {
        try {
            const result = await updateAOrderAPI(orderId, orderDetails);
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const AddOrder = async (orderDetails) => {
        try {
            const result = await AddOrderAPI(orderDetails)
        } catch (error) {
            console.log("Error Adding Order Details", error)
        }
    }

    useEffect(() => {
        const newSocket = io(BASE_URL);
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        getFoodItemsForBiller();
    }, []);

    const getFoodItemsForBiller = async () => {
        try {
            const result = await getFoodListAPI();
            const formattedData = result.data.map(item => ({
                ...item,
                foodItemStock: parseInt(item.foodItemStock),
                foodItemNumber: parseInt(item.foodItemNumber),
                foodItemPrice: parseFloat(item.foodItemPrice),
                quantity: 0
            }));
            setFoodListBiller(formattedData);
        } catch (error) {
            console.error('Failed to fetch food list:', error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        const orderDetails = { orderStatus: newStatus };
        setOrderList(currentOrders =>
            currentOrders.map(order =>
                order.id === orderId ? { ...order, orderStatus: newStatus } : order
            )
        );
        await updateOrders(orderId, orderDetails);
    };
    const updatePaymentStatus = async (orderId, newPayStatus) => {
        const orderDetails = { paymentStatus: newPayStatus };

        setOrderList(currentOrders =>
            currentOrders.map(order =>
                order.id === orderId ? { ...order, paymentStatus: newPayStatus } : order
            )
        );
        await updateOrders(orderId, { paymentStatus: newPayStatus });
    };

    const addToOrder = (foodItemNumber) => {
        const foodItem = foodListBiller.find(item => item.foodItemNumber === foodItemNumber);
        if (foodItem && foodItem.foodItemStock > 0) {
            const updatedList = foodListBiller.map(item =>
                item.foodItemNumber === foodItemNumber ? { ...item, foodItemStock: item.foodItemStock - 1 } : item
            );
            setFoodListBiller(updatedList);

            const orderCopy = { ...order };
            orderCopy[foodItemNumber] = orderCopy[foodItemNumber]
                ? { ...orderCopy[foodItemNumber], quantity: orderCopy[foodItemNumber].quantity + 1 }
                : { ...foodItem, quantity: 1 };
            setOrder(orderCopy);
        }
    };

    useEffect(() => {
        if (socket) {
            const handleStatusReceived = (updatedOrderStatus) => {
                setOrderList(currentOrders =>
                    currentOrders.map(order =>
                        order.id === updatedOrderStatus.orderId ? { ...order, orderStatus: updatedOrderStatus.newStatus } : order
                    )
                );
                updateOrderStatus(updatedOrderStatus.orderId, updatedOrderStatus.newStatus)
            };

            socket.on('statusReceived', handleStatusReceived);

            return () => {
                socket.off('statusReceived', handleStatusReceived);
            };
        }
    }, [socket, setOrderList]);

    const removeFromOrder = (foodItemNumber) => {
        const orderCopy = { ...order };
        if (orderCopy[foodItemNumber] && orderCopy[foodItemNumber].quantity > 0) {
            const updatedList = foodListBiller.map(item =>
                item.foodItemNumber === foodItemNumber ? { ...item, foodItemStock: item.foodItemStock + 1 } : item
            );
            setFoodListBiller(updatedList);

            if (orderCopy[foodItemNumber].quantity === 1) {
                delete orderCopy[foodItemNumber];
            } else {
                orderCopy[foodItemNumber] = { ...orderCopy[foodItemNumber], quantity: orderCopy[foodItemNumber].quantity - 1 };
            }
            setOrder(orderCopy);
        }
    };

    const placeOrder = async () => {
        const newOrder = {
            items: Object.values(order),
            id: `order_${new Date().getTime()}`,
            orderType,
            paymentStatus: 'Not Paid',
            orderStatus: 'Order Placed',
            subtotal: calculateTotals().subtotal,
            tax: calculateTotals().tax,
            total: calculateTotals().total,
            datePlaced: new Date().toLocaleString()
        };
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        if (newOrder.total > 0) {
            setOrderList(prevOrderList => [...prevOrderList, newOrder]);
            await AddOrder(newOrder)
        }
        for (const item of Object.values(order)) {
            const updatedItem = { ...item, foodItemStock: item.foodItemStock - item.quantity };
            await editFoodItemAPI(item._id, updatedItem, reqHeader);
        }

        setOrder({});
    };

    const calculateTotals = () => {
        const subtotal = Object.values(order).reduce((acc, item) => acc + (item.foodItemPrice * item.quantity), 0);
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const sendToKitchen = (orderId) => {
        setOrderList(currentOrderList => {
            const updatedOrderList = currentOrderList.map((item) => {
                if (item.id === orderId) {
                    const updatedItem = { ...item, orderStatus: 'Order Sent to Kitchen' };
                    socket.emit('placeOrder', updatedItem);
                    updateOrderStatus(orderId, "Order Sent to Kitchen")
                    return updatedItem;
                }
                return item;
            });

            return updatedOrderList;
        });
    };
    const clearOrders = async () => {


    }

    return (
        <div className='mt-5'>
            <Container fluid>
                <Row>
                    <Col xs={12} md={8}>
                        <Row>

                            {foodListBiller.map((item) => (
                                <Col xs={12} sm={6} md={4} lg={6} className='mb-3'>
                                    <Card
                                        style={{
                                            background: `linear-gradient(125deg, #f7f7f7b9, #a39dbe61)`,
                                            maxWidth: '18rem',
                                            margin: 'auto'
                                        }}
                                        key={item.foodItemNumber}
                                    >
                                        <Card.Body>
                                            <Card.Title>{item.foodItemName}</Card.Title>
                                            <Card.Img variant="top" src={item ? `${BASE_URL}/uploads/${item.foodImage}` : null} alt="Food Item" style={{ height: '100px', width: '100px', borderRadius: '10%', objectFit: 'cover' }} />
                                            <Card.Text>
                                                <i class="fa-solid fa-money-bill-1-wave mx-1"></i>Price: ₹{item.foodItemPrice.toFixed(2)}<br />
                                                <i class="fa-solid fa-cubes-stacked mx-1"></i> Stock: {item.foodItemStock}
                                            </Card.Text>
                                            <Button className='m-1' variant="primary" onClick={() => addToOrder(item.foodItemNumber)}><i className="fas fa-plus"></i>Add</Button>
                                            <Button className='m-1' variant="danger" onClick={() => removeFromOrder(item.foodItemNumber)}><i className="fas fa-minus"></i>Remove</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card>
                            <Card.Header>Order Summary</Card.Header>
                            <ListGroup variant="flush">
                                {Object.values(order).map((item) => (
                                    <ListGroup.Item key={item.foodItemNumber}>
                                        {item.foodItemName} - ₹{item.foodItemPrice.toFixed(2)} x {item.quantity}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Card.Footer>
                                <div>Subtotal: ₹{calculateTotals().subtotal.toFixed(2)}</div>
                                <div>Tax: ₹{calculateTotals().tax.toFixed(2)}</div>
                                <div>Total: ₹{calculateTotals().total.toFixed(2)}</div>
                                <DropdownButton id="dropdown-item-button" title={orderType} className="mt-2">
                                    <Dropdown.Item as="button" onClick={() => setOrderType('Dine In')}>Dine In</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => setOrderType('Takeout')}>Takeout</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => setOrderType('Delivery')}>Delivery</Dropdown.Item>
                                </DropdownButton>
                                <Button variant="success" onClick={placeOrder} className="mt-2">Place Order</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        {orderList.map((order, index) => (
                            <Card style={{
                                background: ` linear-gradient(145deg, #e0eafc, #cfdef3)`,

                                margin: 'auto'
                            }} key={index} className="mb-2">
                                <Card.Body>
                                    <Card.Title className='text-primary'>Order | {order.orderType} <span>| {order.datePlaced}<br /></span>
                                    </Card.Title>
                                    <Card.Text>
                                        <span className=''> Order Id: {order.id}<br /></span>
                                        <span className='bg-warning-subtle p-1 rounded m-1'>  Status: {order.orderStatus}<br /></span>
                                        <span> Payment Status: {order.paymentStatus}<br /></span>
                                        Food Items:<span>
                                            {order.items.map((item, index) => (
                                                <div key={index}>
                                                    - {item.foodItemName} x {item.quantity}
                                                </div>
                                            ))}
                                        </span>

                                        <span>  Total: ₹{order.total.toFixed(2)}</span>
                                    </Card.Text>
                                    {order.orderStatus === 'Order Placed' && (
                                        <Button variant="primary" className='m-1' onClick={() => sendToKitchen(order.id)}><i className="fas fa-utensils"></i>Send to Kitchen</Button>
                                    )}

                                    {order.orderStatus === 'Finished Preparation' && (
                                        <Button
                                            variant="success" className='m-1'
                                            onClick={() => updateOrderStatus(order.id, 'Order Served to Customer')}
                                        >
                                            <i className="fas fa-concierge-bell"></i>Mark Order Served
                                        </Button>
                                    )}
                                    {
                                        order.orderStatus === 'Order Served to Customer' && order.paymentStatus === 'Paid' && (
                                            <Button variant="success" className='m-1' onClick={() => updateOrderStatus(order.id, 'Order Completed')}><i className="fas fa-check"></i>Mark Order Completed</Button>
                                        )
                                    }
                                    {
                                        order.paymentStatus === 'Not Paid' && (
                                            <Button variant="warning " className='m-1' onClick={() => updatePaymentStatus(order.id, 'Paid')}><i className="fas fa-cash-register"></i>Mark Cash Payment</Button>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MakeBill;
