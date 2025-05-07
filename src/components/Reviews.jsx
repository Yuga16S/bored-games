import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import '../Reviews.css';
import { fetchValidatedReviews } from '../util/APIUtils.js';

export const Reviews = ({ authenticated, onLogout }) => {
    const navigate = useNavigate();
    const reviewRef = useRef([]);
    const [currentReview, setCurrentreview] = useState('');
    const [hasAReview, setHasAReview] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        console.log("1 - Inside useEffect trying to fetch Reviews");
        fetchReviews();
        return () => clearInterval(intervalRef.current);
    }, []);

    const addAReview = () => {
        navigate('/addAReview');
    };

    const fetchReviews = async () => {
        try {
            console.log("2 - Inside fetchReviews");
            const data = await fetchValidatedReviews();
            console.log("8 - data after fetching", data);
            reviewRef.current = data;
    
            if (data.length > 0) {
                setCurrentreview(data[Math.floor(Math.random() * data.length)]);
    
                intervalRef.current = setInterval(() => {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setCurrentreview(data[randomIndex]);
                }, 5000); // change every 5 seconds
            }
        } catch (error) {
            console.error("9 - Error fetching reviews:", error);
        }
    };

    return (
        <div className="reviews-container">
            <Header authenticated={authenticated} onLogout={onLogout} />
            <main className="reviews-main">
                <div className="reviews-box">
                    <h2>What Players Are Saying</h2>
                    <div className="review-box">
                        <p className="review-text">{currentReview || "Loading reviews..."}</p>
                    </div>

                    <p className="disclaimer-text">
                        * All submitted reviews will be sent for moderation before being published.
                    </p>

                    {!hasAReview && (
                        <div className="review-button-container">
                            <button onClick={addAReview} className="review-button">
                                Add a Review
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Reviews;
