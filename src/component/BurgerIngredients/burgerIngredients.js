import React, { useState } from 'react'

import BurgerIngredientsList from '../BurgerIngredientsList/burgerIngredientsList'
import TabsWrapper from '../TabsWrapper/tabsWrapper'
import './burgerIngredients.scss'

const BurgerIngredients = ({ data }) => {
   
    const [current, setCurrent] = useState('bun')

    return (

        <div className='burgerSection-item'>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent}/>

            <BurgerIngredientsList data={data} />

        </div>
    )
}

export default BurgerIngredients;