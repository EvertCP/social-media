import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../../models/user.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [{ id: '1', name: 'Test User' }];
      userRepository.find.mockReturnValue(expectedUsers);
      
      const users = await service.findAll();
      expect(users).toEqual(expectedUsers);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = { id: '1', name: 'Test User' };
      userRepository.findOne.mockReturnValue(expectedUser);
      
      const user = await service.findOne('1');
      expect(user).toEqual(expectedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { name: 'New User', email: 'test@example.com' };
      const expectedUser = { id: '1', ...userData };
      
      userRepository.create.mockReturnValue(userData);
      userRepository.save.mockReturnValue(expectedUser);
      
      const result = await service.create(userData);
      expect(result).toEqual(expectedUser);
      expect(userRepository.create).toHaveBeenCalledWith(userData);
      expect(userRepository.save).toHaveBeenCalledWith(userData);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userData = { name: 'Updated User' };
      const expectedUser = { id: '1', ...userData };
      
      userRepository.findOne.mockReturnValue(expectedUser);
      
      const result = await service.update('1', userData);
      expect(result).toEqual(expectedUser);
      expect(userRepository.update).toHaveBeenCalledWith('1', userData);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      await service.remove('1');
      expect(userRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});