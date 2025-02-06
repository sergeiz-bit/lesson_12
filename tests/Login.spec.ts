import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './DTO/OrderDto'
import { ApiClient } from '../api/ApiClient'
import { LoginDTO } from './DTO/LoginDTO'

test.describe('Login tests', async () => {
  test('TL-12-1 Successful authorization', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    expect(apiClient.jwt).toBeDefined()
  })

  test('TL-12-2 Successful authorization and order creation', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)

    const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + apiClient.jwt,
      },
    })
    console.log(await responseCreateOrder.text())
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-3 Successful authorization, order creation and order status', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()

    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${orderId}`,
      {
        headers: {
          Authorization: 'Bearer ' + apiClient.jwt,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDto.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('Delete order without API client', async ({ request }) => {
    const responseLogin = await request.post(`https://backend.tallinn-learning.ee/login/student`, {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post(`https://backend.tallinn-learning.ee/orders`, {
      data: OrderDto.generateRandomOrderDto(),
      headers: {
        Authorization: 'Bearer ' + (await responseLogin.text()),
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
    const createdOrder = OrderDto.serializeResponse(await responseCreateOrder.json())

    const responseOrderStatus = await request.delete(
      `https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,
      {
        headers: {
          Authorization: 'Bearer ' + (await responseLogin.text()),
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDto.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeUndefined()
  })

  test('Delete order with API client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    await apiClient.deleteOrderById(orderId)

    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${orderId}`,
      {
        headers: {
          Authorization: 'Bearer ' + apiClient.jwt,
        },
      },
    )
    const responseText = await responseOrderStatus.text() // Parse JSON response
    expect(responseText).toBe('') // Expect an empty object
  })
})
