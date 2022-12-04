import { useState, MouseEvent, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import styles from "./profile.module.scss";
import { useAppDispatch } from "../../redux/store";
import { wsActionType } from "../../redux/middleware/socket-middleware";

const ProfileNav:FC = () => {
    const [content, setContent] = useState<string | null>("profile");
    const dispatch = useAppDispatch();

    const pathname = window.location.pathname;
    const changeActiveItem = (e: MouseEvent<HTMLElement>) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
    };

    useEffect(() => {
        dispatch({ type: wsActionType.wsUserConnecting });
        return () => {
            dispatch({ type: wsActionType.wsClose });
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.navbar}>
            <Link
                to="/profile"
                className={classnames(
                    styles.navbarItem,
                    pathname.indexOf("/profile/") === -1 && styles.navbarItemActive,
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="profile"
                onClick={(e) => changeActiveItem(e)}
            >
                Профиль
            </Link>
            <Link
                to="/profile/orders"
                className={classnames(
                    styles.navbarItem,
                    pathname.indexOf("/profile/orders") > -1 && styles.navbarItemActive,
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="history"
                onClick={(e) => changeActiveItem(e)}
            >
                История заказов
            </Link>
            <Link
                className={classnames(
                    styles.navbarItem,
                    content === "logout" ? styles.navbarItemActive : "",
                    "text text_type_main-medium pt-4 pb-4"
                )}
                data-value="logout"
                to="/logout"
            >
                Выход
            </Link>
        </div>
    );
};

export default ProfileNav;
