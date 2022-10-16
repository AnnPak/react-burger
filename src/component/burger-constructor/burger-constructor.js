import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import OrderDetailsModal from '../order-details-modal/order-details-modal';
import BurgerConstructorResult from './burger-constructor-result';
import BurgerConstructorWpaper from './burger-constructor-wrapper';


import styles from './burger-constructor.module.scss';

const BurgerConstructor = () => {
    const {isOrderModalVisible, burgerIngregients } = useSelector(store => store);

    const unlockedIngredients = useMemo(() => burgerIngregients.filter(item => item.type !== 'bun').map(el => ({ ...el }))); //массив с перемещаемыми элементами
    let lockedIngredients = useMemo(() => burgerIngregients.filter(item => item.type === 'bun').map(el => ({ ...el }))); //массив с булочками
    lockedIngredients = lockedIngredients.shift(); //только одна булочка - удаляю первую в списке

    const resultIngredientsData = burgerIngregients.length ? [lockedIngredients, ...unlockedIngredients, lockedIngredients] : []; //список ингредиетов с двумя блочками


    return (
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            {burgerIngregients.length > 0 &&
                <>
                    <BurgerConstructorWpaper resultIngredientsData={resultIngredientsData} />
                    
                </>
            }
            
            <BurgerConstructorResult resultIngredientsData={resultIngredientsData} />

            {isOrderModalVisible &&
                <OrderDetailsModal/>
            }

        </section>
    )
}

export default BurgerConstructor;