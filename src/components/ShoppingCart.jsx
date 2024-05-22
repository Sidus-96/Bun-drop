import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

{/*
Offcanvas exempel
 https://react-bootstrap.netlify.app/docs/components/offcanvas/*/}

function ShoppingCart({ show, handleClose, cartProducts }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ backgroundColor: '#212529' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: '#E1E9F1' }}>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ color: '#E1E9F1' }}>
      {cartProducts.map((product) => (
          <div style={{ marginBottom: '15px', border:"2px solid black" }}>
            <Image src={product.image} roundedCircle height="50" width="50" style={{ marginRight: '10px' }}  />
            {product.title} - ${product.price}
            </div>
        ))}

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;