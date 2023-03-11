import { Component } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
               <LinkContainer to={"/"}>
                <Nav.Link>CharityXchange</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Register" id="basic-nav-dropdown">
                <LinkContainer to={"/donorRegistrationForm"}>
                  <NavDropdown.Item>As Donor</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/recipientRegistrationForm"}>
                  <NavDropdown.Item>As Recipient</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/volunteerRegistrationForm"}>
                  <NavDropdown.Item>As Volunteer</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to={"/login"}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              {/* <NavDropdown title="Login" id="basic-nav-dropdown">
                <LinkContainer to={"/adminLogin"}>
                  <NavDropdown.Item>as Admin</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/donorLogin"}>
                  <NavDropdown.Item>as Donor</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/recipientLoginForm"}>
                  <NavDropdown.Item>as Recipient</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/volunteerLoginForm"}>
                  <NavDropdown.Item>as Volunteer</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
