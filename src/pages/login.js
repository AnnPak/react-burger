import { Link } from "react-router-dom";
import { Emailnput, PasswordInputWrap } from "../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login.module.scss";

const Login = () => {
    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Вход</p>
            <form>
                <div className='pt-6'>
                    <Emailnput />
                </div>

                <div className='pt-6'>
                    <PasswordInputWrap />
                </div>


                <div className="pt-6">
                    <Button type="primary" size="large">
                        Войти
                    </Button>
                </div>
                

                <div className='pt-20'>
                    <p className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                        <Link className={styles.link}>Зарегистрироваться</Link>
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                        <Link className={styles.link}>Восстановить пароль</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Login;
