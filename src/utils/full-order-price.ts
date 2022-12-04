import { TIngredient } from "./types";
export function FullOrderPrice(ingredients: Array<TIngredient>, orderIngredients: Array<string>) {
    let fullPrice = 0;
    const ingredientInOrder = ingredients?.filter((item) => orderIngredients.includes(item._id));

    ingredientInOrder.forEach((ingredient) => {
        console.log(fullPrice, +ingredient.price)
        return fullPrice = fullPrice + +ingredient.price;
    });
    return fullPrice;
}
