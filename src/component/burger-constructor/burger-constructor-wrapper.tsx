import { useCallback, useEffect } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { TMoveCard, TIngredient } from "../../utils/types";
import {
    updateBurgerIngredients,
    setIngredientsWithoutBun,
    setBun,
} from "../../store/constructor/slice";

import BurgerConstructorElement from "./burger-constructor-element";
import styles from "./burger-constructor.module.scss";

const BurgerConstructorWrapper = () => {
    const { bun, constructorIngredients } = useSelector((store: any) => store.burgerConstructor);
    const dispatch = useDispatch<any>();

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
            const dragCard = constructorIngredients[dragIndex];
            const newCards = [...constructorIngredients];

            newCards.splice(dragIndex, 1);
            newCards.splice(hoverIndex, 0, dragCard);

            dispatch(updateBurgerIngredients(newCards));
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
    }, []);

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
                    index={-1}
                    position="top"
                    ingredient={bun}
                />
            )}

            <div className={classnames(styles.constructorElements, "pr-2")} ref={dropTargetRef}>
                {constructorIngredients != null &&
                    constructorIngredients.map((item: TIngredient, index: number) => (
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
