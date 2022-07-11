import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, loggedIn}) => {    
    if (loggedIn) {
        return children;
    }

    return <Navigate to="/sign-up"/>
}

export default ProtectedRoute;