import { useState, useEffect, FormEvent, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    InfoIcon,
    Input,
    PasswordInput,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { registerUser } from "../../redux/store/user/register";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "../login/login.module.scss";

const Register:FC = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const { registerSuccess } = useAppSelector((store: RootState) => store.register);

    const dispatch = useAppDispatch());
    const navigate = useNavigate();
    const userRegister = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            registerUser({
                email: email,
                password: password,
                name: name,
            })
        );
    };

    useEffect(() => {
        registerSuccess && navigate("/");
        registerSuccess === false && setIsError(true);

        const setErrorTimeout = setTimeout(() => setIsError(false), 5000);
        return () => {
            clearTimeout(setErrorTimeout);
        };
        // eslint-disable-next-line
    }, [registerSuccess]);

    return (
        <>
            <section className={styles.formWrapper}>
                {isError && (
                    <div className={styles.errorMessage}>
                        <InfoIcon type="error" />
                        Ошибка!
                    </div>
                )}
                <p className="text text_type_main-medium">Регистрация</p>
                <form onSubmit={userRegister}>
                    <div className="pt-6">
                        <Input
                            value={name}
                            type="text"
                            name="name"
                            placeholder="Имя"
                            onChange={(e) => setName(e.target.value)}
                            errorText={"Ошибка"}
                            size={"default"}
                        />
                    </div>
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
                        <Button htmlType="submit" type="primary" size="large">
                            Зарегистрироваться
                        </Button>
                    </div>

                    <div className="pt-20">
                        <p className="text text_type_main-default text_color_inactive">
                            Уже зарегистрированы?
                            <Link to="/login" className={styles.link}>
                                Войти
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
