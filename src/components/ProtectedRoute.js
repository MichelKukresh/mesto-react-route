import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, loggedIn}) => {    
    if (loggedIn) {
        return children;
    }

    return <Navigate to="/sign-in"/>
}

export default ProtectedRoute;