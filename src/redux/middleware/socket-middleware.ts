import type { Middleware, MiddlewareAPI } from "redux";

import { RootState, AppDispatch } from "../store/index";
import { TwsActionTypes } from "../../utils/types";

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, url, payload } = action;
            
            switch (type) {
                case wsActions.wsConnecting: {
                    socket = new WebSocket(url);

                    if (socket) {
                        socket.onopen = (event) => {
                            dispatch({ type: wsActions.wsConnect, payload: event });
                        };

                        socket.onerror = () => {
                            dispatch({ type: wsActions.wsError });
                        };

                        socket.onmessage = (event) => {
                            const { data: serializedData } = event;
                            const data = JSON.parse(serializedData);
                            dispatch({
                                type: wsActions.wsMessage,
                                payload: data,
                            });
                        };
                        socket.onclose = () => {
                            socket &&
                                dispatch({
                                    type: wsActions.wsClose,
                                });
                        };
                    }
                    break;
                }
                case wsActions.wsMessage:
                    const message = payload;
                    socket?.send(JSON.stringify(message));
                    break;
                case wsActions.wsClose:
                    socket?.close();
                    socket = null;
                    break;
            }
            next(action);
        };
    }) as Middleware;
};
