const requestData = async (url, setData, setStatus) => {
    return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    setStatus('error')
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                    
                }
                return response.json();
            })
            .then(json => setData(json.data))
            .then(() => setStatus('done'))
            .catch((error) => {
                throw new Error(`Could not fetch ${url}, status: ${error.status}`);
                setStatus('error')
            })
}

export default requestData;
