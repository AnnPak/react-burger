import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { EmailInputWrap, PasswordInputWrap } from "../../component/inputs/inputs";
import { Button, InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../store/user/login";

import styles from "./login.module.scss";

const Login = () => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const { loginSuccess } = useSelector((store) => store.login);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userRegister = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({ email: email, password: password });
        dispatch(loginUser(requestBody));
    };

    useEffect(() => {
        loginSuccess && navigate("/");
        loginSuccess === false && setIsError(true);

        const setErrorTimeout = setTimeout(() => setIsError(false), 5000);
        return () => {
            clearTimeout(setErrorTimeout);
        };

        // eslint-disable-next-line
    }, [loginSuccess]);

    return (
        <section className={styles.formWrapper}>
            {isError && (
                <div className={styles.errorMessage}>
                    <InfoIcon type="error" />
                    Ошибка! Проверьте введенные данные
                </div>
            )}
            <p className="text text_type_main-medium">Вход</p>
            <form onSubmit={userRegister}>
                <div className="pt-6">
                    <EmailInputWrap value={email} setValue={setEmail} />
                </div>

                <div className="pt-6">
                    <PasswordInputWrap value={password} setValue={setPassword} />
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large" htmlType="submit">
                        Войти
                    </Button>
                </div>

                <div className="pt-20">
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                        <Link to="/register" className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive pt-4">
                        Забыли пароль?
                        <Link to="/forgot-password" className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Login;
