import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('123 post order with correct data should receive code 201', async ({ request }) => {
    // prepare request body
    const requestBody = {
        status: 'OPEN',
        courierId: 0,
        customerName: 'string',
        customerPhone: 'string',
        comment: 'string',
        id: 0,
    }

    // Send a POST request to the server
    const response = await request.post(`${process.env.STAGE_URL}/test-orders`, {
        data: requestBody,
    })
    const responseBody = await response.json();

    // Log the response status and body
    console.log('response status:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
    expect(responseBody.status).toBe("OPEN");
})

test('post order with data without status field should receive code 200', async ({ request }) => {
    // prepare request body
    const requestBody = {
        courierId: 0,
        customerName: 'string',
        customerPhone: 'string',
        comment: 'string',
        id: 0,
    }
    // Send a POST request to the server
    const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
        data: requestBody,
    })
    const responseBody = await response.json();

    // Log the response status and body
    console.log('response status:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
    expect(responseBody.status).toBe("OPEN");
})


test('post order with empty data should receive code 200', async ({ request }) => {
    // prepare request body
    const requestBody = {}
    // Send a POST request to the server
    const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
        data: requestBody,
    })
    const responseBody = await response.json();

    // Log the response status and body
    console.log('response status:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
    expect(responseBody.status).toBeNull();
})