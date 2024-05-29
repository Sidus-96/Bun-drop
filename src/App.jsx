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
import Kassa from './pages/Kassa'
import Favorites from './pages/FavoriteProducts.jsx';
import Confirmation from './pages/Confirmation.jsx';

function App() {
  const [UserDetails, setUserStatus] = useState({user:{bool:false,userid:'', username:''}});
  const [show, setShow] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [favoriteProducts, setFavoritesProducts] = useState({ userid: '', products: [] });
  const [totalQuantity, setTotalQuantity] = useState(0);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUserStatus = (boolean, userid, username) => {
    if(boolean)
      {
        setUserStatus({ user: { bool: true, userid: userid,username:username } });
        console.log("jjje",UserDetails);

        console.log(UserDetails.user.bool);
        console.log("namne",UserDetails.user.username);
        console.log("frånlogin",userid);
        console.log("frånlogin",username);
        refreshFavorites(userid);

      }
      else{
        setUserStatus({ user: { bool: false, user: {} } });
      }


  }

 //lägg till i kundkorgen samt kolla om en produkt redans finns, lägg på i kvantitet då 
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

  //ta bort specifik produkt
  const removeFromCart = (item) => {
    setCartProducts(cartProducts.filter((product) => product.id !== item.id));
    setTotalQuantity(totalQuantity - item.quantity);
  };
  
  //rensa hela kundkorgen
  const clearCart = () => {
    setCartProducts([]);
    setTotalQuantity(0);
  };



//Om man vill uppdatera kvaniteten
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

//När man loggar in första gången så adderar metoden favoriterna.
const refreshFavorites=(userid)=>
  {
    fetch("http://localhost:3005/userFavorites")
    .then((res) => res.json())
    .then((data) => {
      const checkExistingUserFavorites = data.find((userFavorites) => userFavorites.userid === userid);
  
      if(checkExistingUserFavorites)
      {
        const favoriteProductsArray = checkExistingUserFavorites.favoriteArticles.map(article => article.productId);

        setFavoritesProducts({
          userid,
          products: favoriteProductsArray, 
        });
      }
    });};

const addToFavorites = (item) => {
      
//addera
fetch('http://localhost:3005/userFavorites/')
.then((response) => response.json())
.then((data) => {
  const findUserFavorites = data.find((user) => user.userid === UserDetails.user.userid);
  console.log("checkarFavorite", findUserFavorites);

  if (findUserFavorites) {

    const checkExistingProduct = findUserFavorites.favoriteArticles.find((article) => article.productId === item.id);
    if (checkExistingProduct) {

      return;
    }
     else 
    {

      const updatedFavoriteArticles = [...findUserFavorites.favoriteArticles, { productId: item.id }];
      const updatedFavorite = {
        ...findUserFavorites,
        favoriteArticles: updatedFavoriteArticles
      };
      const postOptions = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedFavorite),
      };
      fetch(`http://localhost:3005/userFavorites/${findUserFavorites.id}`, postOptions);
    
      const userid = UserDetails.user.userid;
      setFavoritesProducts(prevState => ({
      userid,
      products: [...prevState.products, item.id]
      }));
      console.log("nytt uppdaterat",favoriteProducts );
    }
  }
})
};

const DeleteFromFavorites = (item) => {
  fetch('http://localhost:3005/userFavorites/')
    .then((response) => response.json())
    .then((data) => {
      const findUserFavorites = data.find((user) => user.userid === UserDetails.user.userid);
      if (findUserFavorites) {
        const updatedFavoriteArticles = findUserFavorites.favoriteArticles.filter((article) => article.productId !== item.id);

          const updatedFavorite = {
            ...findUserFavorites,
            favoriteArticles: updatedFavoriteArticles
          };
          console.log("raderat",updatedFavorite);
          console.log("itemsomska",item);
          const postOptions = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedFavorite),
          };
          fetch(`http://localhost:3005/userFavorites/${findUserFavorites.id}`, postOptions)
            .then(() => {
              const userid = UserDetails.user.userid;
              const favoriteProductsArray = favoriteProducts.products.filter((productId) => productId !== item.id);
              console.log("nya lsitan",favoriteProductsArray);
              setFavoritesProducts(prevState => ({
                userid,
                products: favoriteProductsArray
              }));
            });
            console.log("Helt klar",favoriteProducts);
          
      }
    });
};


  return(
    
   <div className="bg-dark text-light p-3">

    <Router>
    <ShoppingCart show={show} handleClose={handleClose} cartProducts={cartProducts} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
    <Navbar handleShow={handleShow} totalQuantity={totalQuantity} UserDetails={UserDetails} updateUserStatus={updateUserStatus} favoriteProducts={favoriteProducts} />
 <Routes>
   <Route path ="/" element={<Home />} />
   <Route path ="/Meny" element={<Meny addToCart={addToCart} addToFavorites={addToFavorites} />} />
   <Route path ="/Login" element={<Login updateUserStatus={updateUserStatus} />} />
   <Route path ="/Register" element={<Register />} />
   <Route path ="/Kassa" element={<Kassa cartProducts={cartProducts} updateQuantity={updateQuantity} removeFromCart={removeFromCart} UserDetails={UserDetails} clearCart={clearCart} />} />
   <Route path ="/Confirmation" element={<Confirmation />} />
   <Route path ="/Favorites" element={<Favorites favoriteProducts={favoriteProducts} addToCart={addToCart} DeleteFromFavorites={DeleteFromFavorites}/>} />
 </Routes>
   </Router>
   </div>

 );
}
export default App;
