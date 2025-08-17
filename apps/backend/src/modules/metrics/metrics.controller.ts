import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { PostMetric } from '../../models/post-metric.entity';
// import { AuthGuard } from '@nestjs/passport';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<PostMetric[]> {
    return this.metricsService.findAll();
  }

  @Get('post/:postId')
  // @UseGuards(AuthGuard('jwt'))
  async findByPost(@Param('postId') postId: string): Promise<PostMetric[]> {
    return this.metricsService.findByPost(postId);
  }

  @Get('user/:userId')
  // @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param('userId') userId: string): Promise<PostMetric[]> {
    return this.metricsService.findByUser(userId);
  }

  @Get('user/:userId/summary')
  // @UseGuards(AuthGuard('jwt'))
  async getUserMetricsSummary(@Param('userId') userId: string): Promise<any> {
    return this.metricsService.getUserMetricsSummary(userId);
  }

  @Post('fetch')
  // @UseGuards(AuthGuard('jwt'))
  async fetchLatestMetrics(): Promise<{ success: boolean }> {
    await this.metricsService.fetchLatestMetrics();
    return { success: true };
  }
}