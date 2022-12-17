import fetch from "jest-fetch-mock";
import { REGISTER_API } from "../../../utils/constants";
import { registerReducer, registerUser, TRegisterState } from "./register";

const initialState: TRegisterState = {
  registerSending: false,
  registerError: false,
  registerSuccess: null,
};

const requestBody = {
  email: "email",
  password: "password",
  name: "name",
};

describe("Register redux state tests", () => {
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
    expect(registerReducer(undefined, { type: "action" })).toEqual(
      initialState
    );
  });

  test("Update state with registerUser (pending)", () => {
    const state = registerReducer(initialState, {
      type: "user/registerUser/pending",
    });

    expect(state.registerSending).toEqual(true);
    expect(state.registerError).toEqual(false);
  });

  test("Update state with registerUser (rejected)", () => {
    const state = registerReducer(initialState, {
      type: "user/registerUser/rejected",
    });

    expect(state.registerSending).toEqual(false);
    expect(state.registerError).toEqual(true);
  });

  test("registerUser - should be successful", async () => {
    const action = registerUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/registerUser/pending",
      "user/registerUser/fulfilled",
    ]);

    expect(fetch).toHaveBeenCalledWith(REGISTER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("registerUser - should be failed", async () => {
    fetch.mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ result: "OK" }),
          status: "500",
        })
      ) as jest.Mock
    );

    const action = registerUser(requestBody);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await action(dispatch, getState, undefined);

    expect(dispatch.mock.calls.map(([{ type }]) => type)).toEqual([
      "user/registerUser/pending",
      "user/registerUser/rejected",
    ]);

    expect(fetch).toHaveBeenCalledWith(REGISTER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
