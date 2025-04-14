import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, element, ...rest }) => {
  return authenticated
    ? React.cloneElement(element, { ...rest, authenticated }) 
    : <Navigate to="/login" />;
};

export default PrivateRoute;

