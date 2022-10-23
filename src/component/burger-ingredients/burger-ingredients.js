import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BurgerIngredientsList from "./burger-ingredients-list";
import TabsWrapper from "../tabs-wrapper/tabs-wrapper";
import IngredientDetailsModal from "../ingredient-details-modal/ingredient-details-modal";

import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = () => {
    const { ingredients } = useSelector((store) => store.ingredients);
    const { ingredientInModal } = useSelector((store) => store.modal);
    const [typesOfIngredients, setTypesOfIngredients] = useState(null);
    const [tabsValue, setTabsValue] = useState(null);

    useEffect(() => {
        let typesArray = ingredients ? ingredients.map((item) => item.type) : null; //создаю массив из типов ингредиентов
        typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

        setTypesOfIngredients(typesArray);
    }, [ingredients]);

    return (
        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper
                typesOfIngredients={typesOfIngredients}
                setTypesOfIngredients={setTypesOfIngredients}
                tabsValue={tabsValue}
            />

            {typesOfIngredients && (
                <BurgerIngredientsList
                    typesOfIngredients={typesOfIngredients}
                    setTypesOfIngredients={setTypesOfIngredients}
                    tabsValue={tabsValue}
                    setTabsValue={setTabsValue}
                />
            )}

            {ingredientInModal && <IngredientDetailsModal />}
        </section>
    );
};

export default BurgerIngredients;
