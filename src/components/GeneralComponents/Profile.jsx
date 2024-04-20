import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Button } from 'react-bootstrap';
import { getAUserAPI } from '../../services/allApiFile';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null);
  const fetchUserProfile = async () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userID = decodedToken.userId;
        const response = await getAUserAPI(userID)
        setProfile(response.data)
        console.log(token)
      } catch (error) {
        console.error('Error :', error);

      }
    }





  }

  useEffect(() => {
    fetchUserProfile()
  }, [])
  if (!profile) {
    return <div>Loading...</div>;
  }
  console.log(profile)

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <>
      <Navbar bg="light" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">RunYourResto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-primary' />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link onClick={handleBackClick}><i class="fa-solid fa-arrow-left"></i> Go Back</Nav.Link>


            </Nav>
            <Nav.Link href="/login"> <Button className='btn btn-danger' onClick={handleLogout}>Logout</Button> </Nav.Link>

          </Navbar.Collapse>


        </Container>
      </Navbar>
      <Container className="mt-5 align-items-center">

        <Row>
          <Col className="d-flex justify-content-center align-items-center">
          </Col>
          <Col></Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card style={{ borderColor: '#007bff', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)' }}>
              <Card.Header style={{ backgroundColor: '#007bff', color: '#ffffff' }}>
                User Profile
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ color: '#007bff' }}>{profile.name}</Card.Title>
                <Card.Text><strong>Email:</strong> {profile.email}</Card.Text>
                <Card.Text><strong>Role:</strong> {profile.role}</Card.Text>
                <Card.Text><strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Profile