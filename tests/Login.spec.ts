import { expect, test } from '@playwright/test'
import { LoginDTO } from './DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'

test.describe("Login tests", async()=>{

  test('Successful authorization ', async ({ request }) => {
const response = await request.post('https://backend.tallinn-learning.ee/login/student',{
  data: LoginDTO.createLoginWithCorrectData()
})
    expect(response.status()).toBe(StatusCodes.OK)
  })
})

