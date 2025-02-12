import { expect, test } from '@playwright/test'
import { UserApiClient } from '../api/UserApiClient'


test.describe('User management app tests using API client ', async () => {

  test('Create user and verify user is created', async({request})=>{
    const userApiClient = new UserApiClient(request)
    await userApiClient.deleteAllUsers();
    const createdUser = await userApiClient.createUser()
    const returnedUser = await userApiClient.findUserById(createdUser.id)
    expect(createdUser).toStrictEqual(returnedUser)
  })

  test('Create user, delete user, verify user is deleted ', async({request})=>{
    const userApiClient =  new UserApiClient(request)
    await userApiClient.deleteAllUsers();
    const createdUser = await userApiClient.createUser()
    await userApiClient.deleteUser(createdUser.id)
    const returnedUser = await userApiClient.findUserById(createdUser.id)
    expect (returnedUser.id).toBeUndefined();
  })

  test('Create 5 users and verify correct amount of users is created ', async({request})=>{
    const userApiClient =  new UserApiClient(request)
    await userApiClient.deleteAllUsers();
    await userApiClient.createUsers(5)
    expect((await userApiClient.getAllUsers()).length).toEqual(5)

  })

  test('Create 5 users, Delete all users and verify no users exist', async({request})=>{
    const userApiClient = new UserApiClient(request)
    await userApiClient.deleteAllUsers();
    await userApiClient.createUsers(5)
    await userApiClient.deleteAllUsers();
    expect(await userApiClient.getAllUsers()).toEqual([])
  })

})