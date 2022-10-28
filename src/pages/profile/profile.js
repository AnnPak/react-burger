import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { getUser, refreshToken } from "../../store/user/user";

import styles from "./profile.module.scss";
import { logoutUser } from "../../store/user/logout";

const Profile = () => {
    const [content, setContent] = useState("profile");
    const { jwtExpired, user } = useSelector((store) => store.user);
    const logoutSuccess = useSelector((store) => store.logout);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeActiveItem = (e) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
    };

    useEffect(() => {
        if (jwtExpired) {
            dispatch(refreshToken());
            dispatch(getUser());
        } else {
            dispatch(getUser());
        }
        // eslint-disable-next-line
    }, []);


    const userLogout = () => {
        const refreshToken = getCookie("refreshToken");

        if (user) {
            const requestBody = JSON.stringify({ token: refreshToken });

            dispatch(logoutUser(requestBody));
            navigate("/");
        }

    };

    return (
        <section className={styles.profilePage}>
            <div className={styles.navbar}>
                <div
                    className={classnames(
                        styles.navbarItem,
                        content === "profile" ? styles.navbarItemActive : "",
                        "text text_type_main-medium pt-4 pb-4"
                    )}
                    data-value="profile"
                    onClick={(e) => changeActiveItem(e)}
                >
                    Профиль
                </div>
                <div
                    className={classnames(
                        styles.navbarItem,
                        content === "history" ? styles.navbarItemActive : "",
                        "text text_type_main-medium pt-4 pb-4"
                    )}
                    data-value="history"
                    onClick={(e) => changeActiveItem(e)}
                >
                    История заказов
                </div>
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
            {content === "profile" && <ChangeProfileDateForm />}
            {content === "history" && "История заказов"}
        </section>
    );
};

const ChangeProfileDateForm = () => {
    const { user } = useSelector((store) => store.user);

    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setLogin(user.email);
        }
    }, [user]);

    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    const nameChange = () => {
        alert(nameRef.current.value);
    };

    const loginChange = () => {
        alert(loginRef.current.value);
    };

    const passwordChange = () => {
        alert(passwordRef.current.value);
    };

    return (
        <div className={styles.form}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => setName(e.target.value)}
                icon={"EditIcon"}
                value={name}
                name={"name"}
                error={false}
                ref={nameRef}
                onIconClick={nameChange}
                errorText={"Ошибка"}
                size={"default"}
            />
            <div className="pt-6">
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) => setLogin(e.target.value)}
                    icon={"EditIcon"}
                    value={login}
                    name={"login"}
                    error={false}
                    ref={loginRef}
                    onIconClick={loginChange}
                    errorText={"Ошибка"}
                    size={"default"}
                />
            </div>
            <div className="pt-6">
                <Input
                    type={"text"}
                    placeholder={"Пароль"}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={"EditIcon"}
                    value={password}
                    name={"password"}
                    error={false}
                    ref={passwordRef}
                    onIconClick={passwordChange}
                    errorText={"Ошибка"}
                    size={"default"}
                />
            </div>
        </div>
    );
};
export default Profile;
