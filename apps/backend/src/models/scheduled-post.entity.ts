import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { SocialAccount } from './social-account.entity';
import { PostMetric } from './post-metric.entity';

@Entity('scheduled_posts')
export class ScheduledPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ type: 'simple-array', nullable: true })
  mediaUrls: string[];

  @Column()
  scheduledDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  publishedDate: Date;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'published', 'failed'

  @Column({ nullable: true })
  failureReason: string;

  @Column({ nullable: true })
  platformPostId: string; // ID de la publicación en la plataforma social

  @Column({ nullable: true })
  platformPostUrl: string;

  @Column({ type: 'float', nullable: true })
  predictedEngagement: number; // Predicción de engagement por IA

  @ManyToOne(() => User, (user) => user.scheduledPosts)
  user: User;

  @ManyToOne(() => SocialAccount, (account) => account.scheduledPosts)
  socialAccount: SocialAccount;

  @OneToMany(() => PostMetric, (metric) => metric.scheduledPost)
  metrics: PostMetric[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}