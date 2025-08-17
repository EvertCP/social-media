import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ScheduledPostsService } from './scheduled-posts.service';
import { PostSchedulerService } from './post-scheduler.service';
import { ScheduledPost } from '../../models/scheduled-post.entity';
// import { AuthGuard } from '@nestjs/passport';

@Controller('scheduled-posts')
export class ScheduledPostsController {
  constructor(
    private readonly postsService: ScheduledPostsService,
    private readonly schedulerService: PostSchedulerService,
  ) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<ScheduledPost[]> {
    return this.postsService.findAll();
  }

  @Get('user/:userId')
  // @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param('userId') userId: string): Promise<ScheduledPost[]> {
    return this.postsService.findByUser(userId);
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<ScheduledPost | null> {
    return this.postsService.findOne(id);
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() postData: Partial<ScheduledPost>): Promise<ScheduledPost> {
    return this.postsService.create(postData);
  }

  @Post('schedule')
  // @UseGuards(AuthGuard('jwt'))
  async schedulePost(@Body() postData: Partial<ScheduledPost>): Promise<ScheduledPost> {
    return this.schedulerService.schedulePost(postData);
  }

  @Post('execute')
  // @UseGuards(AuthGuard('jwt'))
  async executeScheduledPosts(): Promise<{ success: boolean }> {
    await this.schedulerService.executeScheduledPosts();
    return { success: true };
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() postData: Partial<ScheduledPost>): Promise<ScheduledPost | null> {
    return this.postsService.update(id, postData);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}