import React from 'react';
import '../Footer.css';

export const Footer = () => {
    return (
            <footer className="homepage-footer">
                <div className="footer-container">
                    <div className="footer-text">
                        <p>&copy; 2025 Bored Games. All rights reserved.</p>
                    </div>
                    <div id="contact-section" className="footer-social">
                        <a href="https://www.linkedin.com/in/yugapriya-shankar-0a5669176" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="HTTPS://YUGAPRIYA-PORTFOLIO.ONRENDER.COM" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-briefcase"></i>
                        </a>
                        <a href="HTTPS://GITHUB.COM/YUGA16S" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="mailto:yugapriyaky@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </footer>
    )
}

export default Footer;
