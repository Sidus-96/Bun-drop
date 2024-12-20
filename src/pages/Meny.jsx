import React, { useState, useEffect  } from 'react'
import { Image, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { MENU_URL, FILTERS_URL } from '../constants';


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
      fetch(MENU_URL)
        .then((res) => res.json())
        .then((data) => setProducts(data)); }, []);

    

    useEffect(() => {
      fetch(FILTERS_URL)
        .then((res) => res.json())
        .then((data) => setFilters(data));
    }, []);
   
    return(   <div className="container">
 
      <h1 className="text-center mb-3">Meny</h1>

   
      <div className="d-flex flex-wrap justify-content-center mb-3">
        {filters.map((filter) => (
          <div className="me-1" key={filter.id}>
            <input
              type="checkbox"
              className="btn-check"
              id={`btn-check-outlined-${filter.id}`}
              autoComplete="off"
              onChange={(event) => CheckboxSelected(event, filter.category)}
            />
            <label
              className="btn btn-outline-primary"
              htmlFor={`btn-check-outlined-${filter.id}`}
            >
              {filter.category}
            </label>
          </div>
        ))}
      </div>

     
      {activeFilters.length > 0 && (
        <div>
          <p>Aktiva filtreringar: {activeFilters.join(", ")}</p>
        </div>
      )}

     
      <div className="row justify-content-center">
        {(activeFilters.length === 0
          ? products
          : products.filter((product) =>
              activeFilters.includes(product.category)
            )
        ).map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-3">
            <Card
              style={{
                background: "#2C3237",
                color: "white",
                borderRadius: "20px",
              }}
            >
              <div className="text-center mb-1">
               
                <div style={{ position: "relative" }}>
                <Image
  className="mt-2"
  src={`${process.env.PUBLIC_URL}/${product.image}`}
  roundedCircle
  height="150"
  width="150"
/>
                  {UserDetails.user.bool && (
                    <svg
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "10%",
                        left: "80%",
                      }}
                      onClick={() => addToFavorites(product)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-emoji-heart-eyes"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  )}
                </div>

               
                <h5>{product.title}</h5>
                <span>{product.description}</span>
                <p>{product.price} kr</p>
                <Button onClick={() => addToCart(product)}>
                  Lägg i varukorg
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meny;