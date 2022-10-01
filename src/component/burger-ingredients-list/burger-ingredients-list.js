import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';

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
        <section>
            <h3 className={styles.ingredientsTitle} id={type + '-title'}>{title}</h3>

            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map(item => 
                    <BurgerIngredientsItem 
                            name={item.name} 
                            image={item.image} 
                            price={item.price} 
                            key={item._id}/>)}
            </div>
        </section>

    )
}

const BurgerIngredientsItem = ({ name, image, price }) => {

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')}>
            <img src={image} alt={name}/>
            
            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>

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

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

BurgerIngredientsSection.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    type: PropTypes.string.isRequired
};

BurgerIngredientsItem.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default BurgerIngredientsList;