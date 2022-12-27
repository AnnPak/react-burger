import {
    wsMessage_orders,
    wsConnect_orders,
    wsClose_orders,
    wsMessage_userOrders,
    wsConnect_userOrders,
    wsClose_userOrders,
    initialState,
    feedReducer,
} from "./slice";

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
    type: "open",
};

describe("Feed redux state tests", () => {
    let state = JSON.parse(JSON.stringify(initialState));

    test("Has initial state", () => {
        expect(feedReducer(undefined, { type: "action" })).toEqual(initialState);
    });

    test("Handles wsMessage_orders action", () => {
        state = feedReducer(state, wsMessage_orders(payload));
        expect(state.orders).toEqual(payload.orders);
        expect(state.total).toEqual(payload.total);
        expect(state.totalToday).toEqual(payload.totalToday);
    });

    test("Handles wsClose_orders action", () => {
        state = feedReducer(state, wsClose_orders());
        expect(state.isWsOpen).toEqual(false);
    });

    test("Handles wsConnect_orders action", () => {
        state = feedReducer(state, wsConnect_orders(payload));
        expect(state.isWsOpen).toEqual(true);
    });

    test("Handles wsMessage_userOrders action", () => {
        state = feedReducer(state, wsMessage_userOrders(payload));
        expect(state.userOrders).toEqual(payload.orders);
        expect(state.total).toEqual(payload.total);
        expect(state.totalToday).toEqual(payload.totalToday);
    });

    test("Handles wsClose_userOrders action", () => {
        state = feedReducer(state, wsClose_userOrders());
        expect(state.isUserWsOpen).toEqual(false);
    });

    test("Handles wsConnect_userOrders action", () => {
        state = feedReducer(state, wsConnect_userOrders(payload));
        expect(state.isUserWsOpen).toEqual(true);
    });
});
