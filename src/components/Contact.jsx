import React from 'react';
import Footer from '../components/Footer.jsx';
import Header from './Header.jsx';
import '../Contact.css';

export const Contact = ({ authenticated, onLogout }) => {
    return (
        <div className="contact-container">
            <Header authenticated={authenticated} onLogout={onLogout} />
            <main className="contact-main">
                <div className="contact-box">
                    <section className="contact-intro">
                        <h2>Contact Us</h2>
                        <p>We'd love to hear from you!</p>
                    </section>

                    <section className="social-media-section">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="mailto:support@example.com">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </section>

                    <section className="feedback-form-section">
                        <h3>Send us your feedback</h3>
                        <textarea
                            className="feedback-input"
                            placeholder="Type your feedback or complaints here..."
                            rows="5"
                        />
                        <button className="feedback-button">Submit</button>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
