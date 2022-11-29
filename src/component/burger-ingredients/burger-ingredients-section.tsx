import { useMemo, FC } from "react";
import BurgerIngredientsItem from "./burger-ingredients-item";

import styles from "./burger-ingredients-list.module.scss";
import { TITLE_LIST } from "../../utils/constants";
import { TIngredient } from "../../utils/types";

type TBurgerIngredientsSection = {
    ingredients: Array<TIngredient>;
    type: string;
};

const BurgerIngredientsSection: FC<TBurgerIngredientsSection> = ({ ingredients, type }) => {
    //массив ингредиентов нужного типа
    const filtedIngredientsArray = useMemo(
        () => ingredients.filter((item) => item.type === type),
        [ingredients, type]
    );

    return (
        <>
            <h3 className={styles.ingredientsTitle} id={type + "-title"}>
                {TITLE_LIST[type]}
            </h3>
            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map((ingredient) => (
                    <BurgerIngredientsItem ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
    );
};

export default BurgerIngredientsSection;
