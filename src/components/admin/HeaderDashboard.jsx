import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

function HeaderDashboard() {
  const handleLogout = () => {
    sessionStorage.clear();

  };
  return (
    <div className='headerClass'> <Navbar bg="light" expand="lg" data-bs-theme="dark">
      <Container className='headerContainer'>
        <Navbar.Brand href=""><i class="fa-solid fa-utensils mx-1"></i> RunYourResto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-primary-subtle' />

        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/"><i class="fa-solid fa-house"></i>Home</Nav.Link>
            <Nav.Link href="/profile"><i class="fa-solid fa-user"></i>Profile</Nav.Link>

          </Nav>
          <Nav.Link href="/login"> <Button className='btn btn-danger' style={{color:'white'}} onClick={handleLogout}>Logout</Button> </Nav.Link>

        </Navbar.Collapse>
      </Container>
    </Navbar></div>
  )
}

export default HeaderDashboard