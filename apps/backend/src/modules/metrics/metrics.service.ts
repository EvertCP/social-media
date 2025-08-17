import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostMetric } from '../../models/post-metric.entity';
import { ScheduledPost } from '../../models/scheduled-post.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(PostMetric)
    private metricsRepository: Repository<PostMetric>,
    @InjectRepository(ScheduledPost)
    private postsRepository: Repository<ScheduledPost>,
  ) {}

  async findAll(): Promise<PostMetric[]> {
    return this.metricsRepository.find({
      relations: ['scheduledPost', 'socialAccount'],
    });
  }

  async findByPost(postId: string): Promise<PostMetric[]> {
    return this.metricsRepository.find({
      where: { scheduledPost: { id: postId } },
      relations: ['socialAccount'],
    });
  }

  async findByUser(userId: string): Promise<PostMetric[]> {
    return this.metricsRepository.find({
      where: { scheduledPost: { user: { id: userId } } },
      relations: ['scheduledPost', 'socialAccount'],
    });
  }

  // Método para obtener un resumen de métricas por usuario
  async getUserMetricsSummary(userId: string): Promise<any> {
    const metrics = await this.findByUser(userId);
    
    // Calcular totales
    const totalLikes = metrics.reduce((sum, metric) => sum + metric.likes, 0);
    const totalComments = metrics.reduce((sum, metric) => sum + metric.comments, 0);
    const totalShares = metrics.reduce((sum, metric) => sum + metric.shares, 0);
    const totalViews = metrics.reduce((sum, metric) => sum + metric.views, 0);
    
    // Calcular por plataforma
    const platformMetrics = {};
    metrics.forEach(metric => {
      const platform = metric.socialAccount.platform;
      if (!platformMetrics[platform]) {
        platformMetrics[platform] = {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
          posts: 0,
        };
      }
      
      platformMetrics[platform].likes += metric.likes;
      platformMetrics[platform].comments += metric.comments;
      platformMetrics[platform].shares += metric.shares;
      platformMetrics[platform].views += metric.views;
      platformMetrics[platform].posts += 1;
    });
    
    return {
      totals: {
        likes: totalLikes,
        comments: totalComments,
        shares: totalShares,
        views: totalViews,
        posts: metrics.length,
      },
      byPlatform: platformMetrics
    };
  }

  // Método para obtener métricas actualizadas de las redes sociales
  async fetchLatestMetrics(): Promise<void> {
    const publishedPosts = await this.postsRepository.find({
      where: { status: 'published' },
      relations: ['socialAccount'],
    });
    
    for (const post of publishedPosts) {
      // Verificar si ya existe una métrica para hoy
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const existingMetric = await this.metricsRepository.findOne({
        where: {
          scheduledPost: { id: post.id },
          collectedAt: today,
        },
      });
      
      if (!existingMetric) {
        // Crear una nueva métrica con valores aleatorios
        const newMetric = this.metricsRepository.create({
          scheduledPost: post,
          socialAccount: post.socialAccount,
          collectedAt: today,
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          shares: Math.floor(Math.random() * 10),
          views: Math.floor(Math.random() * 500),
        });
        
        await this.metricsRepository.save(newMetric);
      }
    }
  }
}