import { addIngredientToModal, addOrderToModal, modalReducer, removeModal } from "./slice";
import { TModalState } from "./slice";

const ingredient = {
  _id: "60666c42cc7b410027a1a9b1",
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

const initialState: TModalState = {
  isOrderModalVisible: false,
  ingredientInModal: null,
};

describe("Modal redux state tests", () => {
  let  state = JSON.parse(JSON.stringify(initialState));

  test('Has initial state', () => {
    expect(modalReducer(undefined, { type: 'some action' })).toEqual(
      initialState
    );
  });

  test("Should initially set ingredint to an empty object", () => {
    expect(state.ingredientInModal).toEqual(null);
  });

  test("Handles addIngredientToModal action", () => {
    state = modalReducer(state, addIngredientToModal(ingredient))
    expect(state.ingredientInModal).toEqual(ingredient);
  });

  test("Handles addOrderToModal action", () => {
    state = modalReducer(state, addOrderToModal());
    expect(state.isOrderModalVisible).toEqual(true);
  });

  test("Handles removeModal action", () => {
    state = modalReducer(state, removeModal())
    expect(state.isOrderModalVisible).toEqual(false);
    expect(state.ingredientInModal).toEqual(null);
  });


});
