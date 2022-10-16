import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientToModal } from '../../services/actions/index'
import { InView } from "react-intersection-observer";

import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setTabsValue, setTypesOfIngredients } from '../../services/actions/index'

import { dataPropTypes } from '../../utils/constants';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsSection = ({ ingregients, type }) => {
     //массив ингредиентов нужного типа
    const filtedIngredientsArray = useMemo(() => ingregients.filter(item => item.type === type), [ingregients, type]);
    let title;

    switch (type) {
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
                {filtedIngredientsArray.map(ingredient =>
                    <BurgerIngredientsItem
                        ingredient={ingredient}
                        key={ingredient._id} />)}
            </div>

        </section>

    )
}

const BurgerIngredientsItem = ({ ingredient }) => {

    const { name, image, price } = ingredient;
    const dispatch = useDispatch()

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')}
            onClick={() => { dispatch(addIngredientToModal(ingredient)) }}>

            <img src={image} alt={name} />

            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>

        </div>
    )
}

const BurgerIngredientsList = () => {
    const { ingregients, typesOfIngredients } = useSelector(store => store);
    const dispatch = useDispatch();

    useEffect(() => {
        let typesArray = ingregients.map(item => item.type); //создаю массив из типов ингредиентов
        typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

        dispatch(setTypesOfIngredients(typesArray));

    }, [ingregients, dispatch])

    const callTabsAction = (inView, type) => {
        inView === true && dispatch(setTabsValue(type));
    }

    return (
        <section className={classnames(styles.ingredientsSectionsList, 'mt-10')}>
            {ingregients &&
                //вывожу секции ингредиентов по типам 
                typesOfIngredients.map(ingredientType =>
                    <InView 
                        key={ingredientType} 
                        as="section" 
                        onChange={(inView) => callTabsAction(inView, ingredientType)} 
                        threshold="0.25" 
                        rootMargin="50px 0px" 
                        initialInView={ingredientType === 'bun' ? true : false}>
                            
                        <BurgerIngredientsSection
                            ingregients={ingregients}
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

BurgerIngredientsItem.propTypes = {
    ingredient: dataPropTypes.isRequired,
};

export default BurgerIngredientsList;