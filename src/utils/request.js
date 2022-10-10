const requestData = async (url, setData, setStatus, body=null, method='GET') => {
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
            .then(json => setData(json))
            .then(() => setStatus('done'))
            .catch((e) => {
                setStatus('error')
            })
}

export default requestData;
