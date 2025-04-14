import React from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import '../AppHeader.css'

const AppHeader = ({ authenticated, onLogout }) => {
    const navigate = useNavigate();

    const handleViewGamesClick = (event) => {
        if (!authenticated) {
            event.preventDefault();
            toast.error('Please login to view games');
            navigate('/login');
        }
    };
    return (
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/homePage" className="app-title" onClick={handleViewGamesClick} >View Games</Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        {authenticated ? (
                            <ul>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <a onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
