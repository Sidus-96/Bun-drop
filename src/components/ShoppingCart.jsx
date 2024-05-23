import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image } from 'react-bootstrap';

{/*
Offcanvas exempel
 https://react-bootstrap.netlify.app/docs/components/offcanvas/*/}

function ShoppingCart({ show, handleClose,cartProducts,updateQuantity, removeFromCart }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ backgroundColor: '#212529' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ color: '#E1E9F1' }}>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ color: '#E1E9F1' }}>
      {cartProducts.map((product, index) => (
        
          <div style={{ marginBottom: '15px', border:"2px solid black" }}>
            
            <Image src={product.image} roundedCircle height="50" width="50" style={{ marginRight: '10px' }}  />
            {product.title} - {(product.price * product.quantity).toFixed(2)} $
<svg style={{ marginLeft: '10px', cursor: 'pointer'}} onClick={() => {removeFromCart(product)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
            <div style={{marginTop: '10px' }}>
            <button style={{marginRight: '5px' }} onClick={() => updateQuantity(index, 'decreaseQ')}>-</button>
          <span>{product.quantity + " st"}</span>
          <button style={{marginLeft: '5px' }}  onClick={() => updateQuantity(index, 'increaseQ')}>+</button >
            </div>
            </div>
        ))}

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;