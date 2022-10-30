import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { getCookie } from "../../utils/cookie";
import { userRequest, refreshToken } from "../../store/user/user";

import styles from "./profile.module.scss";

const UserDataForm = () => {
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
    const [passwordInput, setPasswordInput] = useState({
        value: " ",
        isDisabled: true,
    });

    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const requestHeaders = {
            "Content-Type": "application/json",
            Authorization: getCookie("accessToken"),
        };
        const token = getCookie("refreshToken");
        
        // Запрос данных пользователя
        dispatch(userRequest({ headers: requestHeaders, method: "GET" })).then((data) => {
            //если срок действия токена истек
            if (data.payload.message === "jwt expired") {
                dispatch(refreshToken(token)).then((data) => {
                    console.log(data.payload.accessToken);
                    const requestHeaders = {
                        "Content-Type": "application/json",
                        Authorization: data.payload.accessToken,
                    };
                    //запрос данных пользователя с новым токеном
                    dispatch(userRequest({ headers: requestHeaders, method: "GET" }));
                });
            }
        });
        // eslint-disable-next-line
    }, []);

    const changeUserData = (e) => {
        e.preventDefault();
        const accessToken = getCookie("accessToken");
        const requestHeaders = {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        };
        const method = "PATCH";
        const requestBody = JSON.stringify({ name: nameInput.value, email: loginInput.value });

        dispatch(userRequest({ headers: requestHeaders, method, body: requestBody })); //изменение данных пользователя
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
    const passwordInputActive = () => {
        passwordRef.current.disabled = false;
    };

    const cancel = () => {
        setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
    };

    return (
        <form className={styles.form} onSubmit={changeUserData}>
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
                    onChange={(e) => setPasswordInput(e.target.value)}
                    icon={"EditIcon"}
                    value={passwordInput.value}
                    disabled={true}
                    name={"password"}
                    error={false}
                    ref={passwordRef}
                    onIconClick={passwordInputActive}
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
export default UserDataForm;
