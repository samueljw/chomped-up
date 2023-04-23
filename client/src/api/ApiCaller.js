import { API_ENDPOINT } from '@env';
import link from '../api/link';

const baseUrl = link;

const ApiCaller = async (path = '', token = '', body) => {
    const fullUrl = `${baseUrl}${path}`;
    let response = {};

    response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            access_token: token,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.statusCode !== 200) {
        throw { name: data };
    } else {
        return data;
    }
};

export default ApiCaller;
