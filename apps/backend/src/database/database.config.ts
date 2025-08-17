import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { SocialAccount } from '../models/social-account.entity';
import { ScheduledPost } from '../models/scheduled-post.entity';
import { PostMetric } from '../models/post-metric.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  ...(process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'social_ia',
      }),
  ssl: process.env.DATABASE_URL?.includes('supabase') || process.env.DATABASE_URL?.includes('render')
    ? { rejectUnauthorized: false }
    : false,
  entities: [User, SocialAccount, ScheduledPost, PostMetric],
  synchronize: process.env.NODE_ENV !== 'production', // Solo para desarrollo
};