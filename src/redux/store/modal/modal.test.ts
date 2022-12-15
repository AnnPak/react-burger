import { addIngredientToModal, addOrderToModal, removeModal } from "./slice";
import { TModalState } from "./slice";
import store from "..";

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

type Tdata = {
  headers: Headers;
  json: any;
  ok: boolean;
};

describe("Modal redux state tests", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            json: jest.fn().mockResolvedValue({ result: "OK" }),
            ok: true,
          })
        ) as jest.Mock
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Should initially set ingredint to an empty object", () => {
    const state = store.getState().modal;
    expect(state.ingredientInModal).toEqual(undefined);
  });
});
