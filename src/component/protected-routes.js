import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export function ProtectedUserRoute({ children }) {
    const isUserLogged = getCookie("isUserLogged");

    return isUserLogged === "true" ? children : <Navigate to="/login" />;
}

export function ProtectedGuestRoute({Element}) {
    const isUserLogged = getCookie("isUserLogged");
    return !isUserLogged ? Element : <Navigate to="/" />
}
