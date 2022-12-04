import { RootState, AppDispatch } from "../store/index";
import type { Middleware, MiddlewareAPI } from "redux";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { wsMessage, wsUserMessage } from "../store/feed/slice";

export enum wsActionType {
    wsConnect = "wsConnect",
    wsDisconnect = "wsDisconnect",
    wsConnecting = "wsConnecting",
    wsOpen = "wsOpen",
    wsClose = "wsClose",
    wsError = "wsError",
    wsMessage = "wsMessage",

    wsUserConnect = "wsUserConnect",
    wsUserDisconnect = "wUsersDisconnect",
    wsUserConnecting = "wsUserConnecting",
    wsUserOpen = "wsUserOpen",
    wsUserClose = "wsUserClose",
    wsUserError = "wsUserError",
    wsUserMessage = "wsUserMessage",
}

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsConnecting: ActionCreatorWithoutPayload;
    wsOpen: ActionCreatorWithoutPayload;
    wsClose: ActionCreatorWithoutPayload;
    wsError: ActionCreatorWithPayload<string>;
    wsMessage: ActionCreatorWithPayload<string>;

    wsUserConnect: ActionCreatorWithPayload<string>;
    wsUserDisconnect: ActionCreatorWithoutPayload;
    wsUserConnecting: ActionCreatorWithoutPayload;
    wsUserOpen: ActionCreatorWithoutPayload;
    wsUserClose: ActionCreatorWithoutPayload;
    wsUserError: ActionCreatorWithPayload<string>;
    wsUserMessage: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const isUserWsUrl = wsUrl.includes("token");

            switch (type) {
                case "wsConnecting": {
                    socket = !isUserWsUrl ? new WebSocket(wsUrl) : null;

                    if (socket) {
                        socket.onopen = () => {
                            dispatch({ type: "wsConnect" });
                        };

                        socket.onerror = () => {
                            dispatch({ type: "wsError" });
                        };

                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch(wsMessage(data));
                        };
                        socket.onclose = () => {
                            dispatch({ type: "wsClose" });
                        };
                    }
                    break;
                }
                case "wsUserConnecting": {
                    socket = isUserWsUrl ? new WebSocket(wsUrl) : null;

                    if (socket) {
                        socket.onopen = () => {
                            dispatch({ type: "wsUserConnect" });
                        };

                        socket.onerror = () => {
                            dispatch({ type: "wsUserError" });
                        };

                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch(wsUserMessage(data));
                        };
                        socket.onclose = () => {
                            dispatch({ type: "wsUserClose" });
                        };
                    }
                    break;
                }
                case "wsMessage":
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket?.send(JSON.stringify(message));
                    break;
                case "wsUserMessage":
                    const userMessage = payload;
                    // функция для отправки сообщения на сервер
                    socket?.send(JSON.stringify(userMessage));
                    break;
            }
            next(action);
        };
    }) as Middleware;
};
