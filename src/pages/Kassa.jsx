import React, { useState, useEffect  } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import swishLogo from '../media_components/swish_logo.svg'
import { PO_URL } from '../constants';

function Kassa( { cartProducts,updateQuantity, removeFromCart, UserDetails, clearCart } ){
  const navigate = useNavigate();

  const [PersonDetails, setPersonDetails] = useState({
    email: { value: '', error: '' },
    name: { value: '', error: '' },
    address: { value: '', error: '' },
    zipCode: { value: '', error: '' },
    city: { value: '', error: '' },
  });
  const [showAlert, setShowAlert] = useState(false);
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

    const [swishDetails, setSwishDetails] = useState({
      number:{value: '', error: ''}});
   
    useEffect(() => {
      const totalSum = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
      setTotalPrice(totalSum);
      if(totalSum ===0)
        {
          navigate("/");
        }
    }, [cartProducts]);

        //Om kund väljer att betala med kort så öppnas kortfältet upp och resetrar swishuppgifterna

    const ButtonClickCardForm = () => {
      setShowSwishForm(false);
      setShowCardForm(!showCardForm);
      setSwishDetails({number:{value: '', error: ''}});
    };

    //Om kund väljer att betala med swish så öppnas swishfältet upp och resetrar kortuppgifterna
    const ButtonClickSwishForm = () => {
      setShowCardForm(false);
      setShowSwishForm(true);
    setCardDetails({
      name:{ value: '', error:''},
      cardNmber:{ value: '', error: ''},
      month:{ value: '', error: ''},
      year:{value: '', error: ''},
      cvc:{value: '', error: ''}
    }); 
    };

   //Kunna hantera flera fält
   
     //hantera när kunden skriver in sina uppgifter.
   const handlePersonDetailsFormChange = (e) => {
    setShowAlert(false);
    const { name, value } = e.target;
    let error="";

    //validity.valid är webbläsarens egna inbyggda sätt att validera mejladress
    if(e.target.name === "email")
      {
        if(!e.target.validity.valid)
          {
            error="Skriv in giltlig e-post adress"
          }
          else{
            error="";
          }

      }
   
    else if(e.target.name === "name")
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
//hantera när man skriver in sina kortuppgifter
  const handleCardDetailsFormChange = (e) => {
    setShowAlert(false);
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
  
//hantera när man skriver in sitt nummer i swishfältet
  const handleSwishDetailsFormChange = (e) => {
    setShowAlert(false);
    const { name, value } = e.target;
    let error = "";

    if (name === "number") {
      if (isNaN(value)) 
         {
        error = "Telefonnumret måste vara i siffror";
      }
       else if (value.length < 10) {
        error = "Telefonnumret är minst 10 siffror";
      } 
      else
       {
        error = "";
      }
    }

    setSwishDetails((prevDetails) => ({
      ...prevDetails,
      [name]: { value, error }
    }));
  };

  const validateFields = () => {
    let validatedForms= false;
    const boolPersonDetailsError = Object.keys(PersonDetails).some((key) => PersonDetails[key].error !== '');
    const boolPersonDetailsErrorEmpty = Object.keys(PersonDetails).some((key) => PersonDetails[key].value === '');
    let boolValidatePayment=false;
  
    


    if (showCardForm)
      {
        const boolCardDetailsIsEmpty = Object.keys(CardDetails).some((key) => CardDetails[key].value=== '');
        const boolCardDetailsErrors = Object.keys(CardDetails).some((key) => CardDetails[key].error !== '');
        if(!boolCardDetailsIsEmpty && !boolCardDetailsErrors)
          {
            
            boolValidatePayment=true;
          }
          

      }
      else if(showSwishForm)
        {
          const boolSwishDetailsIsEmpty = Object.keys(swishDetails).some((key) => swishDetails[key].value === '');
          const boolSwishDetailsIsError = Object.keys(swishDetails).some((key) => swishDetails[key].error !== '');
         
          if(!boolSwishDetailsIsEmpty && !boolSwishDetailsIsError)
            {
              
              boolValidatePayment=true;
            }
        }


        if( !boolPersonDetailsError && !boolPersonDetailsErrorEmpty && boolValidatePayment)
          {
           
            
            validatedForms =true;
          }
          
          return validatedForms;



  }


  const handleSubmit = (event) => {
    event.preventDefault();
    // När man har klickat på submit så ska alla fälten valideras en sista gång
    let validated = validateFields();
 

  if(validated)
    {
      let payMethod ='';
      if (showCardForm)
        {
          payMethod ='Debit Card';
        }
        else if(showSwishForm)
          {
            payMethod='swish';
          }
        
          if( UserDetails.user.bool === false)
            {
              UserDetails.user.username = 'Guest'
            }
          
          //skapa upp orderobjektet
        const Order = {
          userId:UserDetails.user.userid,
          username: UserDetails.user.username,
          
          paymentMethod:payMethod,
          customerDetails: {
            emailaddress:PersonDetails.email.value,
            customerName:PersonDetails.name.value,
            deliveryAddress:PersonDetails.address.value,
            zipCode:PersonDetails.zipCode.value,
            city:PersonDetails.city.value,
          },
          articles: cartProducts.map(product => ({
            id: product.id,
            title: product.title,
            quantity: product.quantity,
            price: product.price
          }))
        };
      const postOptions ={
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(Order),
    };
        fetch(PO_URL,postOptions)
          .then(response => response.json())
          .then(data => {
            //rensa hela kundkorgen när ordern är lagd
            clearCart();

            navigate("/confirmation", { state: {data}});

          })
    }
    else{
      setShowAlert(true);
    }
  };
      
    return(

   <div className="mt-5" style={{ height: 'auto', display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
          {/* Varukorg*/}
          <h1 className='center mb-3'>Kassan</h1>
          <div style={{textAlign: 'left' }}>
          
         <div>
  {cartProducts.map((product, index) => (
    
        
        <div key={product.id} style={{ marginBottom: '10px', border:"2px solid black" }} >
            
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

    {/* Varukorg*/}
    </div>
    <div className="mt-3 mb-4">
      <h5>Totalt (inkl. moms): {totalPrice.toFixed(2)} kr</h5>
    </div>
  <div>
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>E-postadress</Form.Label>
        <Form.Control type="email" placeholder="Mejl" name="email" value={PersonDetails.email.value} onChange={handlePersonDetailsFormChange} required />
        <p>{PersonDetails.email.error}</p>
        <Form.Label>Namn</Form.Label>
        <Form.Control type="text" placeholder="För- och efternamn" name="name" value={PersonDetails.name.value} onChange={handlePersonDetailsFormChange} />
        <p>{PersonDetails.name.error}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Adress</Form.Label>
        <Form.Control type="text" placeholder="Adress" name="address" value={PersonDetails.address.value} onChange={handlePersonDetailsFormChange} />
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
                style={{ width: '200px', marginRight: '10px' }} maxLength="10" type="text" placeholder="070xxxxxxx" name="number" value={swishDetails.number.value} onChange={handleSwishDetailsFormChange}/>
            </div>
          </div>
          <p>{swishDetails.number.error}</p>
        </div>
      )}



</div>
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Slutför köp
      </Button>
    </Form>
    {showAlert && (
      <div>

    <Alert variant="danger" onClose={() => setShowAlert(false)} >
        <p>
          Alla fält är inte ifyllda
        </p>
      </Alert>
      </div>
    )}
    
  </div>
</div>
</div>
     
    );
}

export default Kassa