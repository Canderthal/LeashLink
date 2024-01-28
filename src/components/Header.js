import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <Navbar dark color="primary" sticky="top" expand="md">
      <h2>LEASH LINK</h2>
      <Nav className="ms-auto" navbar>
        {user ? (
          <>
            <NavItem>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </NavItem>
          </>
        ) : (

          <NavItem>
            <NavLink className="nav-link" to="/">
              Login
            </NavLink>
          </NavItem>
        )}

        {user && (
          <NavItem>
            <NavLink className="nav-link" to="/">
              Logout
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;

