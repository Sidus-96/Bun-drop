import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom' 
import Navbar from './components/Navbar';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Meny from './pages/Meny'

function App() {

  return(
    
   <div className="bg-dark text-light p-3">

    <Router>
    <Navbar />
 <Routes>
   <Route path ="/" element={<Home />} />
   <Route path ="/Meny" element={<Meny />} />
 </Routes>
   </Router>
  
   </div>

 );
}
export default App;
