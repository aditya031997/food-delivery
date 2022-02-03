import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
function Header() {
  const history = useHistory();
  function handleClear() {
    localStorage.clear();
    history.push("/login");
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav>
            <Link to="/home" className="mx-4  text-light text-decoration-none">
              Home
            </Link>
            <Link to="/product" className="mx-4 text-light text-decoration-none">
              Product
            </Link>
            <Link to="/users" className="mx-4 text-light text-decoration-none">
              Users
            </Link>
          </Nav>
          <div>
            <Nav>
              <NavDropdown id="nav-dropdown-dark-example" title="Dropdown" menuVariant="dark">
                <>
                  <Link to="/profile" className="text-light text-decoration-none">
                    Profile
                  </Link>
                  <br />
                  <Button
                    variant="link"
                    className="text-light text-decoration-none p-0"
                    onClick={handleClear}
                  >
                    Log Out
                  </Button>
                </>
              </NavDropdown>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
