import { UserDto } from '../tests/DTO/UserDto'
import { APIRequestContext } from 'playwright-core'
import { expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const baseURL = 'http://localhost:3000'
const usersPath = '/users/'

export class UserApiClient {
  private request: APIRequestContext

  public constructor(request: APIRequestContext) {
    this.request = request
  }

  public async createUser(): Promise<UserDto> {
    const response = await this.request.post(`${baseURL}${usersPath}`)
    expect (response.status()).toBe(StatusCodes.CREATED)
    return UserDto.serializeResponse(await response.json())
  }

  public async createUsers(count: number): Promise<UserDto[]> {
    const users: UserDto[] = []
    for (let i = 0; i < count; i++) {
      users.push(await this.createUser())
    }
    return users
  }

  public async findUserById(userId?: number): Promise<UserDto> {
    const response = await this.request.get(`${baseURL}${usersPath}${userId}`)
    return UserDto.serializeResponse(await response.json())
  }

  public async getAllUsers(): Promise<any[]> {
    const response = await this.request.get(`${baseURL}${usersPath}`)
    return response.ok() ? await response.json() : []
  }

  public async deleteUser(userId?: number): Promise<void> {
    await this.request.delete(`${baseURL}${usersPath}${userId}`)
  }

  public async deleteAllUsers(): Promise<void> {
    const users = await this.getAllUsers()
    for (const user of users) {
      await this.deleteUser(user.id)
    }
  }
}
