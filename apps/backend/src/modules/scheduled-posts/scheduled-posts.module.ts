import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPostsController } from './scheduled-posts.controller';
import { ScheduledPostsService } from './scheduled-posts.service';
import { ScheduledPost } from '../../models/scheduled-post.entity';
import { PostSchedulerService } from './post-scheduler.service';
import { SocialModule } from '../social/social.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduledPost]),
    SocialModule,
  ],
  controllers: [ScheduledPostsController],
  providers: [ScheduledPostsService, PostSchedulerService],
  exports: [ScheduledPostsService, PostSchedulerService],
})
export class ScheduledPostsModule {}