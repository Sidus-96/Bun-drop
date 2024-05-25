import React, { useState, useEffect  } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap';

function Kassa( { cartProducts,updateQuantity, removeFromCart } ){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
      const totalSum = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
      setTotalPrice(totalSum);
    }, [cartProducts]);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3005/users')
          .then((response) => response.json())
          .then((data) => {
            const user = data.find((user) => user.username === username && user.password === password);
            if (user) {
               
            } 
            else {
            
            }
          })
         
      };


   

    return(

   <div className="mt-5" style={{ height: 'auto', display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
          {/* Varukorg*/}
          <div style={{textAlign: 'left' }}>
         <div>
  {cartProducts.map((product, index) => (
    
        
        <div key={product.id} style={{ marginBottom: '10px', border:"2px solid black" }} >
            
          <Image src={product.image} roundedCircle height="50" width="50" style={{ marginRight: '10px' }}  />
          {product.title} - {(product.price * product.quantity).toFixed(2)} kr
<svg style={{ marginLeft: '10px', cursor: 'pointer'}} onClick={() => {removeFromCart(product)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
          <div style={{marginTop: '5px' }}>
          <button style={{marginRight: '5px' }} onClick={() => updateQuantity(index, 'decreaseQ')}>-</button>
        <span>{product.quantity + " st"}</span>
        <button style={{marginLeft: '5px' }}  onClick={() => updateQuantity(index, 'increaseQ')}>+</button >
          </div>
          </div>
          
          
      ))}

    {/* Varukorg*/}
    </div>
    <div className="mt-3 mb-4">
      <h5>Total (inkl. moms): {totalPrice.toFixed(2)} kr</h5>
    </div>
  <div>
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Personuppgifter</Form.Label>
        <Form.Control type="text" placeholder="För- och efternamn" onChange={(e) => setUsername(e.target.value)}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="adress" onChange={(e) => setPassword(e.target.value)} />
        <Form.Label>Postnummer</Form.Label>
        <Form.Control type="number" placeholder="xxx xx" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Slutför köp
      </Button>
    </Form>
   
    
  </div>
</div>
</div>
     
    );
}

export default Kassa