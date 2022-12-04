import { RootState, AppDispatch } from "../store/index";
import type { Middleware, MiddlewareAPI } from "redux";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { wsMessage } from "../store/feed/slice";

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

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;

            switch (type) {
                case "wsConnecting": {
                    socket = new WebSocket(wsUrl);

                    if (socket) {
                        // функция, которая вызывается при открытии сокета
                        socket.onopen = () => {
                            dispatch({ type: "wsConnect" });
                        };

                        // функция, которая вызывается при ошибке соединения
                        socket.onerror = () => {
                            dispatch({ type: "wsError" });
                        };

                        // функция, которая вызывается при получения события от сервера
                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch(wsMessage(data));
                        };
                        // функция, которая вызывается при закрытии соединения
                        socket.onclose = () => {
                            dispatch({ type: "wsClose" });
                        };
                    }
                    break;
                }
                case "wsMessage":
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket?.send(JSON.stringify(message));
                    break;
            }
            next(action);
        };
    }) as Middleware;
};
