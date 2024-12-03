

import { NavLink } from"react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
function NavigationBar(){

return(
<Navbar bg='info' expand="lg">
    <Navbar.Brand href='/'>Welcome to My Project</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
    <Navbar.Collapse id='basic-navbar-nav'>
    <Nav className = 'mr-auto'>

 
    <Nav.Link as={NavLink} to="/"activeclassname="active">
        Home
        </Nav.Link>

        <Nav.Link as={NavLink} to="/customerForm" activeclassname="active">
         Add Customers
        </Nav.Link>
        
        <Nav.Link as={NavLink} to="/customerList" activeclassname="active">
        Customers
        </Nav.Link>

        <Nav.Link as={NavLink} to="/display" activeclassname="active">
        Customer Info
        </Nav.Link>

        <Nav.Link as={NavLink} to="/productList" activeclassname="active">
        Products
        </Nav.Link>

        <Nav.Link as={NavLink} to="/productForm" activeclassname="active">
        Add Product
        </Nav.Link>

        <Nav.Link as={NavLink} to="/placeOrder" activeclassname="active">
        Place Order
        </Nav.Link>

  
    
        </Nav>
        </Navbar.Collapse>
    </Navbar>

);
}
export default NavigationBar;