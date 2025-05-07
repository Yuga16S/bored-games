import React from "react";
import { useNavigate } from "react-router";
import logo from "/logo4.png";
import '../Header.css';

const Header = ({ authenticated, onLogout }) => {
    const navigate = useNavigate();

    const goToNews = () => {
        navigate("/news");
    };

    const goToReviews = () => {
        navigate("/reviews");
    };

    const goToAboutUs = () => {
        navigate("/aboutus");
    };

    const goToRules = () => {
        navigate("/rules");
    }

    const goToProfile = () => {
        navigate("/profile");
    }

    const goToContact = () => {
        navigate("/contact");
    }

    const goToFooter = () => {
        navigate("/homePage");
        const waitForFooter = setInterval(() => {
            const footerSection = document.getElementById("contact-section");
            if (footerSection) {
                clearInterval(waitForFooter); 
                footerSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100); 
    };


    return (
        <header className="homepage-header-container">
            <a href="/homePage" className="site-logo">
                <img src={logo} alt="Bored Games Logo" />
            </a>
            <nav>
                <ul>
                    <li onClick={goToProfile} style={{ cursor: "pointer" }}>Profile</li>
                    <li onClick={goToNews} style={{ cursor: "pointer" }}>News</li>
                    <li onClick={goToReviews} style={{ cursor: "pointer" }}>Reviews</li>
                    <li onClick={goToRules} style={{ cursor: "pointer" }}>Rules</li>
                    <li onClick={goToContact} style={{ cursor: "pointer" }}>Contact</li>
                    <li onClick={goToAboutUs} style={{ cursor: "pointer" }}>About Us</li>
                    <li onClick={() => { console.log("Logout clicked"); onLogout(); }} style={{ cursor: "pointer" }} >Logout</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;