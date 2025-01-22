import { expect, test } from '@playwright/test'
import { CustomerDto } from './DTO/CustomerDto'
import { StatusCodes } from 'http-status-codes'

test('High Risk customer should receive negative loan decision', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: CustomerDto.generateHighRiskCustomerDto(),
    },
  )
  const responseBody = await response.json()

  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(17.2)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([])
  expect.soft(responseBody.riskDecision).toBe('negative')
})

test('Medium Risk customer should receive positive loan decision', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: CustomerDto.generateMediumRiskCustomerDto(),
    },
  )
  const responseBody = await response.json()

  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(1.01875)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.riskDecision).toBe('positive')
})

test('Low Risk customer should receive positive loan decision', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: CustomerDto.generateLowRiskCustomerDto(),
    },
  )
  const responseBody = await response.json()

  expect(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(2.0375)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
  expect.soft(responseBody.riskDecision).toBe('positive')
})
