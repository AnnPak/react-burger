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

export const requestForUser = async ({url, headers = {"Content-Type": "application/json"}, method = "GET", body=null}) => {
    const requestOptions = {
        method: method,
        mode: "cors",
        headers: headers,
        body: body
    };
    return fetch(url, requestOptions).then((response) => {
        return response.json();
    });
};

export const requestToken = async ({url, token}) => {
    const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "token": token }),
    };
    console.log(requestOptions)
    return fetch(url, requestOptions).then((response) => {
        return response.json();
    });
};
