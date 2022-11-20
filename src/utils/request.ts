import { TOKEN_API } from "./constants";
import { setCookie } from "./cookie";

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

export const updateUserData = async (
    url: string,
    headers: HeadersInit | undefined,
    body?: string,
    method?: string
) => {
    const requestOptions: RequestInit = {
        method: method ? method : "GET",
        mode: "cors",
        headers: headers,
        body: body ? body : null,
    };

    return fetch(url, requestOptions).then((response) => {
        return response.json();
    });
};

const checkResponse = (res:any) => {
    return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

export const refreshTokenRequest = () => {
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

export const fetchWithRefresh = async (url:string, options:any) => {
    try {
        const res = await fetch(url, options);
        const { refreshToken, accessToken } = await refreshTokenRequest();

        setCookie("accessToken", accessToken, {});
        localStorage.setItem("refreshToken", refreshToken);
        options.headers.Authorization = accessToken;

        await fetch(url, options);

        return await checkResponse(res);
    } catch (err:any) {
        if (err.message === "jwt expired") {
            const { refreshToken, accessToken } = await refreshTokenRequest();

            setCookie("accessToken", accessToken, {});
            localStorage.setItem("refreshToken", refreshToken);

            options.headers.Authorization = accessToken;

            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
