import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from '../../models/social-account.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(SocialAccount)
    private socialAccountRepository: Repository<SocialAccount>,
  ) {}

  async findAll(): Promise<SocialAccount[]> {
    return this.socialAccountRepository.find({ relations: ['user'] });
  }

  async findByUser(userId: string): Promise<SocialAccount[]> {
    return this.socialAccountRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOne(id: string): Promise<SocialAccount | null> {
    return this.socialAccountRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(accountData: Partial<SocialAccount>): Promise<SocialAccount> {
    const account = this.socialAccountRepository.create(accountData);
    return this.socialAccountRepository.save(account);
  }

  async update(id: string, accountData: Partial<SocialAccount>): Promise<SocialAccount | null> {
    await this.socialAccountRepository.update(id, accountData);
    return this.findOne(id);
  }
  
  async remove(id: string): Promise<void> {
    await this.socialAccountRepository.delete(id);
  }
}