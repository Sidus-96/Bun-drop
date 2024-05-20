import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './media/logo color.png'; 
function Navbar_root() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <img 
            src={logo}
            
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar_root;