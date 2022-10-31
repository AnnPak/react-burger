import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { getCookie } from "../../utils/cookie";
import { userRequest } from "../../store/user/user";

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
        value: "",
        isDisabled: true,
    });

    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);

    const dispatch = useDispatch();

    const changeUserData = (e) => {
        e.preventDefault();
        const accessToken = getCookie("accessToken");
        const requestHeaders = {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
        };
        const method = "PATCH";

        const requestArray = {
            name: nameInput.value,
            email: loginInput.value,
            ...(passwordInput.value ? { password: passwordInput.value } : {}),
        };
        const requestBody = JSON.stringify(requestArray);

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
        setPasswordInput((passwordInput) => ({
            ...passwordInput,
            isDisabled: !passwordInput.isDisabled,
        }));
        isBtnsHidden && setBtnsHidden(false);
    };

    const cancel = () => {
        setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
        setPasswordInput((loginInput) => ({ ...loginInput, value: "" }));
    };

    const isBtnsVisible =
        !isBtnsHidden && nameInput.isDisabled && loginInput.isDisabled && passwordInput.isDisabled;

    return (
        <form className={styles.form} onSubmit={changeUserData}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) =>
                    setInputName((nameInput) => ({ ...nameInput, value: e.target.value }))
                }
                icon={nameInput.isDisabled ? "EditIcon" : "CloseIcon"}
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
                    icon={loginInput.isDisabled ? "EditIcon" : "CloseIcon"}
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
                    type="password"
                    placeholder="Пароль"
                    onChange={(e) =>
                        setPasswordInput((passwordInput) => ({
                            ...passwordInput,
                            value: e.target.value,
                        }))
                    }
                    icon={passwordInput.isDisabled ? "EditIcon" : "CloseIcon"}
                    value={passwordInput.value}
                    disabled={passwordInput.isDisabled}
                    name="password"
                    error={false}
                    ref={passwordRef}
                    onIconClick={passwordInputActive}
                    errorText="Ошибка"
                    size="default"
                />
            </div>

            <div className={classnames(isBtnsVisible && styles.hidden, styles.btnsWrapper, "pt-5")}>
                <Button type="secondary" size="medium" htmlType="button" onClick={cancel}>
                    Отменить
                </Button>
                <Button type="primary" size="medium" htmlType="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    );
};
export default UserDataForm;
