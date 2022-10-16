import React from 'react'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';

import { setTabsValue} from '../../services/actions/index'

import styles from './tabs-wrapper.module.scss'

const TabsWrapper = () => {

    const { tabsValue } = useSelector(store => store);
    const dispatch = useDispatch()

    return (
        <div className={styles.tabsWrapper}>
            <Tab value="bun" active={tabsValue === 'bun'} onClick={() => dispatch(setTabsValue('bun'))}>
                Булки
            </Tab>
            <Tab value="sauce" active={tabsValue === 'sauce'} onClick={() => dispatch(setTabsValue('sauce'))}>
                Соусы
            </Tab>
            <Tab value="main" active={tabsValue === 'main'} onClick={() => dispatch(setTabsValue('main'))}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabsWrapper;