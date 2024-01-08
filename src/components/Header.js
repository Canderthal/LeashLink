import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <Navbar dark color="primary" stick='top' expand='md'>
            <h2>LEASH LINK</h2>
            <Nav className='ms-auto' navbar>
                <NavItem>
                    <NavLink className='nav-link' to='fido'>
                        Fido
                    </NavLink>
                </NavItem>

            </Nav>
        </Navbar>
    );
};

export default Header;