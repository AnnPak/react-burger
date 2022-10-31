import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, PasswordInputWrap } from "../../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/login.module.scss";
import { resetPassword } from "../../store/user/password";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const { resetSuccess } = useSelector((store) => store.password);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        location?.state?.prevPath !== "/forgot-password" && navigate("/"); //редирект со страницы, если перешли не с /forgot-password
        // eslint-disable-next-line
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const requestBody = JSON.stringify({ password: password, token: code });
        dispatch(resetPassword(requestBody));
    };

    useEffect(() => {
        resetSuccess && navigate("/login");
        // eslint-disable-next-line
    }, [resetSuccess]);

    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form onSubmit={onSubmit}>
                <div className="pt-6">
                    <PasswordInputWrap value={password} setValue={setPassword} />
                </div>
                <div className="pt-6">
                    <TextInput
                        type="text"
                        name="code"
                        placeholder="Введите код из письма"
                        value={code}
                        setValue={setCode}
                    />
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large" htmlType="submit">
                        Сохранить
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

export default ResetPassword;
