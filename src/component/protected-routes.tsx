import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TProtectedRoute } from "../utils/types";

export const  ProtectedRoute: FC<TProtectedRoute> = ({ element, anonymous = false }) => {
    const isLoggedIn = localStorage.getItem("isUserLogged");

    const location = useLocation();
    const from = location.state?.from || '/';
    
    if (anonymous && isLoggedIn) {
      return <Navigate to={ from } />;
    }
  
    if (!anonymous && !isLoggedIn) {
      return <Navigate to="/login" state={{ from: location}}/>;
    }
  
    return element;
  }
