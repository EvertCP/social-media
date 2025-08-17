import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { ScheduledPost } from './scheduled-post.entity';
import { SocialAccount } from './social-account.entity';

@Entity('post_metrics')
export class PostMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @Column({ default: 0 })
  shares: number;

  @Column({ default: 0 })
  views: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  engagement_rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  collectedAt: Date;

  @ManyToOne(() => ScheduledPost, (post) => post.metrics)
  @JoinColumn({ name: 'scheduled_post_id' })
  scheduledPost: ScheduledPost;

  @ManyToOne(() => SocialAccount, (account) => account.metrics)
  @JoinColumn({ name: 'social_account_id' })
  socialAccount: SocialAccount;

  @CreateDateColumn()
  createdAt: Date;
}