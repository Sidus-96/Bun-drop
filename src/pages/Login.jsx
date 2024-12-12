import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,Link  } from 'react-router-dom'
import { PO_URL,USERS_URL } from '../constants';

function Login( {updateUserStatus} ){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(USERS_URL)
          .then((response) => response.json())
          .then((data) => {
            const user = data.find((user) => user.username === username && user.password === password);
            if (user) {
                updateUserStatus(true,user.id,user.username);
                navigate('/');
            } 
            else {
              updateUserStatus(false,'','');
            }
          })
         
      };

    return(

   <div className="text-center mt-5" style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
    
  <div>
  <h1 className="mb-4">Logga in</h1>
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Användarkonto</Form.Label>
        <Form.Control type="text" placeholder="Skriv in användarnamnet" onChange={(e) => setUsername(e.target.value)}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lösenord</Form.Label>
        <Form.Control type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" >
        Logga in
      </Button>
   
    </Form>
    <Link to="/Register">
    <Button className='mt-4'>Skapa konto</Button>
    </Link>
    
  </div>
</div>
     
    );
}

export default Login