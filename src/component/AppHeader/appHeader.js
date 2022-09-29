import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import LinkItem from '../LinkItem/LinkItem'

import './appHeader.scss';

const Navbar = () => {
    return (
        <nav className='mt-4'>
            <div className='navbar-item'>
                <LinkItem class='navbar-item__link mr-2 p-4 pl-0 navbar-item__link_active'>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </LinkItem>
                <LinkItem class='navbar-item__link mr-2 p-4 active'>
                    <ListIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </LinkItem>
            </div>

            <div>
                <LinkItem class='navbar-item__link mr-2 p-4 active'>
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                </LinkItem>
            </div>
        </nav>
    )
}

const AppHeader = () => {
    return (
        <header className='header'>
            <div className='pt-5 pb-5'>
                <Logo />
            </div>
            <Navbar />
        </header>
    )
}

export default AppHeader;
