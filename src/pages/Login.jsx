import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

function Login( {setUserStatus} ){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3005/users')
          .then((response) => response.json())
          .then((data) => {
            const user = data.find((user) => user.username === username && user.password === password);
            if (user) {
                setUserStatus(true);
            } 
            else {
              setUserStatus(false);
            }
          })
         
      };

    return(

   <div className="text-center mt-5" style={{ height: 'auto', display: 'flex', justifyContent: 'center' }}>
  <div>
  <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Användarkonto</Form.Label>
        <Form.Control type="text" placeholder="Skriv in användarnamnet" onChange={(e) => setUsername(e.target.value)}/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Lössenord" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Link to="/">
      <Button variant="primary" type="submit">
        Logga in
      </Button>
      </Link>
    </Form>
    <Link to="/Register">
    <Button className='mt-4'>Skapa konto</Button>
    </Link>
    
  </div>
</div>
     
    );
}

export default Login