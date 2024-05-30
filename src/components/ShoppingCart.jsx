import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
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
            {product.title} - {(product.price * product.quantity).toFixed(2)} kr
<svg style={{ marginLeft: '10px', cursor: 'pointer'}} onClick={() => {removeFromCart(product)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
            <div className='mt-2 mb-2 ms-2'>
            <svg style={{cursor: 'pointer'}} onClick={() => updateQuantity(index, 'decreaseQ')} xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="currentColor" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1"/>
</svg>
          <span> {product.quantity + " st"} </span> 
          <svg  style={{cursor: 'pointer'}} onClick={() => updateQuantity(index, 'increaseQ')} xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
</svg>
            </div>
            </div>
        ))}


{cartProducts.length > 0 ? (
                      <div className="text-center">
                      <Link to="/Kassa">
                <Button onClick={handleClose} className="btn-success">Till kassan</Button>
              </Link>
                      </div>
                ) : (
                  <div className="text-center">
                   <p>
                    Oj oj oj! Här var det tomt med mat! <br/>Kika gärna på vår utsökta meny och hitta dagens måltid! 
                   </p>
                      </div>
                 
                )}

    
 
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;