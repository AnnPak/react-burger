import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientToModal } from '../../store/slice'
import { InView } from "react-intersection-observer";
import { useDrag } from 'react-dnd';

import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setTabsValue, setTypesOfIngredients } from '../../store/slice'

import { dataPropTypes } from '../../utils/constants';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsSection = ({ ingredients, type }) => {
     //массив ингредиентов нужного типа
    const filtedIngredientsArray = useMemo(() => ingredients.filter(item => item.type === type), [ingredients, type]);
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
        <>
            <h3 className={styles.ingredientsTitle} id={type + '-title'}>{title}</h3>

            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map(ingredient =>
                    <BurgerIngredientsItem
                        ingredient={ingredient}
                        key={ingredient._id} />)}
            </div>

        </>

    )
}

const BurgerIngredientsItem = ({ ingredient }) => {

    const { name, image, price } = ingredient;
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredients',
        item: {...ingredient},
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')}
             onClick={() => { dispatch(addIngredientToModal(ingredient)) }} 
             style={{ opacity }}>

            <img src={image} alt={name} ref={dragRef}/>

            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>

        </div>
    )
}

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
            {ingredients &&
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

BurgerIngredientsItem.propTypes = {
    ingredient: dataPropTypes.isRequired,
};

export default BurgerIngredientsList;