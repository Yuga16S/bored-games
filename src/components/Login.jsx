import React, { useEffect, useState } from 'react';
import '../Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../constants/index.js';
import { login } from '../util/APIUtils.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import fbLogo from '../assets/fb-logo.png';
import googleLogo from '../assets/google-logo.png';
import githubLogo from '../assets/github-logo.png';
import { toast } from 'react-toastify';

const Login = ({ authenticated, setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.error) {
      setTimeout(() => {
        console.error("from useEffect error", location.state.error, { timeout: 5000 });
        toast.error(location.state.error, { autoClose: 5000 });
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (authenticated) {
      navigate('/homePage', { state: { from: location } });
    }
  }, [authenticated, navigate, location]);

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Login to Bored Games</h2>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm setAuthenticated={setAuthenticated}/>
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
};

const SocialLogin = () => (
  <div className="social-login">
    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
      <img src={googleLogo} alt="Google" /> Log in with Google
    </a>
    <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
      <img src={fbLogo} alt="Facebook" /> Log in with Facebook
    </a>
    <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
      <img src={githubLogo} alt="Github" /> Log in with Github
    </a>
  </div>
);

const LoginForm = ( {setAuthenticated} ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = { email, password };

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast.success("You're successfully logged in!");
        console.log("success going to homepage");
        setAuthenticated(true);
        navigate('/homePage', { replace: true }); // replace doesnt allow logged in users to goback to login page when they click back. 
      })
      .catch((error) => {
        console.error("Login error:", error);
       toast.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
