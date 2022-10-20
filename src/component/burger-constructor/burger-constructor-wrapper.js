import React, { useEffect, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { 
    addBurgerIngredient, 
    replaceBurderIngredientBun, 
    setOrderIngredients, 
    updateBurderIngredients, 
    setIngredientsWithoutBun 
} from '../../store/slice'

import BurgerConstructorElement from './burger-constructor-element';
import styles from './burger-constructor.module.scss';

const BurgerConstructorWpaper = () => {

    const { burgerIngredients, ingredientsWithoutBun } = useSelector(store => store);
    const dispatch = useDispatch();

    const [, dropTargerRef] = useDrop({
        accept: "ingredients",
        drop(ingredient) {
            if (burgerIngredients && burgerIngredients.find(item => item.type === 'bun') && ingredient.type === 'bun') {
                dispatch(replaceBurderIngredientBun(ingredient));
            } else {
                dispatch(addBurgerIngredient(ingredient));
            }

        },
    });

    const elementTypeBun = useMemo(() => burgerIngredients ? burgerIngredients.find(item => item.type === 'bun') : null, [burgerIngredients]);

    //формирую массив с ингредиетами для заказа
    useEffect(() => {
        if (elementTypeBun && burgerIngredients) {
            const resultIndredients = [...burgerIngredients, elementTypeBun]
            dispatch(setOrderIngredients(resultIndredients));
        } else {
            dispatch(setOrderIngredients(burgerIngredients));
        }

        const arrayWithoutBun = burgerIngredients ? burgerIngredients.filter(item => item.type !== 'bun') : [];

        dispatch(setIngredientsWithoutBun(arrayWithoutBun))
        
    }, [burgerIngredients, elementTypeBun, dispatch])

    const moveCard = useCallback((dragIndex, hoverIndex, ingredientsWithoutBun) => {
        const dragCard = ingredientsWithoutBun[dragIndex];
        const newCards = [...ingredientsWithoutBun]

        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        dispatch(updateBurderIngredients(newCards))
    }, [dispatch]);

    const renderCard = useCallback((item, index) => {
        return (
            <BurgerConstructorElement
                moveCard={moveCard}
                classname={classnames(styles.constructorElement)}
                ingredient={item}
                index={index}
                key={uuidv4()}
                svg={true} />
        )
    }, [moveCard])

    return (

        <section className={styles.constructorElements} >

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='top'
                    isLocked={true}
                    ingredient={elementTypeBun} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')} ref={dropTargerRef}>
                {ingredientsWithoutBun &&

                    ingredientsWithoutBun
                        .map((item, index) => renderCard(item, index))

                }
            </div>

            {elementTypeBun &&
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={uuidv4()}
                    type='bottom'
                    ingredient={elementTypeBun}
                    isLocked={true} />

            }

        </section>
    )
}

export default BurgerConstructorWpaper;