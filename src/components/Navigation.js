import { useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import '../components/stylesheets/Navigation.css';
import logo from '../badges/mountaineer_badge.png';

// React Styling
const img_size = {
  width: 150,
  height: 150,
  resizeMode: "contain",
  alignSelf: "center",
  borderWidth: 1,
};

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
        <Navbar id="navigation" className="justify-content-between">
            {/* Left-aligned nav content */}
            <Nav id="navbar-title" className="justify-content-start">
              
                <NavItem id="logo">
                  <img src={ logo } alt="Site logo" style={ img_size }></img>
                </NavItem>

                <NavItem className="title-bar">
                  <h1 id="page-title">Weathering Heights
                    <br></br>
                    <span id="subtitle">A real-time weather app for a safe summit</span>
                  </h1>
                </NavItem>

            </Nav>

            {/* Right-aligned nav content */}
            <Nav id="navbar-links" className="justify-content-end">

                <NavItem className="item" eventkey={1} href="/">
                  <Nav.Link id="home-nav-link" as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                
                {/* MyProfile auth conditional */}
                {currentUser && 
                  <NavItem className="item" eventkey={2} href="/my-profile">
                    <Nav.Link id="profile-nav-link" as={Link} to="/my-profile" >Profile</Nav.Link>
                  </NavItem>
                }

                {/* Login vs Logout */}
                {(currentUser && !homeOnlyNavView) &&
                  <NavItem className="item" eventkey={4} href="/">
                    <Nav.Link id="login-nav-link" as={Link} to="/">Logout</Nav.Link>
                  </NavItem>
                }

                {(!currentUser && !homeOnlyNavView) && 
                  <NavItem className="item" eventkey={3} href="/login">
                    <Nav.Link id="logout-nav-link" as={Link} to="/login">Login</Nav.Link>
                  </NavItem>
                }
                  
            </Nav>
        </Navbar>
    )
};

export default Navigation;
