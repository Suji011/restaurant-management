import React, { useState } from 'react';
import { loginAPI } from '../../services/allApiFile';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Header2 from '../GeneralComponents/Header2';
import { Parallax } from 'react-scroll-parallax';
import ParallaxBanner1 from './ParallaxBanner1';
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { email, password };

    if (!email || !password) {
      alert("Please fill in all fields.");
    } else {
      const result = await loginAPI(credentials);
      console.log('Login successful', result);

      if (result.status === 200) {
        console.log(result.data);
        sessionStorage.setItem('token', result.data.token);
        navigate('/redirect');
        alert(`${email} logged in successfully`);
      } else {
        alert(result.response.data);
        console.log(result.response.data);
      }
    }
  };

  const getDummyLogin=(value)=>
  {
    if(value=="admin")
    {
    setEmail("admin@gmail.com")
    setPassword("123")
    }
    else if(value=="billing")
    {
    setEmail("bill@123")
    setPassword("bill@123")
    }
    else if(value=="kitchen")
    {
      setEmail("123@kitchen")
      setPassword("123@kitchen")
    }
  }

  return (
    <>
      <Header2 />
      <Container fluid="md" className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col lg={6} md={12} className="mb-4 mb-lg-0">
        
            <img  src="https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg" className='img-fluid w-100 rounded-lg'/>
          </Col>
          <Col lg={6} md={12}>
            
            <Card>
              <Card.Body>
                <Card.Title className="mb-4">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                  <Link className='d-block mt-3' to='/register'>New User? Sign Up Now</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={4} className="m-2">
          
          
                
                <MDBContainer id="faq" className="mt-5" style={{ maxWidth: '1000px' }}>
        <MDBAccordion alwaysOpen >
          <MDBAccordionItem collapseId={1} headerTitle="Get Dummy Credentials For Demo">
            <p>
            <Button className='my-1' onClick={()=>getDummyLogin("admin")}>Admin Login</Button>
                <br />
                <Button className='my-1'onClick={()=>getDummyLogin("billing")}>Billing Login</Button>
                <br />
                <Button className='my-1'onClick={()=>getDummyLogin("kitchen")}>Kitchen Login</Button>
            </p>
          </MDBAccordionItem>
          
        </MDBAccordion>
      </MDBContainer>
              
            
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
