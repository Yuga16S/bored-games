import React from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo4.png";

const Header = ({ authenticated, onLogout }) => {
    const navigate = useNavigate();

    const goToNews = () => {
        navigate("/homePage");
        setTimeout(() => {
            const newsSection = document.getElementById("news-section");
            if(newsSection) {
                newsSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };
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

    const goToReviews = () => {
        navigate("/homePage");
        setTimeout(() => {
            const reviewSection = document.getElementById("reviews");
            if(reviewSection) {
                reviewSection.scrollIntoView({ behavior: "smooth" });
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
                    <li>About Us</li>
                    <li onClick={goToNews} style={{ cursor: "pointer" }}>News</li>
                    <li onClick={goToReviews} style={{ cursor: "pointer" }}>Reviews</li>
                    <li>Rules</li>
                    <li onClick={goToFooter} style={{ cursor: "pointer" }}>Contact</li>
                    <li onClick={() => { console.log("Logout clicked"); onLogout(); }} style={{ cursor: "pointer" }} > Logout</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;