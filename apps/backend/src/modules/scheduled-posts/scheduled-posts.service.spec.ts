import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledPostsService } from './scheduled-posts.service';
import { ScheduledPost } from '../../models/scheduled-post.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('ScheduledPostsService', () => {
  let service: ScheduledPostsService;
  let postRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduledPostsService,
        {
          provide: getRepositoryToken(ScheduledPost),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ScheduledPostsService>(ScheduledPostsService);
    postRepository = module.get<MockRepository>(getRepositoryToken(ScheduledPost));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of scheduled posts', async () => {
      const expectedPosts = [
        { 
          id: '1', 
          content: 'Test Post',
          scheduledDate: new Date(),
          status: 'scheduled'
        }
      ];
      postRepository.find.mockReturnValue(expectedPosts);
      
      const posts = await service.findAll();
      expect(posts).toEqual(expectedPosts);
      expect(postRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByUser', () => {
    it('should return posts for a specific user', async () => {
      const userId = '123';
      const expectedPosts = [
        { 
          id: '1', 
          content: 'Test Post',
          scheduledDate: new Date(),
          status: 'scheduled',
          user: { id: userId }
        }
      ];
      
      postRepository.find.mockReturnValue(expectedPosts);
      
      const posts = await service.findByUser(userId);
      expect(posts).toEqual(expectedPosts);
      expect(postRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['user', 'socialAccount'],
      });
    });
  });

  // Más pruebas para otros métodos...
});