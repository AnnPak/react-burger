import { FC, useEffect, useState } from "react";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { TIngredient } from "../../utils/types";

import styles from "./ingredient-details-modal.module.scss";
import { RootState } from "../../redux/store";

const IngredientDetails: FC = () => {
    const { ingredientId } = useParams();
    const { ingredients } = useSelector((store: RootState) => store.ingredients);
    const [ingredient, setIngredient] = useState<TIngredient | null | undefined>(null);

    useEffect(() => {
        ingredients &&
            setIngredient(ingredients.find((item: TIngredient) => item._id === ingredientId));
    }, [ingredients, ingredientId]);

    return ingredient ? (
        <>
            <div className={styles.ingredientModalContent}>
                <div className={styles.ingredientModalImg}>
                    <img src={ingredient?.image_large} alt={ingredient?.name} />
                </div>
                <div
                    className={classnames(
                        styles.ingredientModalTitle,
                        "text text_type_main-medium"
                    )}
                >
                    {ingredient?.name}
                </div>
            </div>

            <div className={styles.ingredientComposition}>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Калории,ккал</div>
                    <div className="text text_type_digits-medium">{ingredient?.calories}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Белки, г</div>
                    <div className="text text_type_digits-medium">{ingredient?.proteins}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Жиры, г</div>
                    <div className="text text_type_digits-medium">{ingredient?.fat}</div>
                </div>
                <div className={styles.ingredientCompositionItem}>
                    <div className="text text_type_main-small">Углеводы, г</div>
                    <div className="text text_type_digits-medium">{ingredient?.carbohydrates}</div>
                </div>
            </div>
        </>
    ) : (
        <>Ингредиент не найден</>
    );
};

export default IngredientDetails;
