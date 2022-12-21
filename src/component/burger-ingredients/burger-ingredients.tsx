import { FC, useEffect, useState } from "react";

import { TIngredient } from "../../utils/types";
import BurgerIngredientsList from "./burger-ingredients-list";
import TabsWrapper from "../tabs-wrapper/tabs-wrapper";
import { useAppSelector } from "../../redux/store";

import styles from "./burger-ingredients.module.scss";

const BurgerIngredients: FC = () => {
    const { ingredients } = useAppSelector((store) => store.ingredients);
    const [typesOfIngredients, setTypesOfIngredients] = useState<Array<string> | null>(null);
    const [tabsValue, setTabsValue] = useState<string | null>(null);

    useEffect(() => {
        let typesArray = ingredients ? ingredients.map((item:TIngredient):string => item.type) : null; //создаю массив из типов ингредиентов
        typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

        setTypesOfIngredients(typesArray);
    }, [ingredients]);

    return (
        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper
                typesOfIngredients={typesOfIngredients}
                tabsValue={tabsValue}
            />

            {typesOfIngredients && (
                <BurgerIngredientsList
                    typesOfIngredients={typesOfIngredients}
                    setTabsValue={setTabsValue}
                />
            )}
        </section>
    );
};

export default BurgerIngredients;
