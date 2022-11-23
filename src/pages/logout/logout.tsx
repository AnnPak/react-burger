import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Preloader from "../../component/preloader/preloader";
import { logoutUser } from "../../store/user/logout";

const LogoutPage = () => {
    const isLoggedIn = localStorage.getItem("isUserLogged");

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn === "true") {
            localStorage.setItem("isUserLogged", "false");
            const refreshToken = localStorage.getItem("refreshToken");

            refreshToken && dispatch(logoutUser({ token: refreshToken }));

            navigate("/login", { state: { form: location } });
        }
    }, []);

    return <Navigate to="/login" />;
};

export default LogoutPage;
