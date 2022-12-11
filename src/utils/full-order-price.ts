import { TIngredient } from "./types";
export function FullOrderPrice(ingredients: Array<TIngredient>, orderIngredients: Array<string>) {
    let fullPrice = 0;

    orderIngredients.forEach((orderIngredientId) => {
        const ingredientInOrder = ingredients?.find((item) => item._id === orderIngredientId);
        return fullPrice = ingredientInOrder?.price ? ingredientInOrder.price + fullPrice : fullPrice;
    });
    return fullPrice;
}
