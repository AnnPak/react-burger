import React, { useState } from 'react'
import PropTypes from 'prop-types';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import dataPropTypes from '../../utils/constants';

import styles from './burger-ingredients.module.scss'

const BurgerIngredients = ({ data }) => {
   
    const [current, setCurrent] = useState('bun')

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent}/>

            <BurgerIngredientsList data={data} />

        </section>
    )
}

BurgerIngredients.propTypes = {
    data:  PropTypes.arrayOf(dataPropTypes)
}; 

export default BurgerIngredients;