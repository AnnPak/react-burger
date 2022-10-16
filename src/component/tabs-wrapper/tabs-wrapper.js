import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';

import styles from './tabs-wrapper.module.scss'

const TabsWrapper = () => {

    const { tabsValue, typesOfIngredients } = useSelector(store => store);

    const getTitle = (type) => {
        switch (type) {
            case 'bun':
                return 'Булки';
            case 'sauce':
                return 'Соусы';
            case 'main':
                return 'Начинки';
            default:
        }
    }


    return (
        <div className={styles.tabsWrapper}>
            {
                typesOfIngredients.map(type => 
                    <Tab 
                        key={type} 
                        value={type} 
                        active={tabsValue === type} 
                        // onClick={() => dispatch(setTabsValue(type))}
                        >
                            
                       {getTitle(type)}
                    </Tab>
                )
            }

        </div>
    )
}

export default TabsWrapper;