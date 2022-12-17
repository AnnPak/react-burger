import {
  feedReducer,
  OrdersInitState,
  wsMessage,
  wsUserMessage,
  wsConnect,
  wsClose,
  wsUserClose,
  wsUserConnect,
} from "./slice";

export const initialState: OrdersInitState = {
  orders: null,
  total: null,
  totalToday: null,
  userOrders: null,
  isWsOpen: null,
  isWsUserOpen: null,
};

const payload = {
  orders: [
    {
      _id: "639e0faf99a25c001cd6a331",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space spicy флюоресцентный бургер",
      createdAt: "2022-12-17T18:51:27.104Z",
      updatedAt: "2022-12-17T18:51:27.461Z",
      number: 34408,
    },
    {
      _id: "639e0faf99a25c001cd6a331",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Space spicy флюоресцентный бургер",
      createdAt: "2022-12-17T18:51:27.104Z",
      updatedAt: "2022-12-17T18:51:27.461Z",
      number: 34408,
    },
  ],
  total: 2258,
  totalToday: 100,
  type: "open"
};

describe("Feed redux state tests", () => {
  let state = JSON.parse(JSON.stringify(initialState));

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Has initial state", () => {
    expect(feedReducer(undefined, { type: "action" })).toEqual(initialState);
  });

  test("Handles wsMessage action", () => {
    state = feedReducer(state, wsMessage(payload));
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toEqual(payload.total);
    expect(state.totalToday).toEqual(payload.totalToday);
  });

  test("Handles wsUserMessage action", () => {
    state = feedReducer(state, wsUserMessage(payload));
    expect(state.userOrders).toEqual(payload.orders);
    expect(state.total).toEqual(payload.total);
    expect(state.totalToday).toEqual(payload.totalToday);
  });

  test("Handles wsClose action", () => {
    state = feedReducer(state, wsClose(payload));

    expect(state.isWsOpen).toEqual(false);
  });

  test("Handles wsUserClose action", () => {
    state = feedReducer(state, wsUserClose(payload));

    expect(state.isWsUserOpen).toEqual(false);
  });

  test("Handles wsConnect action", () => {
    state = feedReducer(state, wsConnect(payload));

    expect(state.isWsOpen).toEqual(true);
  });

  test("Handles wsUserConnect action", () => {
    state = feedReducer(state, wsUserConnect(payload));

    expect(state.isWsUserOpen).toEqual(true);
  });

});
