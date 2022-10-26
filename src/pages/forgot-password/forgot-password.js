import { Link } from "react-router-dom";
import { TextInput, PasswordInputWrap } from "../../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/login.module.scss";

const ForgotPassword = () => {
    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form>
                <div className="pt-6">
                    <PasswordInputWrap />
                </div>
                <div className="pt-6">
                    <TextInput 
                        type='text' 
                        name='code' 
                        placeholder='Введите код из письма'/>
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large">
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

export default ForgotPassword;
