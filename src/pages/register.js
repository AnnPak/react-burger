import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { PasswordInputWrap, TextInput, EmailInputWrap } from "../component/inputs/inputs";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./login.module.scss";

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const userRegister = () => {

    }

    return (
        <section className={styles.formWrapper}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form onSubmit={userRegister}>
                <div className='pt-6'>
                    <TextInput 
                        value={name}
                        setValue={setName}
                        type="text" 
                        name="name"
                        placeholder='Имя'/>
                </div>
                <div className='pt-6'>
                    <EmailInputWrap value={email} setValue={setEmail}/>
                </div>

                <div className='pt-6'>
                    <PasswordInputWrap />
                </div>

                <div className="pt-6">
                    <Button type="primary" size="large">
                        Зарегистрироваться
                    </Button>
                </div>
                

                <div className='pt-20'>
                    <p className="text text_type_main-default text_color_inactive">
                        Уже зарегистрированы?
                        <Link to="/login"className={styles.link}>Войти</Link>
                    </p>
                </div>
            </form>
        </section>
    );
};

export default Register;
