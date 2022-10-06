const requestData = async (url, setData, setStatus) => {
    return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => setData(json.data))
            .then(() => setStatus('done'))
            .catch(() => {
                setStatus('error')
            })
}

export default requestData;
