import { INGREDIENTS_API } from "../../../utils/constants";
import { fetchIngredients, ingredientsReducer, TIngredientsState } from "./slice";
import fetch from "jest-fetch-mock";

const initialState:TIngredientsState = {
    ingredients: null,
    isLoading: false,
    isError: false,
};

describe("Ingredients redux state tests", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockImplementation(
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
  
    test("Has initial state", () => {
      expect(ingredientsReducer(undefined, { type: "action" })).toEqual(initialState);
    });
  
    test("Update state with fetchIngredients (pending)", () => {
      const state = ingredientsReducer(initialState, {
        type: "ingredients/fetchIngredients/pending",
      });
  
      expect(state.isLoading).toEqual(true);
      expect(state.isError).toEqual(false);
    });
  
    test("Update state with fetchIngredients (rejected)", () => {
      const state = ingredientsReducer(initialState, {
        type: "ingredients/fetchIngredients/rejected",
      });
  
      expect(state.isLoading).toEqual(false);
      expect(state.isError).toEqual(true);
    });
  
    test("fetchIngredients - should be successful", async () => {
      const action = fetchIngredients();
      const dispatch = jest.fn();
      const getState = jest.fn();
  
      await action(dispatch, getState, undefined);
  
      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        "ingredients/fetchIngredients/pending",
        "ingredients/fetchIngredients/fulfilled",
      ]);
  
      expect(fetch).toHaveBeenCalledWith(INGREDIENTS_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
  
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  
    test("fetchIngredients - should be failed", async () => {
      fetch.mockImplementationOnce(
        jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500",
          })
        ) as jest.Mock
      );
  
      const action = fetchIngredients();
      const dispatch = jest.fn();
      const getState = jest.fn();
  
      await action(dispatch, getState, undefined);
  
      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        "ingredients/fetchIngredients/pending",
        "ingredients/fetchIngredients/rejected",
      ]);
  
      expect(fetch).toHaveBeenCalledWith(INGREDIENTS_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });
  
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });