import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailInputWrap, PasswordInputWrap } from "../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../store/user/slice";

import styles from "./login.module.scss";

const Login = () => {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userRegister = (e) => {
        e.preventDefault();
        const requestBody = JSON.stringify({ email: email, password: password });
        dispatch(loginUser(requestBody));
    };

    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Вход</p>
            <form onSubmit={userRegister}>
                <div className="pt-6">
                    <EmailInputWrap 
                        value={email} 
                        setValue={setEmail} />
                </div>

                <div className="pt-6">
                    <PasswordInputWrap 
                        value={password} 
                        setValue={setPassword} />
                </div>

                <div className="pt-6">
                    <Button 
                        type="primary" 
                        size="large" 
                        htmlType="submit">
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
                        <Link to="/reset-password" className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Login;
