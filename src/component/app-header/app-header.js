import React from 'react'
import classnames from 'classnames';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import LinkItem from '../link-item/link-item'

import styles from './app-header.module.scss';

const Navbar = () => {
    return (
        <nav className='mt-4'>
            <div className={styles.navbarItem}>
                <LinkItem class={classnames(styles.navbarItemLink, styles.navbarItemLinkActive, 'mr-2 p-4 pl-0')}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </LinkItem>
                <LinkItem class={classnames(styles.navbarItemLink, 'mr-2 p-4 pl-0 active')}>
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </LinkItem>
            </div>

            <div className={styles.navbarItem}>
                <LinkItem class={classnames(styles.navbarItemLink, 'mr-2 p-4 pl-0 active')}>
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </LinkItem>
            </div>
        </nav>
    )
}

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className='pt-5 pb-5'>
                <Logo />
            </div>
            <Navbar />
        </header>
    )
}

export default AppHeader;
