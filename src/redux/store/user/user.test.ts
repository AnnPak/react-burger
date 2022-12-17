import fetch from "jest-fetch-mock";
import { GET_USER } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import { TUserState, userFetchWithRefresh, userReducer } from "./user";

const initialState: TUserState = {
  user: null,
  userSending: false,
  userError: false,
  isLoggedIn: false,

  refreshTokenSending: false,
  refreshTokenError: false,

  loginSending: false,
  loginSuccess: null,
  loginError: false,
};

describe("userReducer redux state tests", () => {
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
    expect(userReducer(undefined, { type: "action" })).toEqual(initialState);
  });

  test("Update state with userFetchWithRefresh (pending)", () => {
    const state = userReducer(initialState, {
      type: "user/userFetchWithRefresh/pending",
    });

    expect(state.refreshTokenSending).toEqual(true);
    expect(state.refreshTokenError).toEqual(false);
  });

  test("Update state with userFetchWithRefresh (rejected)", () => {
    const state = userReducer(initialState, {
      type: "user/userFetchWithRefresh/rejected",
    });

    expect(state.refreshTokenSending).toEqual(false);
    expect(state.refreshTokenError).toEqual(true);
  });

  test("userFetchWithRefresh - should be successful", async () => {
    const action = userFetchWithRefresh({});
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/userFetchWithRefresh/pending",
      "user/userFetchWithRefresh/fulfilled",
    ]);

    expect(fetch).toHaveBeenCalledWith(GET_USER, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${
          getCookie("accessToken") ? getCookie("accessToken")! : ""
        }`,
        "Content-Type": "application/json",
      },
      body: null,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("userFetchWithRefresh - should be failed", async () => {
    fetch.mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ result: "OK" }),
          status: "500",
        })
      ) as jest.Mock
    );

    const action = userFetchWithRefresh({});
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/userFetchWithRefresh/pending",
      "user/userFetchWithRefresh/rejected",
    ]);

    expect(fetch).toHaveBeenCalledWith(GET_USER, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `${
          getCookie("accessToken") ? getCookie("accessToken")! : ""
        }`,
        "Content-Type": "application/json",
      },
      body: null,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
