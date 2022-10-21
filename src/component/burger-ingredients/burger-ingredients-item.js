import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { dataPropTypes } from "../../utils/constants";
import { addIngredientToModal } from "../../store/modal/slice";

import styles from "./burger-ingredients-list.module.scss";

const BurgerIngredientsItem = ({ ingredient }) => {
    const { orderIngredients } = useSelector((store) => store.order);

    const { name, image, price, _id } = ingredient;
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: { ...ingredient },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    const ingredientsCounter = orderIngredients
        ? orderIngredients.filter((ingredient) => ingredient._id === _id).length
        : 0;

    return (
        <div
            className={classnames(styles.ingredientsItem, "mt-6 ml-4 mb-10")}
            onClick={() => {
                dispatch(addIngredientToModal(ingredient));
            }}
            style={{ opacity }}
        >
            {ingredientsCounter > 0 && <Counter count={ingredientsCounter} size="small" />}

            <img src={image} alt={name} ref={dragRef} />

            <div className={classnames(styles.ingredientsItemPrice, "mt-1 mr-4 mb-1")}>
                <p className="pr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>
        </div>
    );
};

BurgerIngredientsItem.propTypes = {
    ingredient: dataPropTypes.isRequired,
};

export default BurgerIngredientsItem;
