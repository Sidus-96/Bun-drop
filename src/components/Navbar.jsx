
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../media_components/logo color.png'; 
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 

function Navbar_root({ handleShow, totalQuantity, UserDetails, updateUserStatus, favoriteProducts}) {

  return (
   
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark" style={{ borderBottom: '3px solid #202020'}}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img 
            src={logo}
            className="App-logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto align-items-center">
          <Link to="/">
                  <Button className="btn btn-secondary me-1">
                   Hem
                    </Button>
                    </Link>
         
           <Link to="/meny">
                  <Button className="btn btn-secondary me-1">
                   Meny
                    </Button>
                    </Link>
          </Nav>
          <div className="d-flex align-items-center">
            {UserDetails.user.bool ? (
                   <Link to="/">
                   <Button onClick={() => updateUserStatus(false)} className="btn btn-secondary me-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                     <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
         </svg> <span className="d-none d-md-inline">Logga ut</span>
                     </Button >
                     </Link>
                ) : (
                  <Link to="/login">
                  <Button className="btn btn-secondary me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg> <span className="d-none d-md-inline">Logga in</span>
                    </Button>
                    </Link>
                )}
          {UserDetails.user.bool && (
                 <Link to="/favorites">
                   <Button className="btn btn-secondary me-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
</svg> <span className="d-none d-md-inline">Favoriter</span>{favoriteProducts.products.length > 0 &&
 <span> ({favoriteProducts.products.length})</span>}
                     </Button>
                     </Link>
                )}
          <Button onClick={handleShow} className="btn btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
          <span className="d-none d-md-inline">Varukorg</span>{totalQuantity > 0 &&
 <span> ({totalQuantity})</span>}
</Button> 

          </div>
        </Container>
      </Navbar>
 
    </>
  );
}

export default Navbar_root;