import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { ACCESS_TOKEN } from '../constants/index.js';

const OAuth2RedirectHandler = (props) => {
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        return <Navigate to="/profile" state={{ from: props.location }} />;
    } else {
        return <Navigate to="/login" state={{ from: props.location, error }} />;
    }
};

export default OAuth2RedirectHandler;
