import { useState } from 'react'
import { useSelector } from 'react-redux';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import IngredientDetailsModal from '../ingredient-details-modal/ingredient-details-modal';

import styles from './burger-ingredients.module.scss'


const BurgerIngredients = () => {

    const {isIngredientModalVisible } = useSelector(store => store);

    const [current, setCurrent] = useState('bun');

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent} />

            <BurgerIngredientsList/>

            {isIngredientModalVisible && <IngredientDetailsModal />}

        </section>
    )
}


export default BurgerIngredients;