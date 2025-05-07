import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addFeedback } from '../util/APIUtils.js';
import Header from './Header.jsx';
import '../AddReview.css';

const AddReview = ({ currentUser }) => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setFeedback(value);
  };


  const handleReviewSubmit = (event) => {
    event.preventDefault();
    //console.log("Submitting feedback form...");
    //console.log("current user name : ", currentUser?.name);
    //console.log("current user email : ", currentUser?.email);
    //console.log("current user feedback : ", feedback);

    const feedbackRequest = {
        name: currentUser?.name,
        email: currentUser?.email,
        feedback: feedback,
    };

    addFeedback(feedbackRequest)
      .then((response) => {
        //console.log("addFeedback call succeeded:", response);
        toast.success("You're feedback has been submitted. Thank You!");
        navigate("/reviews"); 
      })
      .catch((error) => {
        //console.error("Couldnt submit feedback", error);
        const errorMessage = error.message || 'Oops! Something went wrong. Please try again!';
        toast.error(errorMessage);
      });
  };

  return (
    <div className="add-review-container">
    <Header />
    <main className="add-review-main">
      <div className="add-review-box">
        <form onSubmit={handleReviewSubmit}>
          <div className="feedback-input-box">
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              value={feedback}
              onChange={handleChange}
              required
            />
          </div>
          <div className="review-button-container">
            <button type="submit" className="review-button">Submit</button>
          </div>
        </form>
        <p className="disclaimer-text">We value your feedback and use it to improve our platform.</p>
      </div>
    </main>
  </div>
  
  );
};

export default AddReview;





