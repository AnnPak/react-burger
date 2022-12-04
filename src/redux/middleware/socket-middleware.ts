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
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === "wsConnecting") {
                // объект класса WebSocket

                socket = new WebSocket(wsUrl);
            }
            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    dispatch({ type: "wsConnect", payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    dispatch({ type: "wsError", payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event) => {
                    const { data: serializedData } = event;
                    const data = JSON.parse(serializedData);
                    dispatch(wsMessage(data));
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    dispatch({ type: "wsClose", payload: event });
                };

                if (type === "wsMessage") {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};
