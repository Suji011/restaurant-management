import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { editFoodItemAPI } from '../../services/allApiFile';
import { updateFoodListResponseContext } from '../../context/ContextShare';
import { BASE_URL } from '../../services/baseurl';



function EditFoodItem({ item, onClose }) {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState('');
  const { updateFoodListResponse, setupdateFoodListResponse } = useContext(updateFoodListResponseContext);
  const [foodItem, setFoodItem] = useState({
    foodItemNumber: item.foodItemNumber || "",
    foodItemName: item.foodItemName || "",
    foodItemPrice: item.foodItemPrice || "",
    foodItemStock: item.foodItemStock || "",
    foodImage: item.foodImage || ""
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (foodItem.foodImage && typeof foodItem.foodImage === 'object') {
      setPreview(URL.createObjectURL(foodItem.foodImage));
    }
  }, [foodItem.foodImage]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    if (typeof onClose === "function") {
      onClose();
    }
    setPreview("");
  };

  const handleEditFoodItem = async () => {
    const { foodItemNumber, foodItemName, foodItemPrice, foodItemStock, foodImage } = foodItem;
    if (!foodItemNumber || !foodItemName || !foodItemPrice || !foodItemStock) {
      alert("All fields are required.");
      return;
    }
    else {

      const reqBody = new FormData();
      reqBody.append("foodItemNumber", foodItemNumber);
      reqBody.append("foodItemName", foodItemName);
      reqBody.append("foodItemPrice", foodItemPrice);
      reqBody.append("foodItemStock", foodItemStock);
      preview ? reqBody.append("foodImage", foodImage) : reqBody.append("foodImage", item.foodImage)
      const token = sessionStorage.getItem("token");
      console.log(reqBody.FormData)
      if (preview) {
        console.log("inside preview")
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };

        const result = await editFoodItemAPI(item._id, reqBody, reqHeader);
        if (result.status === 200) {
          alert("Food item updated successfully.");
          setupdateFoodListResponse(result.data);
          handleClose();
        } else {
          console.log(result);
          // alert(result.data);
        }

      } else {
        console.log("not inside preview")
        const reqHeader = {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editFoodItemAPI(item._id, reqBody, reqHeader);
        if (result.status === 200) {
          alert("Food item updated successfully.");
          setupdateFoodListResponse(result.data);
          handleClose();
          console.log(result);
          
        }



      }
    }



  };

  return (
    <>
    
      <Button  style={{backgroundColor: '', border: 'none', color: 'white', padding: '5px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', margin: '2px', cursor: 'pointer', borderRadius: '5px'}} variant="warning" onClick={handleShow}>Edit <i className="fa-solid fa-pen-to-square"></i></Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <label>
                <input type="file" style={{ display: "none" }} onChange={e => setFoodItem({ ...foodItem, foodImage: e.target.files[0] })} />
                <img src={preview ? preview : `${BASE_URL}/uploads/${item.foodImage}`} alt="" width={"200px"} />

              </label>

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Food Item Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter food item number"
                value={foodItem.foodItemNumber}
                onChange={(e) => alert("Sorry,You can't edit Food Item Number")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Food Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter food item name"
                value={foodItem.foodItemName}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemName: e.target.value })}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={foodItem.foodItemPrice}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemPrice: e.target.value })}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock quantity"
                value={foodItem.foodItemStock}
                onChange={(e) => setFoodItem({ ...foodItem, foodItemStock: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleEditFoodItem}>Update Food Item</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditFoodItem;
