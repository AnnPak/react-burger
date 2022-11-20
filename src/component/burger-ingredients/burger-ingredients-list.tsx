import { FC, Dispatch, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import classnames from "classnames";

import BurgerIngredientsSection from "./burger-ingredients-section";

import styles from "./burger-ingredients-list.module.scss";

type TBurgerIngredientsList = {
    typesOfIngredients: Array<string> | null;
    setTabsValue: Dispatch<string | null>;
};

const BurgerIngredientsList: FC<TBurgerIngredientsList> = (props) => {
    const { typesOfIngredients, setTabsValue } = props;
    const { ingredients } = useSelector((store: any) => store.ingredients);

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    });

    const [mainsRef, inViewMain] = useInView({
        threshold: 0,
    });
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
        rootMargin: "-400px 0px 0px 0px",

    });

    const selectRefByType = (type: string) => {
        switch (type) {
            case "bun":
                return bunsRef;
            case "sauce":
                return mainsRef;
            case "main":
                return saucesRef;
        }
    };

    useEffect(() => {
        if (inViewBuns) {
            setTabsValue("bun");
        } else if (inViewSauces) {
            setTabsValue("sauce");
        } else if (inViewMain) {
            setTabsValue("main");
        }
    }, [inViewBuns, inViewMain, inViewSauces]);

    return (
        <section className={classnames(styles.ingredientsSectionsList, "mt-10")}>
            {ingredients &&
                typesOfIngredients &&
                //вывожу секции ингредиентов по типам
                typesOfIngredients.map((ingredientType) => (
                    <div
                        ref={selectRefByType(ingredientType)}
                        id={"section-" + ingredientType}
                        key={ingredientType}
                    >
                        <BurgerIngredientsSection
                            ingredients={ingredients}
                            type={ingredientType}
                            data-visible={inViewBuns}
                        />
                    </div>
                ))}
        </section>
    );
};

export default BurgerIngredientsList;
