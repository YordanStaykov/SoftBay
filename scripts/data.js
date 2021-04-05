async function request(url, method, body) {
    let options = {
        method,
    };

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    };

    let response = await fetch(url, options);

    let data = await response.json();

    return data;
};

export async function get(url) {
    return request(url, 'GET');
};

export async function post(url, body) {
    return request(url, 'POST', body);
};

export async function del(url) {
    return request(url, 'DELETE');
};

export async function patch(url, body) {
    return request(url, 'PATCH', body);
};