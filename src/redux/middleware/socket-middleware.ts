import { RootState, AppDispatch } from "../store/index";
import type { Middleware, MiddlewareAPI } from "redux";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { wsMessage, wsUserMessage, wsConnect, wsClose, wsUserConnect, wsUserClose } from "../store/feed/slice";
import { getCookie } from "../../utils/cookie";

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
            

            switch (type) {
                case "wsConnecting": {
                    socket = new WebSocket(`${wsUrl}/all`);
console.log(socket);
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
                            socket &&                           
                            dispatch(wsClose(event));
                        };
                    }
                    break;
                }
                case "wsUserConnecting": {
                    socket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken")?.replace(/Bearer /g, '')}`);

                    if (socket) {
                        socket.onopen = (event) => {
                            dispatch(wsUserConnect(event));
                        };

                        socket.onerror = () => {
                            dispatch({ type: "wsUserError" });
                        };

                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch(wsUserMessage(data));
                        };
                        socket.onclose = (event) => {
                            socket &&       
                            dispatch(wsUserClose(event));
                        };
                    }
                    break;
                }
                case "wsMessage":
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket?.send(JSON.stringify(message));
                    break;
                case "wsClose":
                    socket?.close();
                    socket = null;
                    break;
                case "wsUserClose":
                    socket?.close();
                    socket = null;
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
