import { useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import '../components/stylesheets/Navigation.css';

const Navigation = () => {
    const { currentUser } = useAuth()
    
    let homeOnlyNavView;
    const homeOnlyViews = ['/signup', '/forgot-password', '/login'];
    const location = useLocation();
    if (homeOnlyViews.includes(location.pathname)) {
      homeOnlyNavView = true;
    } else {
      homeOnlyNavView = false;
    }
    

    return (
        <Navbar id="navigation">
            <Nav id="navbar" className="justify-content-end">

                <NavItem className="nav-item" eventkey={1} href="/">
                  <Nav.Link id="home-nav-link" as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                
                {/* MyProfile auth conditional */}
                {currentUser && 
                  <NavItem className="nav-item" eventkey={2} href="/my-profile">
                    <Nav.Link id="profile-nav-link" as={Link} to="/my-profile" >Profile</Nav.Link>
                  </NavItem>
                }

                {/* Login vs Logout */}
                {(currentUser && !homeOnlyNavView) &&
                  <NavItem className="nav-item" eventkey={4} href="/">
                    <Nav.Link id="login-nav-link" as={Link} to="/">Logout</Nav.Link>
                  </NavItem>
                }

                {(!currentUser && !homeOnlyNavView) && 
                  <NavItem className="nav-item" eventkey={3} href="/login">
                    <Nav.Link id="logout-nav-link" as={Link} to="/login">Login</Nav.Link>
                  </NavItem>
                }

            </Nav>
        </Navbar>
    )
};

export default Navigation;
