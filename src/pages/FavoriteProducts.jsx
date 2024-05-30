import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function FavoriteProducts({favoriteProducts, addToCart, DeleteFromFavorites}){
    const [favoriteProductsUser, setFavoriteProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3005/menu")
          .then(res => res.json())
          .then(data  => {
            const filteredProducts =  data.filter(product => favoriteProducts.products.includes(product.id));
            setFavoriteProducts(filteredProducts);
          })
      }, [favoriteProducts]);
    
    return(

     <div className='d-flex justify-content-center' style={{ height: '100vh'}} >
       <div className='container'>
        <h1 className='center'>Se dina favoriter!</h1>
           <div className='row '>
        {favoriteProductsUser.map(product => (
         <div className='col-md-6 mb-3 mt-5' key={product.id}> 
<Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={product.image} style={{height:"15rem"}} />
      <Card.Body style={{ backgroundColor: '#6C757D', color: '#fff'   }}>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}
        </Card.Text>
        <div className='d-flex'>
          <div className='me-5'>
          <Button className='btn btn-success' onClick={() => addToCart(product)}>Lägg i varukorg</Button>
          </div>
          <div>
          <Button className='btn btn-danger' onClick={() => DeleteFromFavorites(product)}>Ta bort favorit</Button>

          </div>
        </div>
      </Card.Body>
    </Card>
          </div>
        ))}
     </div>
     </div>
     </div>
     
    );
}

export default FavoriteProducts