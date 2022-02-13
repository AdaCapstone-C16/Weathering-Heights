import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import '../components/stylesheets/Navigation.css';

const Navigation = () => {
    const { currentUser } = useAuth()

    return (
        <Navbar id="navigation">
            <Nav id="navbar" className="justify-content-end">

                <NavItem className="nav-item" eventkey={1} href="/">
                  <Nav.Link id="home-nav-link" as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                
                {currentUser && 
                  <NavItem className="nav-item" eventkey={2} href="/my-profile">
                    <Nav.Link id="profile-nav-link" as={Link} to="/my-profile" >Profile</Nav.Link>
                  </NavItem>
                }
                
                {currentUser && 
                  <NavItem className="nav-item" eventkey={3} href="/login">
                    <Nav.Link id="logout-nav-link" as={Link} to="/login">Login</Nav.Link>
                  </NavItem>
                }

                {!currentUser && 
                  <NavItem className="nav-item" eventkey={4} href="/">
                    <Nav.Link id="login-nav-link" as={Link} to="/">Logout</Nav.Link>
                  </NavItem>
                }

            </Nav>
        </Navbar>
    )
};

export default Navigation;
