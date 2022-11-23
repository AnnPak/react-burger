import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import styles from "./profile.module.scss";

const ProfileNav = () => {
    const [content, setContent] = useState<string|null>("profile");

    const pathname = window.location.pathname;
    const changeActiveItem = (e: MouseEvent<HTMLElement>) => {
        const navbarValue = e.currentTarget.getAttribute("data-value");
        setContent(navbarValue);
    };

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
                to='/logout'
            >
                Выход
            </Link>
        </div>
    );
};

export default ProfileNav;
