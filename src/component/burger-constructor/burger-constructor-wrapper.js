import React, { useCallback } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";

import {
    updateBurderIngredients,
    setIngredientsWithoutBun,
    setBun,
} from "../../store/constructor/slice";

import BurgerConstructorElement from "./burger-constructor-element";
import styles from "./burger-constructor.module.scss";

const BurgerConstructorWpaper = () => {
    const { bun, constructorIngredients } = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch();

    const [, dropTargerRef] = useDrop({
        accept: "ingredients",
        drop(ingredient) {
            if (ingredient.type === "bun") {
                dispatch(setBun(ingredient));
            } else {
                dispatch(setIngredientsWithoutBun(ingredient));
            }
        },
    });

    const moveCard = useCallback(
        (dragIndex, hoverIndex, constructorIngredients) => {
            const dragCard = constructorIngredients[dragIndex];
            const newCards = [...constructorIngredients];

            newCards.splice(dragIndex, 1);
            newCards.splice(hoverIndex, 0, dragCard);

            dispatch(updateBurderIngredients(newCards));
        },
        [dispatch]
    );

    const renderCard = useCallback(
        (item, index) => {
            return (
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(styles.constructorElement)}
                    key={nanoid()}
                    ingredient={item}
                    index={index}
                    svg={true}
                />
            );
        },
        [moveCard]
    );

    return (
        <section className={styles.constructorElements}>
            {bun && (
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(
                        styles.constructorElement,
                        styles.constructorLockElement,
                        "pr-4"
                    )}
                    type="top"
                    isLocked={true}
                    ingredient={bun}
                />
            )}

            <div className={classnames(styles.constructorElements, "pr-2")} ref={dropTargerRef}>
                {constructorIngredients != null &&
                    constructorIngredients.map((item, index) => renderCard(item, index))}
            </div>

            {bun && (
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(
                        styles.constructorElement,
                        styles.constructorLockElement,
                        "pr-4"
                    )}
                    type="bottom"
                    ingredient={bun}
                    isLocked={true}
                />
            )}
        </section>
    );
};

export default BurgerConstructorWpaper;
