import fetch from "jest-fetch-mock";
import { GET_USER, LOGIN_API } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import { loginUser, userFetchWithRefresh, userReducer, userUpdate, initialState } from "./user";

const requestBody = {
    name: "name",
    password: "password",
    login: "login",
}

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

  test("Update state with loginUser (pending)", () => {
    const state = userReducer(initialState, {
      type: "user/loginUser/pending",
    });

    expect(state.loginSending).toEqual(true);
    expect(state.loginError).toEqual(false);
  });

  test("Update state with loginUser (rejected)", () => {
    const state = userReducer(initialState, {
      type: "user/loginUser/rejected",
    });

    expect(state.loginSending).toEqual(false);
    expect(state.loginSuccess).toEqual(false);
    expect(state.loginError).toEqual(true);
  });

  test("loginUser - should be successful", async () => {
    const action = loginUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/loginUser/pending",
      "user/loginUser/fulfilled",
    ]);

    expect(fetch).toHaveBeenCalledWith(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("loginUser - should be failed", async () => {
    fetch.mockImplementationOnce(
        jest.fn(() =>
          Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500",
          })
        ) as jest.Mock
      );


    const action = loginUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/loginUser/pending",
      "user/loginUser/rejected",
    ]);

    expect(fetch).toHaveBeenCalledWith(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("userUpdate - should be successful", async () => {
    const action = userUpdate(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(fetch).toHaveBeenCalledWith(GET_USER, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getCookie("accessToken")}`,
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
