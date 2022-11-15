import { Navigate } from "react-router-dom";

export function ProtectedUserRoute({ children }) {
    const isUserLogged = localStorage.getItem("isUserLogged");

    return isUserLogged === "true" ? children : <Navigate to="/login" />;
}

export function ProtectedGuestRoute({Element}) {
    const isUserLogged = localStorage.getItem("isUserLogged");

    return isUserLogged === "false" || !isUserLogged ? Element : <Navigate to="/" />
}

