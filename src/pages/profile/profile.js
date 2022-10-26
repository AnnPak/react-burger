import React, { useState, useRef } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import styles from "./profile.module.scss";

const Profile = () => {
    const [content, setContent] = useState("profile");

    const changeActiveItem = (e) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
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
                    onClick={(e) => changeActiveItem(e)}
                >
                    Выход
                </div>
            </div>
            {content === "profile" && <ChangeProfileDateForm />}
            {content === "history" && "История заказов"}
            {content === "logout" && "Выход"}
        </section>
    );
};

const ChangeProfileDateForm = () => {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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
