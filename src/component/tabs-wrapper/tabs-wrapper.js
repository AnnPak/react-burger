import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';

import styles from './tabs-wrapper.module.scss'

const TabsWrapper = ({typesOfIngredients}) => {

    const { tabsValue } = useSelector(store => store);

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

    const scrollToContainer = (type) => {
        const idSection = 'section-' + type;
        document.getElementById(idSection).scrollIntoView({top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div className={styles.tabsWrapper}>
            {typesOfIngredients &&
                typesOfIngredients.map(type => 
                    <Tab 
                        key={type} 
                        value={type} 
                        active={tabsValue === type} 
                        onClick={() => scrollToContainer(type)}>
                            
                       {getTitle(type)}
                    </Tab>
                )
            }

        </div>
    )
}

export default TabsWrapper;