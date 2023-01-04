import {
    constructorReducer,
    deleteBurgerIngredient,
    setBun,
    setIngredientsWithoutBun,
    updateBurgerIngredients,
    initialState,
} from "./constructor";

const ingredient = {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
};
const bun = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
};

describe("Constructor redux state tests", () => {
    let state = JSON.parse(JSON.stringify(initialState));

    test("Has initial state", () => {
        expect(constructorReducer(undefined, { type: "action" })).toEqual(initialState);
    });

    test("Handles setIngredientsWithoutBun action", () => {
        state = JSON.parse(JSON.stringify(initialState));
        state = constructorReducer(state, setIngredientsWithoutBun(ingredient));
        expect(state.constructorIngredients.length).toEqual(1);
    });

    test("Handles deleteBurgerIngredient action", () => {
        state = JSON.parse(JSON.stringify(initialState));
        state = constructorReducer(state, setIngredientsWithoutBun(ingredient));
        state = constructorReducer(state, deleteBurgerIngredient(0));

        expect(state.constructorIngredients).toEqual([]);
    });

    test("Handles updateBurgerIngredients action", () => {
        state = JSON.parse(JSON.stringify(initialState));

        state = constructorReducer(state, updateBurgerIngredients(ingredient));
        expect(state.constructorIngredients).toEqual(ingredient);
    });

    test("Handles setBun action", () => {
        state = constructorReducer(state, setBun(bun));
        expect(state.bun).toEqual(bun);
    });


});
