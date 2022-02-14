import { useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import '../components/stylesheets/Navigation.css';

// React Styling
const img_size = {
  width: 150,
  height: 150,
  resizeMode: "contain",
  alignSelf: "center",
  borderWidth: 1,
};

const Navigation = () => {
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    // Determines current page, if Nav is "Home" only
    let homeOnlyNavView;
    const homeOnlyViews = ['/signup', '/forgot-password', '/login'];
    const location = useLocation();
    const path = location.pathname;
    
    if (homeOnlyViews.includes(path)) {
      homeOnlyNavView = true;
    } else {
      homeOnlyNavView = false;
    }

    // Logout functionality
    async function handleLogout() {
      setError('')
      try {
          await logout()
          navigate("/")
      } catch {
          setError('Failed to log out')
      }
  }

    return (
        <Navbar id="navigation" className="justify-content-between">
            {/* Title: Left-aligned nav content */}
            <Nav id="navbar-title" className="justify-content-start">
              
                <NavItem id="logo">
                  <img src="wh-logo.png" alt="logo: person climbing mountain" style={ img_size }></img>
                </NavItem>

                <NavItem className="title-bar">
                  <h1 id="page-title">Weathering Heights
                    <br></br>
                    <span id="subtitle">A real-time weather app for a safe summit</span>
                  </h1>
                </NavItem>

            </Nav>

            {/* Links: Right-aligned nav content */}
            <Nav id="navbar-links" className="justify-content-end">

                {(path !== '/') &&
                <NavItem className="item" eventkey={1} href="/">
                  <Nav.Link id="home-nav-link" as={Link} to="/" >Home</Nav.Link>
                </NavItem>
                }
                
                {/* MyProfile auth conditional */}
                {(currentUser && path !== '/my-profile') && 
                  <NavItem className="item" eventkey={2} href="/my-profile">
                    <Nav.Link id="profile-nav-link" as={Link} to="/my-profile" >Profile</Nav.Link>
                  </NavItem>
                }

                {/* Login vs Logout */}
                {(currentUser && !homeOnlyNavView) &&
                  <NavItem className="item" eventkey={4} href="/">
                    <Nav.Link 
                      id="login-nav-link" 
                      as={Link} to="/" 
                      onClick={handleLogout}>
                        Logout
                    </Nav.Link>
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
