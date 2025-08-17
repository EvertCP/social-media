import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { ScheduledPost } from './scheduled-post.entity';
import { PostMetric } from './post-metric.entity';

@Entity('social_accounts')
export class SocialAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  platform: string; // 'instagram', 'facebook', 'linkedin', 'tiktok'

  @Column()
  accountId: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'json', nullable: true })
  accessToken: any;

  @Column({ type: 'json', nullable: true })
  refreshToken: any;

  @Column({ nullable: true })
  tokenExpiresAt: Date;

  @ManyToOne(() => User, (user) => user.socialAccounts)
  user: User;

  @OneToMany(() => ScheduledPost, (post) => post.socialAccount)
  scheduledPosts: ScheduledPost[];

  @OneToMany(() => PostMetric, (metric) => metric.socialAccount)
  metrics: PostMetric[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}