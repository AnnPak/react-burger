import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EmailInputWrap } from "../../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/login.module.scss";
import { forgotPassword } from "../../store/user/password";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotSuccess } = useSelector((store) => store.password);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const requestBody = JSON.stringify({ email: email });
        dispatch(forgotPassword(requestBody));
    };

    useEffect(() => {
        forgotSuccess && navigate("/reset-password");
    }, [forgotSuccess]);

    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={onSubmit}>
                <div className="pt-6">
                    <EmailInputWrap value={email} setValue={setEmail} />
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
