import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import { USERS_URL, User_Favorites_URL } from '../constants';

function Register( ){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [NewUserDetails, setNewUserDetails] = useState({
      name: { value: '', error: '' },
      password: { value: '', error: '' },
    });


    
    const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        let validated = validateFields();

        if(validated)
          {
       
                const newUser = {username: NewUserDetails.name.value , password: NewUserDetails.password.value };
   
    const postOptions = { 
        method: "POST", 
      headers:{"Content-type": "application/json"},
body: JSON.stringify(newUser),
};

fetch(USERS_URL, postOptions) .then(response => response.json())
.then(data => {
  //När vi har fått userid från data skapa upp en ny tom favorit produkter till användaren

  const newEmptyFavorite ={
    userid:data.id,
    favoriteArticles: []

  }
const postOptions = { 
        method: "POST", 
      headers:{"Content-type": "application/json"},
body: JSON.stringify(newEmptyFavorite),
};
fetch(User_Favorites_URL, postOptions)});
navigate('/Login');
}
else
{
  setShowAlert(true);
  return;
}
            } 
          
        
        
      const handleNewUserFormChange = (e) => {
        setShowAlert(false);
        const { name, value } = e.target;
        let error="";
        
        if(name === "name")
          {
            fetch(USERS_URL)
            .then((response) => response.json())
            .then((data) => {
              const user = data.find((user) => user.username === value);
             
              if (user) {
                 error="Användare finns redan";
                  //då koden returneras så satte jag setNewUSer även här
                 setNewUserDetails((prevDetails) => ({
                  ...prevDetails,
                  [name]:  { value, error },
                }));

              }});
          }
        if(name === "password")
          {
           
            
            if(value.length<8)
              {
                error="Lösenord måste ha minst 8 tecken";
              }
              else
              {
                error="";
              }
          }
    
                  setNewUserDetails((prevDetails) => ({
          ...prevDetails,
          [name]:  { value, error },
        }));
      };

      const validateFields = () => {
        let validatedForms= false;
        const boolIfNewUserFormValuesIsEmpty = Object.keys(NewUserDetails).some((key) => NewUserDetails[key].value=== '');
        const boolIfNewUserFormErrorsIsNotEmpty = Object.keys(NewUserDetails).some((key) => NewUserDetails[key].error !== '');
        
            if( !boolIfNewUserFormValuesIsEmpty && !boolIfNewUserFormErrorsIsNotEmpty)
              {
               
                
                validatedForms =true;
              }
              
              return validatedForms;
    
    

      }

    return(

   <div className="text-center mt-4" style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
    
  <div>
  <h1 className="mb-4">Skapa konto</h1>
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Användarkonto</Form.Label>
        <Form.Control type="text" placeholder="Skriv in användarnamnet" name="name" value={NewUserDetails.name.value} onChange={handleNewUserFormChange} />
        <p>{NewUserDetails.name.error}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lösenord</Form.Label>
        <Form.Control type="password" placeholder="Lösenord"name="password" value={NewUserDetails.password.value} onChange={handleNewUserFormChange} />
        <p>{NewUserDetails.password.error}</p>
     </Form.Group>
      <Button type="submit" className='mt-4'>Registrera nytt konto</Button>
    </Form> 
    {showAlert && (
      <div>

    <Alert variant="danger" onClose={() => setShowAlert(false)} >
        <p>
          Kontrollera fälten!
        </p>
      </Alert>
      </div>
    )}
    </div>
</div>
     
    );
}

export default Register