import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { getCookie } from "../../utils/cookie";
import { logoutUser } from "../../store/user/logout";
import { userRequest, refreshToken } from "../../store/user/user";

import styles from "./profile.module.scss";

const Profile = () => {
    const [content, setContent] = useState("profile");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeActiveItem = (e) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
    };

    useEffect(() => {
        const requestHeaders = {
            "Content-Type": "application/json",
            Authorization: `${getCookie("accessToken")}`,
        };
        const requestBody = JSON.stringify({ token: getCookie("refreshToken") });

        dispatch(userRequest({ headers: requestHeaders, method: "GET" })).then((data) => {
            if (data.payload.message === "jwt expired") {
                dispatch(refreshToken({ body: requestBody, method: "POST" })).then(() =>
                    dispatch(userRequest({ headers: requestHeaders, method: "GET" }))
                );
            }
        });
        // eslint-disable-next-line
    }, []);

    const userLogout = () => {
        const refreshToken = getCookie("refreshToken");
        const requestBody = JSON.stringify({ token: refreshToken });

        dispatch(logoutUser(requestBody));
        navigate("/");
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

    const [isBtnsHidden, setBtnsHidden] = useState(true);
    const [nameInput, setInputName] = useState({
        value: "",
        isDisabled: true,
    });
    const [loginInput, setInputLogin] = useState({
        value: "",
        isDisabled: true,
    });
    const [password, setPassword] = useState(" ");

    const dispatch = useDispatch();

    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const accessToken = getCookie("accessToken");
        const requestHeaders = {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        };
        const method = "PATCH";

        const requestBody = JSON.stringify({ name: nameInput.value, email: loginInput.value });
        dispatch(userRequest({ headers: requestHeaders, method, body: requestBody }));
    };

    useEffect(() => {
        user && setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        user && setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
    }, [user]);

    const nameInputActive = () => {
        setInputName((nameInput) => ({ ...nameInput, isDisabled: !nameInput.isDisabled }));
        isBtnsHidden && setBtnsHidden(false);
    };

    const loginInputActive = () => {
        setInputLogin((loginInput) => ({ ...loginInput, isDisabled: !loginInput.isDisabled }));
        isBtnsHidden && setBtnsHidden(false);
    };
    const passwordChange = () => {
        passwordRef.current.disabled = false;
    };

    const cancel = () => {
        setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) =>
                    setInputName((nameInput) => ({ ...nameInput, value: e.target.value }))
                }
                icon={"EditIcon"}
                value={nameInput.value}
                disabled={nameInput.isDisabled}
                name={"name"}
                error={false}
                ref={nameRef}
                onIconClick={nameInputActive}
                errorText={"Ошибка"}
                size={"default"}
            />
            <div className="pt-6">
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) =>
                        setInputLogin((loginInput) => ({ ...loginInput, value: e.target.value }))
                    }
                    icon={"EditIcon"}
                    value={loginInput.value}
                    name={"login"}
                    disabled={loginInput.isDisabled}
                    error={false}
                    ref={loginRef}
                    onIconClick={loginInputActive}
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
                    disabled={true}
                    name={"password"}
                    error={false}
                    ref={passwordRef}
                    onIconClick={passwordChange}
                    errorText={"Ошибка"}
                    size={"default"}
                />
            </div>

            <div className={classnames(isBtnsHidden && styles.hidden, styles.btnsWrapper, "pt-5")}>
                <Button type="primary" size="small" htmlType="submit">
                    Сохранить
                </Button>
                <Button type="primary" size="small" htmlType="button" onClick={cancel}>
                    Отменить
                </Button>
            </div>
        </form>
    );
};
export default Profile;
