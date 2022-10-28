import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export function ProtectedUserRoute ({ children }) {
    const accessToken = getCookie('refreshToken');

    return accessToken ? children : <Navigate to='/login' />;
}

export function ProtectedGuestRoute({ children }) {
    const accessToken = getCookie('refreshToken');

    return accessToken ? <Navigate to='/' /> : children;
}
