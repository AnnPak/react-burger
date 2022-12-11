import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Preloader from "../../component/preloader/preloader";
import { logoutUser } from "../../redux/store/user/logout";
import { useAppDispatch } from "../../redux/store";

const LogoutPage: FC = () => {
    const isLoggedIn = localStorage.getItem("isUserLogged");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    useEffect(() => {
        if (isLoggedIn === "true") {
            localStorage.setItem("isUserLogged", "false");
            const refreshToken = localStorage.getItem("refreshToken");

            refreshToken &&
                dispatch(logoutUser({ token: refreshToken }))
                    .then(() => navigate("/login", { state: { form: location } }))
                    .catch(() => navigate(from, { state: { form: location } }));
        }
    }, []);

    return <Preloader/>;
};

export default LogoutPage;
