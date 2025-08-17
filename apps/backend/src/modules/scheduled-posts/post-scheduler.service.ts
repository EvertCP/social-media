import { Injectable } from '@nestjs/common';
import { ScheduledPostsService } from './scheduled-posts.service';
import { ScheduledPost } from '../../models/scheduled-post.entity';
import { SocialService } from '../social/social.service';
import { FacebookService } from '../social/facebook.service';
import { InstagramService } from '../social/instagram.service';
import { LinkedInService } from '../social/linkedin.service';
import { TikTokService } from '../social/tiktok.service';

@Injectable()
export class PostSchedulerService {
  constructor(
    private readonly scheduledPostsService: ScheduledPostsService,
    private readonly socialService: SocialService,
    private readonly facebookService: FacebookService,
    private readonly instagramService: InstagramService,
    private readonly linkedinService: LinkedInService,
    private readonly tiktokService: TikTokService,
  ) {}

  async schedulePost(postData: Partial<ScheduledPost>): Promise<ScheduledPost> {
    // Asegurarse de que el estado sea 'scheduled' si no se proporciona
    if (!postData.status) {
      postData.status = 'scheduled';
    }
    
    // Predecir el engagement si no se proporciona
    if (!postData.predictedEngagement) {
      postData.predictedEngagement = await this.predictEngagement(postData);
    }
    
    return this.scheduledPostsService.create(postData);
  }

  // Método para ejecutar las publicaciones programadas
  async executeScheduledPosts(): Promise<void> {
    const now = new Date();
    const postsToPublish = await this.scheduledPostsService.findAll();
    
    // Filtrar posts que deben publicarse ahora
    const readyPosts = postsToPublish.filter(post => 
      post.status === 'scheduled' && 
      post.scheduledDate <= now
    );
    
    // Publicar cada post
    for (const post of readyPosts) {
      try {
        const result = await this.publishPost(post);
        
        // Actualizar el estado y la información de la publicación
        await this.scheduledPostsService.update(post.id, {
          status: 'published',
          platformPostId: result.id,
          publishedDate: new Date(),
        });
      } catch (error) {
        // Actualizar el estado a fallido
        await this.scheduledPostsService.update(post.id, {
          status: 'failed',
          failureReason: error.message,
        });
      }
    }
  }

  // Método para publicar en la plataforma correspondiente
  private async publishPost(post: ScheduledPost): Promise<any> {
    const platform = post.socialAccount.platform;
    const accountId = post.socialAccount.id;
    const content = post.content;
    const mediaUrls = post.mediaUrls || [];
    
    switch (platform) {
      case 'facebook':
        return this.facebookService.publishPost(accountId, content, mediaUrls);
      case 'instagram':
        return this.instagramService.publishPost(accountId, content, mediaUrls);
      case 'linkedin':
        return this.linkedinService.publishPost(accountId, content, mediaUrls);
      case 'tiktok':
        return this.tiktokService.publishPost(accountId, content, mediaUrls);
      default:
        throw new Error(`Plataforma no soportada: ${platform}`);
    }
  }

  // Método para predecir el engagement de una publicación
  private async predictEngagement(postData: Partial<ScheduledPost>): Promise<number> {
    // Factores que afectan el engagement
    const scheduledDate = postData.scheduledDate ? new Date(postData.scheduledDate) : new Date();
    const factors = {
      contentLength: postData.content ? postData.content.length : 0,
      hasMedia: postData.mediaUrls && postData.mediaUrls.length > 0,
      timeOfDay: scheduledDate.getHours(),
      dayOfWeek: scheduledDate.getDay(),
    };
    
    // Algoritmo simple de predicción
    let score = 50; // Base score
    
    // Contenido óptimo entre 80-150 caracteres
    if (factors.contentLength > 0) {
      if (factors.contentLength < 80) {
        score -= 10;
      } else if (factors.contentLength > 150) {
        score -= 5;
      } else {
        score += 10;
      }
    }
    
    // Presencia de media
    if (factors.hasMedia) {
      score += 15;
    }
    
    // Hora del día (mejor entre 9-11 AM y 7-9 PM)
    if ((factors.timeOfDay >= 9 && factors.timeOfDay <= 11) || 
        (factors.timeOfDay >= 19 && factors.timeOfDay <= 21)) {
      score += 10;
    }
    
    // Día de la semana (mejor en miércoles, jueves y viernes)
    if (factors.dayOfWeek >= 3 && factors.dayOfWeek <= 5) {
      score += 5;
    }
    
    // Normalizar score entre 0-100
    return Math.max(0, Math.min(100, score));
  }
}