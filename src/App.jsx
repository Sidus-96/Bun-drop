import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom' 
import Navbar from './components/Navbar';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Meny from './pages/Meny'
import React, { useState } from 'react';
import ShoppingCart from './components/ShoppingCart'; 
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [IsUserSignedIn, setUserStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUserStatus = (boolean) => {
    if(boolean)
      {
        setUserStatus(true);
      }
      else{
        setUserStatus(false);
      }


  }

 
  const addToCart = (item) => {
    const existingProduct = cartProducts.find((product) => product.id === item.id);
    if (existingProduct) {
      setCartProducts(cartProducts.map((product) =>
        product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
      ));
      setTotalQuantity(totalQuantity + 1);
    } else {
      setCartProducts([...cartProducts, { ...item, quantity: 1 }]);
      setTotalQuantity(totalQuantity + 1);
    }
  };

  const removeFromCart = (item) => {
    setCartProducts(cartProducts.filter((product) => product.id !== item.id));
    setTotalQuantity(totalQuantity - item.quantity);
  };

    const updateQuantity = (index, ButtonClickEvent) => {
    const updatedCartProducts = [...cartProducts];
    if (ButtonClickEvent === 'increaseQ') {
      updatedCartProducts[index].quantity += 1;
      setTotalQuantity(totalQuantity + 1);
    } else if (ButtonClickEvent === 'decreaseQ' && updatedCartProducts[index].quantity > 1) {
      updatedCartProducts[index].quantity -= 1;
      setTotalQuantity(totalQuantity - 1);
    }
    setCartProducts(updatedCartProducts);
  };

  return(
    
   <div className="bg-dark text-light p-3">

    <Router>
    <ShoppingCart show={show} handleClose={handleClose} cartProducts={cartProducts} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
    <Navbar handleShow={handleShow} totalQuantity={totalQuantity} IsUserSignedIn={IsUserSignedIn} updateUserStatus={updateUserStatus}  />
 <Routes>
   <Route path ="/" element={<Home />} />
   <Route path ="/Meny" element={<Meny addToCart={addToCart} />} />
   <Route path ="/Login" element={<Login setUserStatus={setUserStatus}/>} />
   <Route path ="/Register" element={<Register />} />
 </Routes>
   </Router>
   </div>

 );
}
export default App;
