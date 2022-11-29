import { useState, useEffect, FormEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { AppDispatch, RootState } from "../../store";
import { forgotPassword } from "../../store/user/password";

import styles from "../login/login.module.scss";

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState<string>("");
    const { forgotSuccess } = useSelector((store: RootState) => store.password);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(forgotPassword({ 'email': email }));
    };

    useEffect(() => {
        forgotSuccess &&
            navigate("/reset-password", { state: { prevPath: window.location.pathname } });
        // eslint-disable-next-line
    }, [forgotSuccess]);

    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={onSubmit}>
                <div className="pt-6">
                    <EmailInput
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name={"email"}
                    />
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large" htmlType="submit">
                        Восстановить
                    </Button>
                </div>

                <div className="pt-20">
                    <p className="text text_type_main-default text_color_inactive pt-4">
                        Вспомнили пароль?
                        <Link to="/login" className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default ForgotPassword;
