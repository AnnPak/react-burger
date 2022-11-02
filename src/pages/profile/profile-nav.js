import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import classnames from "classnames";

import { fetchRefresh } from "../../store/user/user";
import { getCookie } from "../../utils/cookie";
import { logoutUser } from "../../store/user/logout";

import styles from "./profile.module.scss";

const ProfileNav = () => {
    const [content, setContent] = useState("profile");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    useEffect(() => {

        const options = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: getCookie("accessToken"),
            },
            body: null,
        }

        dispatch(fetchRefresh(options))
        // eslint-disable-next-line
    }, []);

    const changeActiveItem = (e) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
    };

    const userLogout = () => {
        const refreshToken = getCookie("refreshToken");
        const requestBody = JSON.stringify({ token: refreshToken });

        dispatch(logoutUser(requestBody)).then(() => navigate("/login"));
    };

    return (
        <div className={styles.navbar}>
            <Link
                to="/profile"
                className={classnames(
                    styles.navbarItem,
                    pathname.indexOf("/profile/") === -1 && styles.navbarItemActive,
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="profile"
                onClick={(e) => changeActiveItem(e)}
            >
                Профиль
            </Link>
            <Link
                to="/profile/orders"
                className={classnames(
                    styles.navbarItem,
                    pathname.indexOf("/profile/orders") > -1 && styles.navbarItemActive ,
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="history"
                onClick={(e) => changeActiveItem(e)}
            >
                История заказов
            </Link>
            <div
                className={classnames(
                    styles.navbarItem,
                    content === "logout" ? styles.navbarItemActive : "",
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="logout"
                onClick={userLogout}
            >
                Выход
            </div>
        </div>
    );
};

export default ProfileNav;
