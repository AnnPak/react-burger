import React, { useState } from 'react'

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'

import './burger-ingredients.scss'

const BurgerIngredients = ({ data }) => {
   
    const [current, setCurrent] = useState('bun')

    return (

        <section className='burgerSection-item'>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent}/>

            <BurgerIngredientsList data={data} />

        </section>
    )
}

export default BurgerIngredients;