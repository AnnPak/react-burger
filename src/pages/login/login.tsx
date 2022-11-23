import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    Button,
    InfoIcon,
    PasswordInput,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../store/user/user";

import styles from "./login.module.scss";

const Login = () => {
    const [email, setEmail] = useState<string>(" ");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const userRegister = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email: email, password: password }))
            .then((data: any) => {
                console.log(data);
                if (data.payload.success) {
                    navigate("/");
                } else {
                    throw new Error("throw an error");
                }
            })
            .catch(() => {
                setIsError(true);
            });
    };

    useEffect(() => {
        if (isError) {
            const setErrorTimeout = setTimeout(() => setIsError(false), 5000);
            return () => {
                clearTimeout(setErrorTimeout);
            };
        }

        // eslint-disable-next-line
    }, [isError]);

    return (
        <>
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
