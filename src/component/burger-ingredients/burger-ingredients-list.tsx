import { FC, Dispatch } from "react";
import { useSelector } from "react-redux";
import { InView } from "react-intersection-observer";
import classnames from "classnames";

import BurgerIngredientsSection from "./burger-ingredients-section";

import styles from "./burger-ingredients-list.module.scss";

type TBurgerIngredientsList = {
    typesOfIngredients: Array<string> | null;
    setTabsValue: Dispatch<string | null>;
};

const BurgerIngredientsList: FC<TBurgerIngredientsList> = (props) => {
    const { typesOfIngredients, setTabsValue } = props;
    const { ingredients } = useSelector((store) => store.ingredients);

    const callTabsAction = (inView: boolean, type: string) => {
        inView === true && setTabsValue(type);
    };

    return (
        <section
            className={classnames(styles.ingredientsSectionsList, "mt-10")}
        >
            {ingredients &&
                typesOfIngredients &&
                //вывожу секции ингредиентов по типам
                typesOfIngredients.map((ingredientType) => (
                    <InView
                        id={"section-" + ingredientType}
                        key={ingredientType}
                        onChange={(inView) =>
                            callTabsAction(inView, ingredientType)
                        }
                        threshold={0.25}
                        rootMargin="0px 0px -30% 0px"
                        initialInView={ingredientType === "bun" ? true : false}
                    >
                        <BurgerIngredientsSection
                            ingredients={ingredients}
                            type={ingredientType}
                        />
                    </InView>
                ))}
        </section>
    );
};

export default BurgerIngredientsList;
