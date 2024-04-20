import React, { useState } from 'react';
import { registerAPI } from '../../services/allApiFile';
import { Button, Form, Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header2 from '../GeneralComponents/Header2';
import ParallaxBanner1 from './ParallaxBanner1';

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { name, email, password, role };
    console.log("user", user)
    if (!email || !password || !name) {
      alert("please fill the missing fields")
    } else {

      const result = await registerAPI(user);
      console.log('Registration successful', result);
      if (result.status === 200) {
        console.log(result);
        alert(`user  registered successfully`)

        navigate('/login')
      } else {
        alert(result.response.data)
        console.log(result);
      }
    }
  };

  return (
    <>
    <Header2 />
      <Container fluid="md" className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
            
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/task-registration-2081679-1756042.png" alt="" className=' img-fluid w-100 rounded-lg'/>
          </Col>
          <Col lg={6} md={12}>
            
            <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">Register</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Label>Position</Form.Label>
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="">Select a position</option>
                      <option value="admin">Admin</option>
                      <option value="billing">Billing</option>
                      <option value="kitchen">Kitchen</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                  <Link className='mt-3' to='/login'> <br />
                    Already a User? Login Now</Link>
                </Form>
              </Card.Body>
            </Card>
            </Col>
          </Col>
        </Row>
      </Container>
      
      
    </>
  );
};

export default Register;
