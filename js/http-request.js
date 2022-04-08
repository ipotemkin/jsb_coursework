const noop = () => {};

function httpRequest(
    {
        url,
        method = 'GET',
        body = '',
        onSuccess = noop,
        onError = (error) => console.error(error),
        headersName = 'Content-type', 
        headersValue = 'application/x-www-form-urlencoded',
        async = true
    }) {
    
    const request = new XMLHttpRequest();
    request.open(method, url, async);
    
    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') //
    // console.log(headersName);
    // console.log(headersValue);
    
    request.setRequestHeader(headersName, headersValue) //
    
    if (async) request.responseType = 'json';
    
    request.send(body);
    
    request.addEventListener('load', () => {
        if (request.status === 200) onSuccess(request.response);
        else onError(request.response || 'Error: ' + request.status);
    });

    request.addEventListener('error', () => onError('No internet connection'));
    
    if (!async) return JSON.parse(request.response);
}
