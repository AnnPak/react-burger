import { TOKEN_API } from "./constants";
import { setCookie, getCookie } from "./cookie";

export const request = async (url: string, body?: any, method?: string) => {
    const requestOptions = {
        method: method ? method : "GET",
        headers: { "Content-Type": "application/json" },
        body: body ? body : null,
    };

    return fetch(url, requestOptions).then((response) => {
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        return response.json();
    });
};

export const updateUserData = async (url: string, options: RequestInit) => {
    return fetch(url, options).then((response) => {
        return response.json();
    });
};

const checkResponse = (res: Record<string, any>) => {
    return res.ok ? res.json() : res.json().then((err: Record<string, any>) => Promise.reject(err));
};

export const refreshTokenRequest = () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    return fetch(`${TOKEN_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const headersInit: HeadersInit = { "Content-Type": "application/json" };
        options.headers = headersInit;
        options.headers.Authorization = getCookie("accessToken") ? getCookie("accessToken")! : "";

        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const { refreshToken, accessToken } = await refreshTokenRequest();
            const headersInit: HeadersInit = { "Content-Type": "application/json" };

            setCookie("accessToken", accessToken, {});
            localStorage.setItem("refreshToken", refreshToken);
            options.headers = headersInit;
            options.headers.Authorization = accessToken;

            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
