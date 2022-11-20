import { FC } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
    onlyUnAuth: boolean;
    element: JSX.Element;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyUnAuth, element }) => {
    const isUserLogged = localStorage.getItem("isUserLogged");

    if (onlyUnAuth) {
        return isUserLogged === "true" ? element : <Navigate to="/login" />;
    } else {
        return isUserLogged === "false" || !isUserLogged ? element : <Navigate to="/" />;
    }
};
