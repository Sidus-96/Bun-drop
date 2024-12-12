import React, { useState, useEffect  } from 'react'
import { Image, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Meny({ addToCart, addToFavorites, UserDetails }) {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);


    const [activeFilters, setCheckedValues] = useState([]);
   {/* Ha koll på om en knapp är checked/aktiv eller inte  */}
    const CheckboxSelected = (event, category) => {
      const isChecked = event.target.checked;
  
      if (isChecked) 
        {
        setCheckedValues((a) => [...a, category.toLowerCase()]);
      }
       else if(isChecked==false)
        {
        setCheckedValues((a) =>
          a.filter((value) => value !== category.toLowerCase()));
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
        


   <div className="container">
   <h1 className='text-center mb-3'>Meny</h1>

{/* Lägga in alla filter knappar*/}
   <div className="d-flex flex-wrap justify-content-center">
  
        {filters.map((filter) => (
     <div className='me-1' key={filter.id}> 
      <input type="checkbox" className="btn-check" id={`btn-check-outlined-${filter.id}`} autoComplete="off" 
          onChange={(event) => CheckboxSelected(event, filter.category)}/>
<label className="btn btn-outline-primary" htmlFor={`btn-check-outlined-${filter.id}`}>{filter.category}</label>
     </div>
        ))}
    </div>
   {/* Visa vilka filter som är aktiva just nu */}
   {activeFilters.length > 0 && (
  <div>
    <p>Aktiva filtreringar: {activeFilters.join(', ')}</p>
  </div>
)}

{/* Visa alla produkter*/}
  <div className="row justify-content-center">

    { (activeFilters.length === 0 ? products : products.filter(product => activeFilters.includes(product.category)))
    .map((product) => (
     
      <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-3">
        <Card  style={{ width: '25rem', background:"#2C3237", color:"white", borderRadius: "50px" }}>
        <div className="text-center mb-1">
        <div style={{ position: 'relative' }}> 
          <Image className="mt-2" style={{ position: 'relative'}} src={product.image} roundedCircle height="200" width="200" />
          {UserDetails.user.bool && (
  <svg   style={{cursor: 'pointer', position: 'absolute', top: '10%',left: '80%',}} onClick={() => addToFavorites(product)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-heart-eyes"  viewBox="0 0 16 16" >
       <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
</svg>
    )}
          </div>
          <div>
            <h5>{product.title}</h5>
            <span>{product.description}</span>
            <p>{product.price} kr</p>
            <Button  onClick={() => addToCart(product)}>Lägg i varukorg</Button>
            </div>
        </div>
        </Card>
      </div>
    ))}
  </div>
</div>
   
    );
}
export default Meny
