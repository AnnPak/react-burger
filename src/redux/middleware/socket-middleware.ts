import { RootState, AppDispatch } from "../store/index";
import type { Middleware, MiddlewareAPI } from "redux";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { wsMessage, wsConnect, wsClose } from "../store/feed/slice";

export enum wsActionType {
    wsConnect = "wsConnect",
    wsDisconnect = "wsDisconnect",
    wsConnecting = "wsConnecting",
    wsOpen = "wsOpen",
    wsClose = "wsClose",
    wsError = "wsError",
    wsMessage = "wsMessage",
}

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsConnecting: ActionCreatorWithoutPayload;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<string>;
    wsMessage: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, url, payload } = action;

            switch (type) {
                case "wsConnecting": {
                    socket = new WebSocket(url);

                    if (socket) {
                        socket.onopen = (event) => {
                            dispatch(wsConnect(event));
                        };

                        socket.onerror = () => {
                            dispatch({ type: "wsError" });
                        };

                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch(wsMessage(data));
                        };
                        socket.onclose = (event) => {
                            socket && dispatch(wsClose(event));
                        };
                    }
                    break;
                }
                case "wsMessage":
                    const message = payload;
                    socket?.send(JSON.stringify(message));
                    break;
                case "wsClose":
                    socket?.close();
                    socket = null;
                    break;
            }
            next(action);
        };
    }) as Middleware;
};
