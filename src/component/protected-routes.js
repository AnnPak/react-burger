import { Navigate } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookie";

export function ProtectedUserRoute({ children }) {
    const isUserLogged = getCookie("isUserLogged");
    console.log(isUserLogged)
    return isUserLogged === "true" ? children : <Navigate to="/login" />;
}

export function ProtectedGuestRoute({Element}) {
    const isUserLogged = getCookie("isUserLogged");
    console.log(isUserLogged)

    return isUserLogged === "false" || !isUserLogged? Element : <Navigate to="/" />
}
