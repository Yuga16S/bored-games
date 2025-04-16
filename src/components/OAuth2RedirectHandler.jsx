import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import { ACCESS_TOKEN } from '../constants/index.js';

const OAuth2RedirectHandler = ({  setAuthenticated  }) => {
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        setAuthenticated(true);
        return <Navigate to="/homePage"  />;
    } else {
        return <Navigate to="/login" state={{ from: location, error }} />;
    }
};

export default OAuth2RedirectHandler;
