import React from 'react'; // useState
import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Navbar = () => {

    return (
        <nav className="navbar navbar-expand navbar-light bg-dark">
            <a className="navbar-brand" href="">
                <img className="navbar-brand company-logo" src="https://images.squarespace-cdn.com/content/5aa1d485a9e0280e42b306fb/1562714317891-ZKZ0OQSOPG8FNHTT1GG5/side+hustle-logo-white.png?format=1500w&content-type=image%2Fpng" alt="side-hustle-logo" />
            </a>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );

    // return (
    //     <div className="navbar-sh">
    //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //             <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //             <Navbar.Collapse id="responsive-navbar-nav">
    //                 <Nav className="mr-auto">
    //                 <Nav.Link href="#features">Features</Nav.Link>
    //                 <Nav.Link href="#pricing">Pricing</Nav.Link>
    //                 <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    //                     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                     <NavDropdown.Divider />
    //                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    //                 </NavDropdown>
    //                 </Nav>
    //                 <Nav>
    //                 <Nav.Link href="#deets">More deets</Nav.Link>
    //                 <Nav.Link eventKey={2} href="#memes">
    //                     Dank memes
    //                 </Nav.Link>
    //                 </Nav>
    //             </Navbar.Collapse>
    //         </Navbar>
    //     </div>
    // );

}

export default Navbar;