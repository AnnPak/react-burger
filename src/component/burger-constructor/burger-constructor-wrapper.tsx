import { FC, useCallback, useEffect } from "react";
import classnames from "classnames";
import { useDrop } from "react-dnd";
import { TMoveCard, TIngredient } from "../../utils/types";
import {
    updateBurgerIngredients,
    setIngredientsWithoutBun,
    setBun,
} from "../../redux/store/constructor/constructor";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import BurgerConstructorElement from "./burger-constructor-element";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorWrapper: FC = () => {
    const { bun, constructorIngredients } = useAppSelector(
        (store) => store.burgerConstructor
    );
    const dispatch = useAppDispatch();

    const [, dropTargetRef] = useDrop({
        accept: "ingredients",
        drop(ingredient: TIngredient) {
            if (ingredient.type === "bun") {
                dispatch(setBun(ingredient));
            } else {
                dispatch(setIngredientsWithoutBun(ingredient));
            }
        },
    });

    const moveCard = useCallback<TMoveCard>(
        (dragIndex, hoverIndex, constructorIngredients) => {
            if (constructorIngredients) {
                const dragCard = constructorIngredients[dragIndex];
                const newCards = [...constructorIngredients];

                newCards.splice(dragIndex, 1);
                newCards.splice(hoverIndex, 0, dragCard);

                dispatch(updateBurgerIngredients(newCards));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (localStorage.getItem("constructorIngredients")) {
            dispatch(
                updateBurgerIngredients(
                    JSON.parse(localStorage.getItem("constructorIngredients") || "{}")
                )
            );
        }
        if (localStorage.getItem("bun")) {
            dispatch(setBun(JSON.parse(localStorage.getItem("bun") || "{}")));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <section className={styles.constructorElements} data-test='constructor'>
            {bun && (
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(
                        styles.constructorElement,
                        styles.constructorLockElement,
                        "pr-4"
                    )}
                    index={-1}
                    position="top"
                    ingredient={bun}
                />
            )}

            <div className={classnames(styles.constructorElements, "pr-2")} ref={dropTargetRef}>
                {constructorIngredients != null &&
                    constructorIngredients.map((item, index) => (
                        <BurgerConstructorElement
                            moveCard={moveCard}
                            classname={styles.constructorElement}
                            key={item.key}
                            ingredient={item}
                            index={index}
                        />
                    ))}
            </div>

            {bun && (
                <BurgerConstructorElement
                    moveCard={moveCard}
                    classname={classnames(
                        styles.constructorElement,
                        styles.constructorLockElement,
                        "pr-4"
                    )}
                    index={-1}
                    position="bottom"
                    ingredient={bun}
                />
            )}
        </section>
    );
};

export default BurgerConstructorWrapper;
