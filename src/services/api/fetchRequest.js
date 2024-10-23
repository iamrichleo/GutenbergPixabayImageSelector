export default async function fetchRequest(url, options = {}) {
    const {
        method = 'GET',
        headers = {},
        body,
        responseType = 'json',
    } = options;

    const response = await fetch(url, {
        method,
        headers: {
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    // Parse the response based on the expected response type
    if (responseType === 'json') {
        return await response.json();
    } else if (responseType === 'text') {
        return await response.text();
    } else {
        throw new Error('Unsupported response type');
    }
}
