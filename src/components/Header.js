import React from 'react';
import { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Avatar
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../redux/userActions';
import { useSelector, useDispatch } from 'react-redux';
import LoginMenu from '../pages/LoginPage';
import Cart from './Cart';


const Header = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();

  useEffect(() => {
    // Check local storage for user information and initialize Redux state if found
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(loginUser(userData));
    }
  }, [dispatch]);


  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar dark style={{backgroundColor: "#5B6BF5"}}  sticky="top" expand="md" className='headerBar'>
      <NavbarBrand style={{marginLeft: 20}}>LEASH LINK</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
      <Nav className="ms-auto" navbar>

      {user ? (
  <>
    {user.profile.role === 'admin' ? (
      <>
        <NavItem>
          <NavLink className="nav-link adminNavLink" to="/admin">
            ADMIN
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className="nav-link" to="/dashboard">
            Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className="nav-link" to="/checkout">
            <Cart />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className="nav-link" to="profile">
            Welcome, <span className='usersName'>{user.profile.firstName}</span>
            {/* <img width={25} height={25} style={{marginLeft: 10, borderRadius: 50}}></img> */}
          </NavLink>
        </NavItem>
      </>
    ) : (
      <>
        <NavItem>
          <NavLink className="nav-link" to="/dashboard">
            Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className="nav-link" to="/checkout">
            <Cart />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink className="nav-link" to="profile">
            Welcome to Leash Link
            {/* <img width={25} height={25} style={{marginLeft: 10, borderRadius: 50}}></img> */}
          </NavLink>
        </NavItem>
      </>
    )}
  </>
) : (
  <>
    <NavItem>
      <NavLink className="nav-link" to="/dashboard">
        Home
      </NavLink>
    </NavItem>

    <NavItem>
      <NavLink className="nav-link" to="/checkout">
        <Cart />
      </NavLink>
    </NavItem>

    <NavItem>
      <NavLink className="nav-link" to="profile">
        Sign-In
        {/* <img width={25} height={25} style={{marginLeft: 10, borderRadius: 50}}></img> */}
      </NavLink>
    </NavItem>
  </>
)}
      </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;

