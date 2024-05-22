import React, { useState, useEffect  } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Image } from 'react-bootstrap';

function Meny(){
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);


    const [activeFilters, setCheckedValues] = useState([]);
   {/* Ha koll på om en knapp är checked/aktiv eller inte  */}
    const CheckboxSelected = (event, category) => {
      const isChecked = event.target.checked;
  
      if (isChecked) 
        {
        setCheckedValues((a) => [...a, category]);
      }
       else if(isChecked==false)
        {
        setCheckedValues((a) =>
          a.filter((value) => value !== category));
      }
    };
    useEffect(() => {
      fetch("http://localhost:3005/menu")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
      fetch("http://localhost:3005/filters")
        .then((res) => res.json())
        .then((data) => setFilters(data));
    }, []);
   
    {/* https://react-bootstrap.netlify.app/docs/components/buttons/*/}
{/* https://dev.to/collegewap/how-to-work-with-checkboxes-in-react-44bc */}

    return(
        <div>
  
   <div className="container">
   <h1 className='text-center mb-3'>Meny</h1>
   <div>
 
</div>
{/* Lägga in alla filter knappar*/}
   <div className="mb-5 d-flex justify-content-center">
  
        {filters.map((filter) => (
     <div  key={filter.id}> 
      <input type="checkbox" className="btn-check" id={`btn-check-outlined-${filter.id}`} autoComplete="off" 
          onChange={(event) => CheckboxSelected(event, filter.category)}/>
<label className="btn btn-outline-primary" htmlFor={`btn-check-outlined-${filter.id}`}>{filter.category}</label>
     </div>
        ))}
    </div>
   {/* ha koll på vilka knappar som är iklickade sålänge */}
 <div>
 <p>Checked Values: {activeFilters.join(', ')}</p>
 </div>
{/* Visa alla produkter*/}
  <div className="row justify-content-center">

    {products.filter((product)=> activeFilters.includes(product.category))
    .map((product) => (
      <div key={product.id} className="col-12 col-md-6 col-lg-4">
        <div className="text-center">
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
    </div>
    );
}

export default Meny
