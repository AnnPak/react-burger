import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import BurgerIngredientsList from './burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import IngredientDetailsModal from '../ingredient-details-modal/ingredient-details-modal';

import styles from './burger-ingredients.module.scss'


const BurgerIngredients = () => {

    const {ingredientInModal, ingredients } = useSelector(store => store);
    const [typesOfIngredients, setTypesOfIngredients] = useState(null)

    useEffect(() => {
        let typesArray = ingredients.map(item => item.type); //создаю массив из типов ингредиентов
        typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

        setTypesOfIngredients(typesArray);

    }, [])

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper 
                typesOfIngredients={typesOfIngredients} 
                setTypesOfIngredients={setTypesOfIngredients}/>

            <BurgerIngredientsList 
                typesOfIngredients={typesOfIngredients} 
                setTypesOfIngredients={setTypesOfIngredients}/>

            {ingredientInModal && <IngredientDetailsModal />}
            
        </section>
    )
}


export default BurgerIngredients;