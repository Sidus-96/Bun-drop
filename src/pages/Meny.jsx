import React, { useState, useEffect  } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Image } from 'react-bootstrap';

function Meny(){
    const [products, setProducts] = useState([]);
    const filter=[];
    useEffect(() => {
      fetch("http://localhost:3005/menu")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }, []);
   
    return(
        <div>
   
   <div className="container">
   <h1 className='text-center mb-5'>Meny</h1>
  <div className="row justify-content-center">

    {products.map((product) => (
      <div key={product.id} className="col-12 col-md-6 col-lg-4 p-2">
        <div className="product-item text-center">
          <Image src={product.image} roundedCircle height="200" width="200" />
          <div>
            <h5>{product.title}</h5>
            <p>${product.price}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
   <h1>Menyssssss</h1>
   <h1>Meny</h1>

    </div>
    );
}

export default Meny
