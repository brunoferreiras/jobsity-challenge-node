import { ConfigService } from "@nestjs/config"
import { Test, TestingModule } from "@nestjs/testing"
import { mockUser } from "../../test/helpers"
import { CreateUserDto } from "./dto/create-user.dto"
import { UserEntity } from "./entities/user.entity"
import { UserNotFound } from "./exceptions/user-not-found.exception"
import { UsersRepository } from "./users.repository"
import { UsersService } from "./users.service"

jest.mock('bcrypt')

describe('UsersService', () => {
  let service: UsersService
  let repository: UsersRepository
  let userMock: UserEntity

  beforeEach(async () => {
    const usersRepositoryMock = {
      getByEmail: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
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

  describe('findById', () => {
    it('should be throw if repository throw', async () => {
      jest.spyOn(repository, 'getById').mockRejectedValue(new Error())
      await expect(service.findById('INVALID')).rejects.toThrow(
        new Error(),
      )
    })

    it('should be throw UserNotFound if repository return undefined', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(undefined)
      await expect(service.findById('any_email')).rejects.toThrow(
        new UserNotFound('any_email')
      )
    })

    it('should be called repository with correct params', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(userMock)
      await service.findById('any_email')
      expect(repository.getById).toBeCalledWith('any_email')
      expect(repository.getById).toBeCalledTimes(1)
    })

    it('should be return when repository return', async () => {
      jest.spyOn(repository, 'getById').mockResolvedValue(userMock)
      expect(await service.findById('any_email')).toEqual(userMock)
    })
  })

  describe('createUser', () => {
    it('should be throw if repository throw', async () => {
      const dto: CreateUserDto = { email: 'any_email' }
      jest.spyOn(repository, 'save').mockRejectedValue(new Error())
      await expect(service.createUser(dto)).rejects.toThrow(
        new Error(),
      )
    })

    it('should be return when repository return', async () => {
      const dto: CreateUserDto = { email: 'any_email' }
      jest.useFakeTimers('modern').setSystemTime(new Date(2020, 9, 1, 7));
      jest.spyOn(repository, 'create').mockImplementation(() => ({ 
        ...dto, password: 'any_hash',
      } as any))
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser())
      expect(await service.createUser(dto)).toEqual({
        email: 'any_email',
        password: 'eff91cab11ce37645f3a171e64c79ce4'
      })
    })
  })
})