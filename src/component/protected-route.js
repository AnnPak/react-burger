import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export function ProtectedRoute({ children }) {
    const accessToken = getCookie('accessToken');

    return accessToken ? children : <Navigate to='/login' />;
}
