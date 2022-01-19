import { ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { mockUser } from "../../test/helpers"
import { UserEntity } from "./entities/user.entity"
import { UserNotFound } from "./exceptions/user-not-found.exception"
import { UsersRepository } from "./users.repository"
import { UsersService } from "./users.service"

describe('UsersService', () => {
  let service: UsersService
  let repository: UsersRepository
  let userMock: UserEntity

  beforeEach(async () => {
    const usersRepositoryMock = {
      getByEmail: jest.fn(),
      getById: jest.fn()
    }
    const configServiceMock = {
      get: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersRepository, useValue: usersRepositoryMock },
        { provide: ConfigService, useValue: configServiceMock },
        UsersService
      ],
    }).compile()
    service = module.get<UsersService>(UsersService)
    repository = module.get<UsersRepository>(UsersRepository)
    userMock = mockUser()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('findByEmail', () => {
    it('should be throw if repository throw', async () => {
      jest.spyOn(repository, 'getByEmail').mockRejectedValue(new Error())
      await expect(service.findByEmail('INVALID')).rejects.toThrow(
        new Error(),
      )
    })

    it('should be throw UserNotFound if repository return undefined', async () => {
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(undefined)
      await expect(service.findByEmail('any_email')).rejects.toThrow(
        new UserNotFound('any_email')
      )
    })

    it('should be called repository with correct params', async () => {
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(userMock)
      await service.findByEmail('any_email')
      expect(repository.getByEmail).toBeCalledWith('any_email')
      expect(repository.getByEmail).toBeCalledTimes(1)
    })

    it('should be return when repository return', async () => {
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(userMock)
      expect(await service.findByEmail('any_email')).toEqual(userMock)
    })
  })
})