import React from 'react'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './tabs-wrapper.module.scss'

const TabsWrapper = ({current, setCurrent}) => {
    
    return (
        <div className={styles.tabsWrapper}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

TabsWrapper.propTypes = {
    current:  PropTypes.string.isRequired,
    setCurrent:  PropTypes.func.isRequired,
};

export default TabsWrapper;