import React, { useState, useEffect  } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Image } from 'react-bootstrap';
import swishLogo from '../media_components/swish_logo.svg'

function Kassa( { cartProducts,updateQuantity, removeFromCart } ){

  const [PersonDetails, setPersonDetails] = useState({
    name: { value: '', error: '' },
    address: { value: '', error: '' },
    zipCode: { value: '', error: '' },
    city: { value: '', error: '' },
  });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCardForm, setShowCardForm] = useState(false);
    const [showSwishForm, setShowSwishForm] = useState(false);
    const [CardDetails, setCardDetails] = useState({
      name:{ value: '', error:''},
      cardNmber:{ value: '', error: ''},
      month:{ value: '', error: ''},
      year:{value: '', error: ''},
      cvc:{value: '', error: ''}
    });

    const [swishDetails, setSwishDetails] = useState({number:{value:'', error:''}});
   
    useEffect(() => {
      const totalSum = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
      setTotalPrice(totalSum);
    }, [cartProducts]);

    const ButtonClickCardForm = () => {
      setShowSwishForm(false);
      setShowCardForm(!showCardForm);
      setSwishDetails('');
    };

    const ButtonClickSwishForm = () => {
      setShowCardForm(false);
      setShowSwishForm(true);
    //  setCardDetails({ name:'', cardNumber:'', month:'', year:'', cvv:'' }); 
    };

   //Kunna hantera flera fält
   
   const handlePersonDetailsFormChange = (e) => {
    const { name, value } = e.target;
    let error="";

   
    if(e.target.name === "name")
      {
        if(value.length <2)
          {
            error=("Namn måste vara längre än 2 bokstäver")
          }
          else{
            error="";
          }
      }
      else if(e.target.name === "address")
        {
          if(value.length <2)
            {
              error=("Namn måste vara längre än 2 bokstäver")
            }
            else{
              error="";
            }
        }
        else if(e.target.name === "address")
          {
            if(value.length <2)
              {
                error=("Adress måste vara längre än 2 bokstäver")
              }
              else{
                error="";
              }
          }
          else if(e.target.name === "zipCode")
            {
              if (isNaN(value)) {
                error = 'Postnummer måste vara ett nummer';
              }
              //else if på nedan då man får hantera första felet först.
              else if(value.trim().length <5)
                {
                  error=("Postnummer måste vara 5 siffror")
                }
                else{
                  error="";
                }
            }
            else if(e.target.name === "city")
              {
                if(value.length <3)
                  {
                    error=("Skriv in din stad")
                  }
                  else{
                    error="";
                  }
              }

     
  
    
    setPersonDetails((prevDetails) => ({
      ...prevDetails,
      [name]:  { value, error },
    }));
  };

  const handleCardDetailsFormChange = (e) => {
    const { name, value } = e.target;
    let error="";

    if(e.target.name === "name")
      {
        if(value.length <2)
          {
            error=("Namn måste vara längre än 2 bokstäver")
          }
          else{
            error="";
          }
      }
      else if(e.target.name === "cardNmber")
        {
          if (isNaN(value)) {
            error = 'Kortnummer måste vara siffror';
          }
          else if(value.length <16)
            {
              error=("Kortnummer är 16 siffror")
            }
            else{
              error="";
            }
        }

        if(e.target.name === "month")
          {
            if (isNaN(value)) {
              error = 'Månad behöver vara i siffror'
            }
            else if(value >12)
              {
                return;
              }

            else if(value.length <2)
              {
                error=("Format MM")
              }
              else{
                error="";
              }

          }
          if(e.target.name === "year")
            {
              if (isNaN(value)) {
                error = 'År behöver vara i siffror'
              }
              else if(value.length <2)
                {
                  error=("Format YY")
                }
                else{
                  error="";
                }
  
            }
            if(e.target.name === "cvc")
              {
                if (isNaN(value)) {
                  error = 'cvc behöver vara i siffror'
                }
                else if(value.length <2)
                  {
                    error=("Format xxx")
                  }
                  else{
                    error="";
                  }
    
              }


    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: {value,error}
    }));
  };


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
        <Form.Control type="text" placeholder="För- och efternamn" name="name" value={PersonDetails.name.value} onChange={handlePersonDetailsFormChange} />
        <p>{PersonDetails.name.error}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Adress</Form.Label>
        <Form.Control type="text" placeholder="adress" name="address" value={PersonDetails.address.value} onChange={handlePersonDetailsFormChange} />
     <p>{PersonDetails.address.error}</p>
        <div className="mt-3 d-flex">
          <div >
        <Form.Label>Postnummer</Form.Label>
        <Form.Control style={{ width: '100px', marginRight: "10px"}} type="text" maxLength="5" placeholder="xxx xx" name="zipCode" value={PersonDetails.zipCode.value} onChange={handlePersonDetailsFormChange}/>
        
        </div>
        
        <div >
        <Form.Label>Stad</Form.Label>
        <Form.Control style={{width: '130px'}} type="text" maxLength="12" placeholder="" name="city" value={PersonDetails.city.value} onChange={handlePersonDetailsFormChange} />
        
        </div>
        </div>
        <p >{PersonDetails.zipCode.error}</p>
        <p>{PersonDetails.city.error}</p>
        <div>
          <h4>Betalningsalternativ</h4>
          <svg onClick={ButtonClickCardForm} style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" width="60" height="50" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
  {showCardForm ? 'Hide' : 'Show'}
</svg>

{/* nedan är swish*/}
<Image onClick={ButtonClickSwishForm}  src={swishLogo} width="60" height="55" ></Image>
<div>
{showCardForm && (
  <div> 
   <div className="mt-3 d-flex">
   <div >
 <Form.Label>Namn</Form.Label>
 <Form.Control style={{width: '200px', marginRight: "10px"}} type="text" placeholder="" name="name" value={CardDetails.name.value} onChange={handleCardDetailsFormChange}  />
 </div>
 <div >
 <Form.Label>Kortnummer</Form.Label>
 <Form.Control  type="text" maxLength="16" placeholder="xxxxxxxxxxxxxxxx" name="cardNmber" value={CardDetails.cardNmber.value} onChange={handleCardDetailsFormChange}  />
 <p>{CardDetails.cardNmber.error}</p>
 </div>

 </div>
 <p>{CardDetails.name.error}</p>

 <div className="mt-3 mb-4 d-flex">
   <div >
 <Form.Label>Månad</Form.Label>
 <Form.Control style={{width: '55px', marginRight: "10px"}} type="text" maxLength="2" placeholder="MM" name="month" value={CardDetails.month.value} onChange={handleCardDetailsFormChange}  />
 </div>
 <div >
 <Form.Label>År</Form.Label>
 <Form.Control style={{width: '50px', marginRight: "10px"}} type="text" maxLength="2" placeholder="YY" name="year" value={CardDetails.year.value} onChange={handleCardDetailsFormChange} />
 </div>
 <div >
 <Form.Label>CVC</Form.Label>
 <Form.Control style={{width: '60px'}} type="text" maxLength="3" placeholder="" value={CardDetails.cvc.value} name="cvc" onChange={handleCardDetailsFormChange}/>
 </div>

 </div>
 <p>{CardDetails.month.error}</p>
 <p>{CardDetails.year.error}</p>
 <p>{CardDetails.cvc.error}</p>
 </div>
      )}
          {showSwishForm && (
        <div>
          <div className="mt-3 mb-4 d-flex">
            <div>
              <Form.Label>Telefon Nummer</Form.Label>
              <Form.Control
                style={{ width: '200px', marginRight: '10px' }} name="swishnummer" type="text" placeholder="" onChange = {setSwishDetails}/>
            </div>
          </div>
        </div>
      )}



</div>
        </div>
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