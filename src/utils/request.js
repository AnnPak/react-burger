import { TOKEN_API } from "./constants";
import { setCookie, getCookie } from "./cookie";

export const request = async (url, body = null, method = "GET") => {
    const requestOptions = {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: body,
    };

    return fetch(url, requestOptions).then((response) => {
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        return response.json();
    });
};

export const updateUserData = async ({
    url,
    headers = { "Content-Type": "application/json" },
    method = "GET",
    body = null,
}) => {
    const requestOptions = {
        method: method,
        mode: "cors",
        headers: headers,
        body: body,
    };
    return fetch(url, requestOptions).then((response) => {
        return response.json();
    });
};

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshTokenRequest = () => {
    return fetch(`${TOKEN_API}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    }).then(checkResponse);
};

export const fetchWithRefresh = async ({url, options}) => {
    console.log(options)
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const { refreshToken, accessToken } = await refreshTokenRequest();

            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);

            options.headers.Authorization = accessToken;

            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
