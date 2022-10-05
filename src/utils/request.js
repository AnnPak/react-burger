const requestData = async (url, setData, setStatus) => {
    return fetch(url)
            .then((response) => {
                if (!response.ok) { setStatus('error')}
                return response.json();
            })
            .then(json => setData(json.data))
            .then(() => setStatus('done'))
            .catch((error) => {
                setStatus('error')
            })
}

export default requestData;
