
export const postmsg = (message) => {
    const request = {
        msg: message
    };

    return fetch('/api/postmsg', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(request),
    }).then((response) => {
        console.log(response);
    });
};