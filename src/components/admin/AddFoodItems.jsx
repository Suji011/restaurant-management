import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { deleteFoodItemAPI, addFoodItemAPI, getFoodListAPI } from '../../services/allApiFile';
import EditFoodItem from './EditFoodItem';
import { BASE_URL } from '../../services/baseurl';
import { updateFoodListResponseContext } from '../../context/ContextShare';

function AddFoodItems() {
  const [show, setShow] = useState(false);
  const [foodList, setFoodList] = useState([])
  const { updateFoodListResponse, setupdateFoodListResponse } = useContext(updateFoodListResponseContext)
  const handleShow = () => setShow(true);
  const [foodItem, setFoodItem] = useState({
    foodItemNumber: "",
    foodItemName: "", foodItemPrice: "", foodItemStock: "", foodImage: ""
  })
  const [token, setToken] = useState()
  const [preview, setPreview] = useState("")
  useEffect(() => {

    if (foodItem.foodImage) {
      setPreview(URL.createObjectURL(foodItem.foodImage))
    }
  }, [foodItem.foodImage])
  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    console.log("=== Adding Food Item ===");
    const { foodItemNumber, foodItemName, foodItemPrice, foodItemStock, foodImage } = foodItem;

    if (!foodItemName || !foodItemNumber || !foodItemPrice || !foodItemStock || !foodImage) {
      alert("Please fill all fields and select an image");
    } else {
      const reqBody = new FormData();
      reqBody.append('foodItemNumber', foodItemNumber);
      reqBody.append('foodItemName', foodItemName);
      reqBody.append('foodItemPrice', foodItemPrice);
      reqBody.append('foodItemStock', foodItemStock);
      reqBody.append('foodImage', foodImage)

      setToken(sessionStorage.getItem('token'))
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await addFoodItemAPI(reqBody, reqHeader);

        if (result.status === 200) {
          alert("Food item added successfully");
          setFoodItem({ foodItemNumber, foodItemName, foodItemPrice, foodItemStock })
          handleClose();
        } else {
          // alert("Failed to add the food item");
        }
      } catch (error) {
        alert(`Error: ${error.response ? error.response.data : error.message}`);
      }
    }

    console.log(foodItem);
  };
  const getFoodListfn = async () => {
    const result = await getFoodListAPI()
    console.log(result.data)
    setFoodList(result.data)
  }
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteFoodItemAPI(id, reqHeader)
    if (result.status === 200) {
      alert("Food Item deleted successfully");
      getFoodListfn();
    } else {
      alert(result.response.data)
    }

  }

  useEffect(() => {
    getFoodListfn()

  }, [foodItem, updateFoodListResponse])

  const handleClose = () => {
    setShow(false)

    setFoodItem({
      foodItemNumber: "",
      foodItemName: "", foodItemPrice: "", foodItemStock: "", foodImage: ""
    })

    setPreview("")

  }
  const totalFoodItemsInStock = foodList.filter(item => item.foodItemStock > 0).length;
  const totalFoodItemsInMenu = foodList.length;
  return (
    <Container fluid className="pt-3">
      <Row>
        <Col xs={12} sm={6} lg={4} className="mb-2">
          <Card style={{height:'105px'}} bg='primary' text='light' onClick={handleShow}>
            <Card.Body>
              <Card.Title>
                <i className="fa-solid fa-plus"></i> Add Food Item
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4} className="mb-2">
          <Card bg='success-subtle'>
            <Card.Body>
              <Card.Title>Total Food Items</Card.Title>
              <Card.Text>{totalFoodItemsInMenu}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4} className="mb-4">
          <Card bg='success-subtle'>
            <Card.Body>
              <Card.Title>Total Food Items In Stock</Card.Title>
              <Card.Text>{totalFoodItemsInStock}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <Form.Group className="mb-3">
              <label>
                <input type="file" style={{ display: "none" }} onChange={e => setFoodItem({ ...foodItem, foodImage: e.target.files[0] })} />
                <img width={"300px"} src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg"} alt="food item img" />
              </label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Food Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter food item name"
                name="foodItemName"
                value={foodItem.foodItemName}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Food Item Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter food item number"
                name="foodItemNumber"
                value={foodItem.foodItemNumber}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="foodItemPrice"
                value={foodItem.foodItemPrice}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemPrice: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                name="foodItemStock"
                value={foodItem.foodItemStock}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemStock: e.target.value })}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddFoodItem}>Add Food Item</Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead className='bg-warning-subtle'>
              <tr>
                <th>#</th>
                <th>Food Item Image</th>
                <th>Food Item Code</th>
                <th>Food Item Name</th>
                <th>Food Item Price</th>
                <th>Available Stock</th>
                <th colSpan={2} className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodList && foodList.length > 0 ? (
                foodList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.foodImage ? (<img style={{ height: '100px' }} src={item ? `${BASE_URL}/uploads/${item?.foodImage}` : null} alt="modalimg" className="img-fluid" />) : <img style={{ height: '100px' }} src="https://static.vecteezy.com/system/resources/previews/003/170/825/original/isolated-food-plate-fork-and-spoon-design-free-vector.jpg" alt="default" />}</td>
                    <td>{item.foodItemNumber}</td>
                    <td>{item.foodItemName}</td>
                    <td>{item.foodItemPrice}</td>
                    <td>{item.foodItemStock}</td>
                    <td> <EditFoodItem item={item}/></td>
                    <td><Button variant='danger' onClick={() => handleDelete(item._id)}>Delete<i className="fa-solid fa-trash"></i></Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No food items found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AddFoodItems;