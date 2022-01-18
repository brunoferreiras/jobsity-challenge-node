import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { AuthenticationDto } from './dto/authentication.dto'
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { mockUser } from '../../test/helpers'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('AuthService', () => {
  let service: AuthService
  let usersService: UsersService
  let mockDto: AuthenticationDto
  beforeEach(async () => {
    const userServiceMock = {
      findByEmail: jest.fn(),
    }
    const jwtServiceMock = {
      sign: jest.fn().mockReturnValue('any_token'),
    }
    const configServiceMock = {
      get: jest.fn().mockReturnValue(3600),
    }
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: () => userServiceMock },
        { provide: JwtService, useFactory: () => jwtServiceMock },
        { provide: ConfigService, useFactory: () => configServiceMock },
      ],
    }).compile()
    service = moduleRef.get<AuthService>(AuthService)
    usersService = moduleRef.get<UsersService>(UsersService)

    mockDto = {
      email: 'any_email',
      password: 'any_password',
    }
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('login', () => {
    it('should be called findByEmail with correct params', async () => {
      const spyFindByEmail = jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(mockUser())
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))
      await service.login(mockDto)
      expect(spyFindByEmail).toBeCalledWith('any_email')
      expect(spyFindByEmail).toBeCalledTimes(1)
    })

    it('should be throw unauthorized when findByEmail throws', async () => {
      jest
        .spyOn(usersService, 'findByEmail')
        .mockRejectedValue(new InternalServerErrorException())

      await expect(service.login(mockDto)).rejects.toThrow(
        new UnauthorizedException(),
      )
    })

    it('should be throw unauthorized when wrong credentials provided', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser())
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false))
      await expect(service.login(mockDto)).rejects.toThrow(
        new UnauthorizedException(),
      )
    })

    it('should be return token when receive correct params', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser())
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))
      await expect(service.login(mockDto)).resolves.toEqual({
        access_token: 'any_token',
        token_type: 'Bearer',
        expires_in: 3600,
      })
    })
  })
})
