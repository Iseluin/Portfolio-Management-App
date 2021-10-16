import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Portfolio Manager</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text>
              Welcome, NAME
          </Navbar.Text>
          <Nav.Link>
              Sign Out
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;