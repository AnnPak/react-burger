import fetch from "jest-fetch-mock";

import { FORGOT_PSSWRD } from "../../../utils/constants";
import { forgotPassword, passwordReducer, TPasswordState } from "./password";

const initialState: TPasswordState = {
  forgotSending: false,
  forgotSuccess: false,
  forgotError: false,

  resetSending: false,
  resetSuccess: false,
  resetError: false,
};

const requestBody = { email: "email" };

describe("Password redux state tests", () => {
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
    expect(passwordReducer(undefined, { type: "action" })).toEqual(
      initialState
    );
  });

  test("Update state with resetPassword (pending)", () => {
    const state = passwordReducer(initialState, {
      type: "user/resetPassword/pending",
    });

    expect(state.resetSending).toEqual(true);
    expect(state.resetError).toEqual(false);
  });

  test("Update state with resetPassword (rejected)", () => {
    const state = passwordReducer(initialState, {
      type: "user/resetPassword/rejected",
    });

    expect(state.resetSending).toEqual(false);
    expect(state.resetError).toEqual(true);
  });

  test("Update state with forgotPassword (pending)", () => {
    const state = passwordReducer(initialState, {
      type: "user/forgotPassword/pending",
    });

    expect(state.forgotSending).toEqual(true);
    expect(state.forgotError).toEqual(false);
  });

  test("Update state with forgotPassword (rejected)", () => {
    const state = passwordReducer(initialState, {
      type: "user/forgotPassword/rejected",
    });

    expect(state.forgotSending).toEqual(false);
    expect(state.forgotError).toEqual(true);
  });

  test("forgotPassword - should be successful", async () => {
    const action = forgotPassword(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/forgotPassword/pending",
      "user/forgotPassword/fulfilled",
    ]);

    expect(fetch).toHaveBeenCalledWith(FORGOT_PSSWRD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("forgotPassword - should be failed", async () => {
    fetch.mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ result: "OK" }),
          status: "500",
        })
      ) as jest.Mock
    );

    const action = forgotPassword(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/forgotPassword/pending",
      "user/forgotPassword/rejected",
    ]);

    expect(fetch).toHaveBeenCalledWith(FORGOT_PSSWRD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
