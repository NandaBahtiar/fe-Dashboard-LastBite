import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth.js";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();
    

    // You might want to add more sophisticated logic here
    // For example, checking if the user is actually logged in from Redux state
    // For now, we'll assume useAuthCheck handles redirection if not authenticated

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;