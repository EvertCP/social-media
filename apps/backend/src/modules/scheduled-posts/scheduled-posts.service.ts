import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledPost } from '../../models/scheduled-post.entity';

@Injectable()
export class ScheduledPostsService {
  constructor(
    @InjectRepository(ScheduledPost)
    private postsRepository: Repository<ScheduledPost>,
  ) {}

  async findAll(): Promise<ScheduledPost[]> {
    return this.postsRepository.find({
      relations: ['user', 'socialAccount'],
    });
  }

  async findOne(id: string): Promise<ScheduledPost | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'socialAccount'],
    });
  }

  async findByUser(userId: string): Promise<ScheduledPost[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['socialAccount'],
    });
  }

  async create(postData: Partial<ScheduledPost>): Promise<ScheduledPost> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async update(id: string, postData: Partial<ScheduledPost>): Promise<ScheduledPost | null> {
    await this.postsRepository.update(id, postData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}