import { API_ENDPOINT } from '@env';

const baseUrl = API_ENDPOINT;

const ApiCaller = async (path = '', token = '', method = 'POST', body) => {
    const fullUrl = `${baseUrl}/${path}`;
    let response = {};

    if (method === 'POST') {
        response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accessToken: token,
            },
            body: JSON.stringify(body),
        });
    } else if (method === 'GET') {
        response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                access_token: token,
            },
        });
    }

    const data = await response.json();

    if (data.statusCode !== 200) {
        throw { name: data };
    } else {
        return data;
    }
};
