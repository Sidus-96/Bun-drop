import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom'

function Register( ){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3005/users')
          .then((response) => response.json())
          .then((data) => {
            const user = data.find((user) => user.username === username);
            if (!user) {
                const newUser = {username: username , password: password };
   
    const postOptions = { 
        method: "POST", 
      headers:{"Content-type": "application/json"},
body: JSON.stringify(newUser),
};

fetch("http://localhost:3005/users", postOptions);

navigate('/Login');
                
            } 
            else {

           
            }
          })
         
      };

    return(

   <div className="text-center mt-4" style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
    
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
      <Button type="submit" className='mt-4'>Registrera nytt konto</Button>
    </Form> 
    </div>
</div>
     
    );
}

export default Register