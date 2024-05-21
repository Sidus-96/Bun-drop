
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../media_components/logo color.png'; 
import { Link } from 'react-router-dom';


function Navbar_root() {
  return (
    <>

      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img 
            src={logo}
            height="60"
            className="App-logo"
            />
            
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
           <Nav.Link as={Link} to="/Meny">Meny</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
 
    </>
  );
}

export default Navbar_root;