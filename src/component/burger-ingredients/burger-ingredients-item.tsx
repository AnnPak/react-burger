import { useEffect, useState, FC } from "react";
import { useDrag } from "react-dnd";
import classnames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import { TIngredient } from "../../utils/types";
import { addIngredientToModal } from "../../redux/store/modal/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./burger-ingredients-list.module.scss";

const BurgerIngredientsItem: FC<{ ingredient: TIngredient }> = ({ ingredient }) => {
    const { bun, constructorIngredients } = useAppSelector((store) => store.burgerConstructor);

    const [resultIndredients, setResultIndredients] = useState<Array<TIngredient> | null>(null);

    const { name, image, price, _id } = ingredient;

    const location = useLocation();
    const dispatch = useAppDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: { ...ingredient },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    useEffect(() => {
        if (bun) {
            setResultIndredients(
                constructorIngredients ? [bun, ...constructorIngredients, bun] : [bun, bun]
            );
        } else {
            setResultIndredients(constructorIngredients);
        }
    }, [constructorIngredients, bun]);

    const ingredientsCounter = resultIndredients
        ? resultIndredients.filter((ingredient) => ingredient._id === _id).length
        : 0;

    return (
        <Link
            className={classnames(styles.ingredientsItem, "mt-6 ml-4 mb-10")}
            onClick={() => {
                dispatch(addIngredientToModal(ingredient));
            }}
            to={`/ingredients/${_id}`}
            state={{ background: location }}
            style={{ opacity }}
            data-test='ingredient'
        >
            {ingredientsCounter > 0 && <Counter count={ingredientsCounter} size="small" />}

            <img src={image} alt={name} ref={dragRef} />

            <div className={classnames(styles.ingredientsItemPrice, "mt-1 mr-4 mb-1")}>
                <p className="pr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>
        </Link>
    );
};

export default BurgerIngredientsItem;
