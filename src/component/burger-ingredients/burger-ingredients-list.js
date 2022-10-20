import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { InView } from "react-intersection-observer";

import classnames from 'classnames';
import { setTabsValue, setTypesOfIngredients } from '../../store/slice'

import { dataPropTypes } from '../../utils/constants';
import BurgerIngredientsSection from './burger-ingredients-section';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsList = () => {
    const { ingredients, typesOfIngredients } = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        let typesArray = ingredients.map(item => item.type); //создаю массив из типов ингредиентов
        typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

        dispatch(setTypesOfIngredients(typesArray));

    }, [ingredients, dispatch])

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

BurgerIngredientsSection.propTypes = {
    type: PropTypes.string,
    ingredients: PropTypes.arrayOf(dataPropTypes),
};

export default BurgerIngredientsList;