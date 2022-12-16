import { TFetchOrder } from "../../../utils/types";
import { createOrder, orderReducer, TOrderState } from "./slice";

const initialState: TOrderState = {
  orderNumber: null,
  orderStatus: "idle",
};

const requestBody:TFetchOrder = {
    ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733c6'],
}

describe("Order redux state tests", () => {

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

  test("Has initial state", () => {
    expect(orderReducer(undefined, { type: "action" })).toEqual(
      initialState
    );
  });

  test("Update state with createOrder (pending)", () => {
    const state = orderReducer(initialState, {
      type: "order/createOrder/pending",
    });

    expect(state.orderStatus).toEqual("loading");
  });
  
  test("Update state with createOrder (rejected)", () => {
    const state = orderReducer(initialState, {
      type: "order/createOrder/rejected",
    });

    expect(state.orderStatus).toEqual("error");
    expect(state.orderNumber).toEqual(null);
  });

  test("createOrder - should be successful", async () => {
    const action = createOrder(requestBody);
      const dispatch = jest.fn();
      const getState = jest.fn();

      await action(dispatch, getState, undefined);

      expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
        'order/createOrder/pending',
        'order/createOrder/fulfilled',
      ]);
      expect(fetch).toHaveBeenCalledTimes(1);
  });

});
