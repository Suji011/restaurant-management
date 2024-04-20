import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getOrderListAPI } from '../../services/allApiFile';
import styles from '../../Stylings/OrdersPage.module.css'; // Make sure to create this CSS file as described

function OrderB() {

    const [orderList, setOrderList] = useState([]);

    const getOrderListfn = async () => {
        console.log('Fetching order list...');
        try {
            const result = await getOrderListAPI();
            console.log('Order list result:', result);
            const data = await result.data;

            const uniqueOrders = data.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

            setOrderList(uniqueOrders);
        } catch (error) {
            console.error('Failed to fetch order list:', error);
        }
    };

    useEffect(() => {
        getOrderListfn();
    }, []);

    return (
        <Container fluid className={styles.responsiveContainer}>
            <Table striped bordered hover responsive="sm" className={`mt-3 ${styles.customTable}`}>
                <thead className={styles.thead}>
                    <tr>
                        <th>#</th>
                        <th>Order Type</th>
                        <th>Items</th>
                        <th>Date Placed</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.orderType}</td>
                            <td>
                                {order.items.map((item, index) => (
                                    <div key={index}>
                                        - {item.foodItemName}
                                    </div>
                                ))}
                            </td>                           
                            <td>{order.datePlaced}</td>
                            <td>₹{order.total.toFixed(2)}</td>
                            <td>{order.orderStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default OrderB;
