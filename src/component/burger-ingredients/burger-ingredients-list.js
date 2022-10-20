import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { InView } from "react-intersection-observer";

import classnames from 'classnames';
import { setTabsValue } from '../../store/slice'

import BurgerIngredientsSection from './burger-ingredients-section';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsList = (props) => {
    const {typesOfIngredients} = props
    const { ingredients } = useSelector(store => store);
    const dispatch = useDispatch();

    const callTabsAction = (inView, type) => {
        inView === true && dispatch(setTabsValue(type));
    }
    
    return (
        <section className={classnames(styles.ingredientsSectionsList, 'mt-10')}>
            {ingredients && typesOfIngredients &&
                //вывожу секции ингредиентов по типам 
                typesOfIngredients.map(ingredientType =>
                    <InView 
                        id={'section-'+ ingredientType}
                        key={ingredientType} 
                        onChange={(inView) => callTabsAction(inView, ingredientType)} 
                        threshold="0.25" 
                        rootMargin="50px 0px" 
                        initialInView={ingredientType === 'bun' ? true : false}>
                            
                        <BurgerIngredientsSection
                            ingredients={ingredients}
                            type={ingredientType} />
                    </InView>
                )
            }
        </section>
    )
}


export default BurgerIngredientsList;