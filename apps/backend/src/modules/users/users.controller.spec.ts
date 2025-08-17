import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../models/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [{ id: '1', name: 'Test User' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedUsers as User[]);
      
      const result = await controller.findAll();
      expect(result).toBe(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = { id: '1', name: 'Test User' };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser as User);
      
      const result = await controller.findOne('1');
      expect(result).toBe(expectedUser);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  // Más pruebas para otros endpoints...
});