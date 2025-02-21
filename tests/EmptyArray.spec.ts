import { expect, test } from '@playwright/test'
import { UserDto } from './DTO/UserDto'

test.describe('User management app tests', async () => {
  test('TL-14-5 get empty user array', async ({ request }) => {
    const allUsersResponse = await request.get('http://localhost:3000/users')
    const json: UserDto[] = await allUsersResponse.json()

    expect(json.length).toBe(0)
  })
})
