const request = async (url,body=null, method='GET') => {
    console.log(body)
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body
    };

    return fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }
                return response.json();
            })

}

export default request;
