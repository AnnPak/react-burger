import { LOGOUT_API } from "../../../utils/constants";
import { logoutReducer, logoutUser, TLogoutState } from "./logout";
import fetch from "jest-fetch-mock";

const initialState: TLogoutState = {
  logoutSending: false,
  logoutError: false,
};

const requestBody = { token: "refreshToken" };
describe("Logout redux state tests", () => {
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
    expect(logoutReducer(undefined, { type: "action" })).toEqual(initialState);
  });

  test("Update state with logoutUser (pending)", () => {
    const state = logoutReducer(initialState, {
      type: "user/logoutUser/pending",
    });

    expect(state.logoutSending).toEqual(true);
    expect(state.logoutError).toEqual(false);
  });

  test("Update state with logoutUser (rejected)", () => {
    const state = logoutReducer(initialState, {
      type: "user/logoutUser/rejected",
    });

    expect(state.logoutSending).toEqual(false);
    expect(state.logoutError).toEqual(true);
  });

  test("logoutUser - should be successful", async () => {
    const action = logoutUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/logoutUser/pending",
      "user/logoutUser/fulfilled",
    ]);

    expect(fetch).toHaveBeenCalledWith(LOGOUT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("logoutUser - should be failed", async () => {
    fetch.mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ result: "OK" }),
          status: "500",
        })
      ) as jest.Mock
    );

    const action = logoutUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/logoutUser/pending",
      "user/logoutUser/rejected",
    ]);

    expect(fetch).toHaveBeenCalledWith(LOGOUT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
