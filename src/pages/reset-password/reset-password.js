import { Link } from "react-router-dom";
import { EmailInputWrap } from "../../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../login/login.module.scss";

const ResetPassword = () => {
    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <form>
                <div className='pt-6'>
                    <EmailInputWrap />
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large">
                        Восстановить
                    </Button>
                </div>
                
                <div className='pt-20'>

                    <p className="text text_type_main-default text_color_inactive pt-4">
                        Вспомнили пароль?
                        <Link to="/login" className={styles.link}>Войти</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default ResetPassword;
