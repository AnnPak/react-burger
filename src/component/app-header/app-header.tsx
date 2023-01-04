import classnames from "classnames";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.scss";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="mt-4">
            <div className={styles.navbarItem}>
                <NavLink
                     className={({ isActive }) =>
                     classnames("mr-2 p-4 pl-0",
                     styles.navbarItemLink,
                     (isActive && styles.navbarItemLinkActive))
                 }
                    to="/"
                    end
                >
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        classnames("mr-2 p-4 pl-0",
                        styles.navbarItemLink,
                        (isActive && styles.navbarItemLinkActive))
                    }
                    to="/feed"
                >
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </NavLink>
            </div>

            <div className={styles.navbarItem}>
                <NavLink
                    className={({ isActive }) =>
                    classnames("mr-2 p-4 pl-0",
                    styles.navbarItemLink,
                    (isActive && styles.navbarItemLinkActive))
                }
                    to="/profile"
                >
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </NavLink>
            </div>
        </nav>
    );
};

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={classnames("pt-5 pb-5", styles.homeLink)}>
                <Logo />
            </Link>
            <Navbar />
        </header>
    );
};

export default AppHeader;
