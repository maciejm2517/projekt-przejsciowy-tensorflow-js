// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/Help">Help</Nav.Link>
          <Nav.Link as={Link} to="/Finger">Finger</Nav.Link>
          <Nav.Link as={Link} to="/ObjectDet">ObjectDet</Nav.Link>
          <Nav.Link as={Link} to="/VoiceDet">VoiceDet</Nav.Link>
          <Nav.Link as={Link} to="/Facemark">Facemark</Nav.Link>
          <Nav.Link as={Link} to="/ImgRec">ImgRec</Nav.Link>
          <Nav.Link as={Link} to="/CamRec">CamRec</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
