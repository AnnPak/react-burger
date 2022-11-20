import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    Button,
    InfoIcon,
    PasswordInput,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../store/user/login";

import styles from "./login.module.scss";
import AppHeader from "../../component/app-header/app-header";

const Login = () => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const { loginSuccess } = useSelector((store: any) => store.login);

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const userRegister = (e:any) => {
        e.preventDefault();

        const requestBody:string = JSON.stringify({ email: email, password: password });
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
        <>
            <AppHeader />
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
                        <EmailInput
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name={"email"}
                        />
                    </div>

                    <div className="pt-6">
                        <PasswordInput
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name={"password"}
                        />
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
        </>
    );
};

export default Login;
