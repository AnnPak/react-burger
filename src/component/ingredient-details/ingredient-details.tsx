import classnames from "classnames";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../store/ingredients/slice";

import { TIngredient } from "../../utils/types";

import styles from "./ingredient-details-modal.module.scss";

const IngredientDetails = () => {
    const { ingredientId } = useParams();
    const { ingredients } = useSelector((store:any) => store.ingredients);
    console.log(ingredients)
    const dispatch = useDispatch<any>();
    !ingredients && dispatch(fetchIngredients());

    const ingredient = ingredients.find((item:TIngredient) => item._id === ingredientId);

    return (
        ingredient && (
            <>
                <div className={styles.ingredientModalContent}>
                    <div className={styles.ingredientModalImg}>
                        <img src={ingredient.image_large} alt={ingredient.name} />
                    </div>
                    <div
                        className={classnames(
                            styles.ingredientModalTitle,
                            "text text_type_main-medium"
                        )}
                    >
                        {ingredient.name}
                    </div>
                </div>

                <div className={styles.ingredientComposition}>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Калории,ккал</div>
                        <div className="text text_type_digits-medium">{ingredient.calories}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Белки, г</div>
                        <div className="text text_type_digits-medium">{ingredient.proteins}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Жиры, г</div>
                        <div className="text text_type_digits-medium">{ingredient.fat}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Углеводы, г</div>
                        <div className="text text_type_digits-medium">
                            {ingredient.carbohydrates}
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default IngredientDetails;
