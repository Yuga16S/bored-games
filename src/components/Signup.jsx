import React, { useState } from 'react';
import '../Signup.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../constants/index.js';
import { signup } from '../util/APIUtils.js';
import fbLogo from '../assets/fb-logo.png';
import googleLogo from '../assets/google-logo.png';
import githubLogo from '../assets/github-logo.png';
import { toast } from 'react-toastify';


const Signup = (props) => {
  
  if (props.authenticated) {
    return <Navigate to="/homePage" replace />;
  }

  return (
    <div className="signup-container">
      <div className="swelcome-message"> 
        <p>
          Welcome to <strong>Bored Games</strong>!
        </p>
    </div>
      <div className="signup-content">
        <h2 className="signup-title">Signup with Bored Games</h2>
        <SocialSignup />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm {...props} />
        <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
      </div>
    </div>
  );
};

const SocialSignup = () => {
  return (
    <div className="social-signup">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={googleLogo} alt="Google" /> Sign up with Google
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={fbLogo} alt="Facebook" /> Sign up with Facebook
      </a>
      <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
        <img src={githubLogo} alt="Github" /> Sign up with Github
      </a>
    </div>
  );
};

const SignupForm = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setError('');
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting signup form...");

    if (!validatePassword(formData.password)) {
      console.log("Not Submitting signup form...");
      setError(
        'Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.'
      );
      return;
    }

    const signUpRequest = { ...formData };

    signup(signUpRequest)
      .then((response) => {
        console.log("Signup API call succeeded:", response);
        toast.success("You're successfully registered. Please login to continue!");
        navigate("/login"); 
      })
      .catch((error) => {
        console.error("Signup error:", error);
        const errorMessage = error.message || 'Oops! Something went wrong. Please try again!';
        toast.error(errorMessage);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div className="form-item">
        <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div className="form-item">
        <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;

