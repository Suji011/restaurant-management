import React, { useEffect, useState } from 'react';
import { getOrderListAPI, getFoodListAPI } from '../../services/allApiFile';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
import { Container, Row, Col, Card } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const [orders, setOrders] = useState([]);
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResult = await getOrderListAPI();
                const foodListResult = await getFoodListAPI();
                setOrders(ordersResult.data);
                setFoodList(foodListResult.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateTotalSalesToday = () => {
        const startOfDay = moment().startOf('day');
        return orders.reduce((acc, order) => {
            const orderDate = moment(order.datePlaced);
            if (orderDate.isSameOrAfter(startOfDay)) {
                return acc + parseFloat(order.total);
            }
            return acc;
        }, 0);
    };

    const calculateTotalSalesThisMonth = () => {
        const startOfMonth = moment().startOf('month');
        return orders.reduce((acc, order) => {
            const orderDate = moment(order.datePlaced);
            if (orderDate.isSameOrAfter(startOfMonth)) {
                return acc + parseFloat(order.total);
            }
            return acc;
        }, 0);
    };

    const totalSalesAmountTillNow = orders.reduce((acc, order) => acc + parseFloat(order.total), 0);
    const totalNumberOfOrdersTillNow = orders.length;
    const totalSalesAmountThisMonth = calculateTotalSalesThisMonth();
    const totalSalesAmountToday = calculateTotalSalesToday();
    const totalOrdersToday = orders.filter(order => moment(order.datePlaced).isSame(moment(), 'day')).length;
    const totalOrdersThisMonth = orders.filter(order => moment(order.datePlaced).isSame(moment(), 'month')).length;
    const totalFoodItemsInStock = foodList.filter(item => item.foodItemStock > 0).length;
    const totalFoodItemsInMenu = foodList.length;

    const dataDaily = {
        labels: ['Total Sales Today (₹)'],
        datasets: [
            {
                label: 'Sales',
                data: [totalSalesAmountToday],
                backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const dataMonthly = {
        labels: ['Total Sales Monthly (₹)'],
        datasets: [
            {
                label: 'Sales',
                data: [totalSalesAmountThisMonth],
                backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 99, 71, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Function to generate a color for cards
    const generateCardVariant = (index) => {
        const variants = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark'];
        return variants[index % variants.length];
    };

    const reportItems = [
        { title: 'Total Orders Today', value: totalOrdersToday },
        { title: 'Total Orders This Month', value: totalOrdersThisMonth },
        { title: 'Total Number of Orders Till Now', value: totalNumberOfOrdersTillNow },
        { title: 'Total Sales Amount Today', value: `₹${totalSalesAmountToday.toFixed(2)}` },
        { title: 'Total Sales Amount This Month', value: `₹${totalSalesAmountThisMonth.toFixed(2)}` },
        { title: 'Total Sales Amount Till Now', value: `₹${totalSalesAmountTillNow.toFixed(2)}` },
        { title: 'Total Food Items In Menu', value: totalFoodItemsInMenu },
        { title: 'Total Food Items In Stock', value: totalFoodItemsInStock },

    ];

    return (
        <Container fluid className="m-5 p-2 shadow">
        <Row className="g-4">
            <Col lg={6} md={12}>
                <Card className="mb-4">
                    <Card.Body>
                        <h3><i className="fa-solid fa-calendar-day"></i> Daily Sales</h3>
                        <Bar data={dataDaily} options={options} />
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <h3><i className="fa-solid fa-calendar-alt"></i> Monthly Sales</h3>
                        <Bar data={dataMonthly} options={options} />
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={6} md={12}>
                {reportItems.map((item, index) => (
                    <Card style={{ width: '100%' }} bg={generateCardVariant(index).toLowerCase()} text={generateCardVariant(index).toLowerCase() === 'light' ? 'dark' : 'white'} className="mb-3" key={index}>
                        <Card.Header><i className={`fa-solid ${iconClassForItemTitle(item.title)}`}></i> {item.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>{item.value}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Col>
        </Row>
    </Container>
);
};

// Helper function to select the appropriate FontAwesome class based on the item title
const iconClassForItemTitle = (title) => {
switch (title) {
    case 'Total Orders Today':
    case 'Total Orders This Month':
        return 'fa-receipt';
    case 'Total Sales Amount Today':
    case 'Total Sales Amount This Month':
    case 'Total Sales Amount Till Now':
        return 'fa-dollar-sign';
    case 'Total Food Items In Menu':
        return 'fa-utensils';
    case 'Total Food Items In Stock':
        return 'fa-cubes';
    default:
        return 'fa-calendar-day'; // Default icon class
}
};

export default Reports;