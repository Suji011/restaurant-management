import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MDBBtn } from 'mdb-react-ui-kit';

function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <header className='headerClass'>
      <Navbar bg="light" expand="lg" data-bs-theme="dark">
        <Container className='headerContainer'>
          <Navbar.Brand className='title' href="#home"><i class="fa-solid fa-utensils mx-1"></i>RunYourResto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-primary-subtle' />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link href="/register"><i class="fa-regular fa-user"></i>Register</Nav.Link>
              <Nav.Link href="/login"><i class="fa-solid fa-user"></i>Login</Nav.Link>
              <Nav.Link href="#about"><i class="fa-regular fa-address-card"></i>About Us</Nav.Link>
              <Nav.Link href="#contact"><i class="fa-solid fa-address-book"></i>Contact Us</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('./hbb.jpg')", height: '400px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.09)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3 simplify' >Simplify Restaurant Management</h1>
              <h4 className='mb-3 simplify' >One System, Total Control</h4>
              <MDBBtn className='btnGetStarted' style={{textShadow:'1px 1px black'}} tag="a"  size="lg" href='/register'>
                Get Started
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
