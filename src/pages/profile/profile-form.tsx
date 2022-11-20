import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { getCookie } from "../../utils/cookie";
import { userRequest } from "../../store/user/user";
import { TProfileFormInput } from "../../utils/types";

import styles from "./profile.module.scss";

const UserDataForm = () => {
    const { user } = useSelector((store: any) => store.user);
    const [isBtnsHidden, setBtnsHidden] = useState<boolean>(true);
    const [nameInput, setInputName] = useState<TProfileFormInput>({
        value: "",
        isDisabled: true,
    });
    const [loginInput, setInputLogin] = useState<TProfileFormInput>({
        value: "",
        isDisabled: true,
    });
    const [passwordInput, setPasswordInput] = useState<TProfileFormInput>({
        value: "",
        isDisabled: true,
    });

    const dispatch = useDispatch<any>();

    const changeUserData = (e: any) => {
        e.preventDefault();
        setBtnsHidden(true);

        const accessToken = getCookie("accessToken");
        const requestHeaders: HeadersInit | undefined = {
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

        setPasswordInput((passwordInput) => ({
            ...passwordInput,
            isDisabled: true,
        }));
        setInputName((nameInput) => ({ ...nameInput, isDisabled: true }));
        setInputLogin((loginInput) => ({ ...loginInput, isDisabled: true }));

        dispatch(userRequest(requestHeaders, method, requestBody)); //изменение данных пользователя
    };

    useEffect(() => {
        user && setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        user && setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
    }, [user]);

    const nameInputActive = () => {
        setInputName((nameInput) => ({ ...nameInput, isDisabled: !nameInput.isDisabled }));
    };

    const loginInputActive = () => {
        setInputLogin((loginInput) => ({ ...loginInput, isDisabled: !loginInput.isDisabled }));
    };
    const passwordInputActive = () => {
        setPasswordInput((passwordInput) => ({
            ...passwordInput,
            isDisabled: !passwordInput.isDisabled,
        }));
    };

    const activateBtns = () => {
        isBtnsHidden && setBtnsHidden(false);
    };

    const cancel = () => {
        setInputName((nameInput) => ({ ...nameInput, value: user.name }));
        setInputLogin((loginInput) => ({ ...loginInput, value: user.email }));
        setPasswordInput((loginInput) => ({ ...loginInput, value: "" }));
        setBtnsHidden(true);

        setPasswordInput((passwordInput) => ({
            ...passwordInput,
            isDisabled: true,
        }));
        setInputName((nameInput) => ({ ...nameInput, isDisabled: true }));
        setInputLogin((loginInput) => ({ ...loginInput, isDisabled: true }));
    };

    return (
        <form className={styles.form} onSubmit={changeUserData}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => {
                    setInputName((nameInput) => ({ ...nameInput, value: e.target.value }));
                    activateBtns();
                }}
                icon={nameInput.isDisabled ? "EditIcon" : "CloseIcon"}
                value={nameInput.value}
                disabled={nameInput.isDisabled}
                name={"name"}
                error={false}
                onIconClick={nameInputActive}
                errorText={"Ошибка"}
                size={"default"}
            />
            <div className="pt-6">
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) => {
                        setInputLogin((loginInput) => ({ ...loginInput, value: e.target.value }));
                        activateBtns();
                    }}
                    icon={loginInput.isDisabled ? "EditIcon" : "CloseIcon"}
                    value={loginInput.value}
                    name={"login"}
                    disabled={loginInput.isDisabled}
                    error={false}
                    onIconClick={loginInputActive}
                    errorText={"Ошибка"}
                    size={"default"}
                />
            </div>
            <div className="pt-6">
                <Input
                    type="password"
                    placeholder="Пароль"
                    onChange={(e) => {
                        setPasswordInput((passwordInput) => ({
                            ...passwordInput,
                            value: e.target.value,
                        }));
                        activateBtns();
                    }}
                    icon={passwordInput.isDisabled ? "EditIcon" : "CloseIcon"}
                    value={passwordInput.value}
                    disabled={passwordInput.isDisabled}
                    name="password"
                    error={false}
                    onIconClick={passwordInputActive}
                    errorText="Ошибка"
                    size="default"
                />
            </div>

            <div className={classnames(isBtnsHidden && styles.hidden, styles.btnsWrapper, "pt-5")}>
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
