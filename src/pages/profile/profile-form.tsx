import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";

import { getCookie } from "../../utils/cookie";
import { userRequest } from "../../store/user/user";
import { useForm } from "../../hooks/useForm";

import styles from "./profile.module.scss";

const UserDataForm = () => {
    const { user } = useSelector((store: any) => store.user);
    const [isBtnsHidden, setBtnsHidden] = useState<boolean>(true);
    const {values, setFieldValue, setFieldDisabled, disableValue} = useForm({
        initialValues: {
            name: '',
            login: '',
            password: '',
        },
        disableRules: {
            name: true,
            password: true,
            login: true,
        },
    });

    const dispatch = useDispatch<any>();

    const onSubmit = (e: FormEvent ) => {
        e.preventDefault();

        setBtnsHidden(true);
        setFieldDisabled({name: true, password: true, login: true })

        const options: RequestInit = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${getCookie("accessToken")}`,
            },
            body: JSON.stringify(values),
        };

        dispatch(userRequest(options)); //изменение данных пользователя
    };

    useEffect(() => {
        user && setFieldValue({...values, login: user.email, name: user.name} );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        Object.values(disableValue).includes(false) ? setBtnsHidden(false) : setBtnsHidden(true)
    },[disableValue])

    const cancel = () => {
        setFieldValue({login: user.email, name: user.name, password: ''})
        setFieldDisabled({name: true, password: true, login: true })
        setBtnsHidden(true);
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => setFieldValue({...values, name: e.currentTarget.value})}
                icon={disableValue.name ? "EditIcon" : "CloseIcon"}
                value={values.name}
                disabled={disableValue.name}
                name={"name"}
                error={false}
                onIconClick={(e) => setFieldDisabled({...values, name: !disableValue.name})}
                errorText={"Ошибка"}
                size={"default"}
            />
            <div className="pt-6">
                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) => setFieldValue({...values, login: e.currentTarget.value})}
                    icon={disableValue.login ? "EditIcon" : "CloseIcon"}
                    value={values.login}
                    name={"login"}
                    disabled={disableValue.login}
                    error={false}
                    onIconClick={(e) => setFieldDisabled({...values, login: !disableValue.login})}
                    errorText={"Ошибка"}
                    size={"default"}
                />
            </div>
            
            <div className="pt-6">
                <Input
                    type="password"
                    placeholder="Пароль"
                    onChange={(e) => setFieldValue({...values, password: e.currentTarget.value})}
                    icon={disableValue.password ? "EditIcon" : "CloseIcon"}
                    value={values.password}
                    disabled={disableValue.password}
                    name="password"
                    error={false}
                    onIconClick={(e) => setFieldDisabled({...values, password: !disableValue.password})}
                    errorText="Ошибка"
                    size="default"
                />
            </div>

            <div className={classnames(isBtnsHidden && styles.hidden, styles.btnsWrapper, "pt-5")}>
                <Button type="secondary" size="medium" htmlType="button" onClick={cancel}>
                    Отменить
                </Button>
                <Button type="primary" size="medium" htmlType="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    );
};
export default UserDataForm;
