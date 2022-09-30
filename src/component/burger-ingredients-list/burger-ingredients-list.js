import React from 'react'
import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsSection = ({ data, type }) => {

    const filtedIngredientsArray = data.filter(item => item.type === type);
    let title;

    switch(type){
        case 'bun':
            title = 'Булки';
            break;
        case 'sauce':
            title = 'Соусы';
            break;
        case 'main':
            title = 'Начинки';
            break;
        default: 
    } 

    return (
        <section key={type}>
            <h3 className={styles.ingredientsTitle}>{title}</h3>

            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map(item =>  <BurgerIngredientsItem item={item} key={item.id} />)}
            </div>
        </section>

    )
}

const BurgerIngredientsItem = ({ item }) => {

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')}>
            <img src={item.image} alt={item.name}/>
            
            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{item.name}</p>

        </div>
    )
}

const BurgerIngredientsList = ({ data }) => {

    return (
        <section className={classnames(styles.ingredientsSectionsList, 'mt-10')}>
            <BurgerIngredientsSection data={data} type='bun' />
            <BurgerIngredientsSection data={data} type='sauce' />
            <BurgerIngredientsSection data={data} type='main' />
        </section>
        
    )
}

export default BurgerIngredientsList;