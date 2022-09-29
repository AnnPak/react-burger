import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import './burgerIngredientsList.scss'

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
        <div className='ingredients-section' key={type}>
            <h3>{title}</h3>

            <div className='ingredients-items'>
                {filtedIngredientsArray.map(item =>  <BurgerIngredientsItem item={item} key={item.id} />)}
            </div>
        </div>

    )
}

const BurgerIngredientsItem = ({ item }) => {

    return (
        <div className='ingredients-items__item mt-6 ml-4 mb-10'>
            <img src={item.image} alt={item.name}/>
            
            <div className='price mt-1 mr-4 mb-1'>
                <p className='pr-2'>{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{item.name}</p>

        </div>
    )
}

const BurgerIngredientsList = ({ data }) => {

    return (
        <section className='ingredients-sections-list mt-10'>
            <BurgerIngredientsSection data={data} type='bun' />
            <BurgerIngredientsSection data={data} type='sauce' />
            <BurgerIngredientsSection data={data} type='main' />
        </section>
        
    )
}

export default BurgerIngredientsList;