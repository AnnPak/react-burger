import React, { useMemo } from "react";
import PropTypes from "prop-types";
import BurgerIngredientsItem from "./burger-ingredients-item";

import styles from "./burger-ingredients-list.module.scss";
import { DATA_PROPS_TYPE, TITLE_LIST } from "../../utils/constants";

const BurgerIngredientsSection = ({ ingredients, type }) => {
    //массив ингредиентов нужного типа
    const filtedIngredientsArray = useMemo(
        () => ingredients.filter((item) => item.type === type),
        [ingredients, type]
    );


    return (
        <>
            <h3 className={styles.ingredientsTitle} id={type + "-title"}>{TITLE_LIST[type]}</h3>
            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map((ingredient) => (
                    <BurgerIngredientsItem ingredient={ingredient} key={ingredient._id} />
                ))}
            </div>
        </>
    );
};

BurgerIngredientsSection.propTypes = {
    type: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(DATA_PROPS_TYPE.isRequired).isRequired,
};

export default BurgerIngredientsSection;
