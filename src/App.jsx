import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom' 
import Navbar from './components/Navbar';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Meny from './pages/Meny'
import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart'; 
function App() {

  const [show, setShow] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  const addToCart = (item) => {
    const existingProduct = cartProducts.find((product) => product.id === item.id);
    if (existingProduct) {
      setCartProducts(cartProducts.map((product) =>
        product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
      ));
    } else {
      setCartProducts([...cartProducts, { ...item, quantity: 1 }]);
    }
  };

  return(
    
   <div className="bg-dark text-light p-3">

      <ShoppingCart show={show} handleClose={handleClose} cartProducts={cartProducts} />
  
    <Router>
    <Navbar handleShow={handleShow} />
 <Routes>
   <Route path ="/" element={<Home />} />
   <Route path ="/Meny" element={<Meny addToCart={addToCart} />} />
 </Routes>
   </Router>
   </div>

 );
}
export default App;
