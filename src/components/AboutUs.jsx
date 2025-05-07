import React from 'react';
import '../AboutUs.css';
import Footer from './Footer';
import Header from './Header';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';


export const AboutUs = ({ authenticated, onLogout }) => {
    return (
        <div className="aboutus-container">
            <Header authenticated={authenticated} onLogout={onLogout} />
            <div className="aboutus-heading">
                    <p className="aboutus-title">Meet the Developer</p>
            </div>
            <section className="aboutus-content">
                <div className="aboutus-columns">
                    {/* Left Column */}
                    <div className="aboutus-left">
                        <h3>About the Project</h3>
                        <br />
                        <p className="aboutus-label">Developed by: </p>
                        <p>Bdec Projects</p>
                        <p className="aboutus-label">Summary: </p>
                        <p>
                            BoredGames is a web-based collection of timeless classics like Tic Tac Toe and Dots and Boxes. Currently evolving to support multiplayer functionality and hosted online via Render.
                        </p>
                    </div>

                    {/* Center Column */}
                    <div className="aboutus-center">
                        <div className="aboutus-image">
                            <img src="/yp.jpeg" alt="Developer" />
                        </div>
                        <div className="aboutus-links">
                            <a href="HTTPS://www.linkedin.com/in/yugapriya-shankar-0a5669176" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin size={30} />
                            </a>
                            <a href="HTTPS://YUGAPRIYA-PORTFOLIO.ONRENDER.COM" target="_blank" rel="noopener noreferrer">
                                <FaGlobe size={30} />
                            </a>
                            <a href="HTTPS://GITHUB.COM/YUGA16S" target="_blank" rel="noopener noreferrer">
                                <FaGithub size={30} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="aboutus-right">
                        <h3 className="developer-name">About Me</h3>
                        <br></br>
                        <p className="aboutus-label">Name: </p>
                        <p>Yugapriya Shankar</p>

                        <p className="aboutus-label">Location: </p>
                        <p>Canada 🇨🇦</p>

                        <p className="aboutus-label">Summary: </p>
                        <p className="aboutus-summary">
                            I'm a full-stack developer proficient in both backend and frontend technologies. 
                            With expertise in Java (Spring), Python (Django), and React JS. 
                            I design and develop robust web applications that offer seamless user experiences and efficient backend systems
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
