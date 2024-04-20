import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

function Header2() {
  return (
    <>
      <Navbar className='headerClass' bg="light" expand="lg" data-bs-theme="dark">
        <Container className='headerContainer'>
          <Navbar.Brand href="#home"><i class="fa-solid fa-utensils mx-1"></i>RunYourResto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-primary-subtle' />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link href="/"><i class="fa-solid fa-house"></i>Home</Nav.Link>
              <Nav.Link href="/register"><i class="fa-regular fa-user"></i>Register</Nav.Link>
              <Nav.Link href="/login"><i class="fa-solid fa-user"></i>Login</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header2