import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom' 

import Home from './pages/Home'

function App() {

  return(
    <Router>
   <>
   <h1>Navbar</h1>
   </>
 <Routes>
   <Route
    path ="/"
    element={<Home />}
    />
 </Routes>
 <></>
 
   </Router>
 
 );
}

export default App;
