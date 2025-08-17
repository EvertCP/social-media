import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccount } from '../../models/social-account.entity';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { FacebookService } from './facebook.service';
import { InstagramService } from './instagram.service';
import { LinkedInService } from './linkedin.service';
import { TikTokService } from './tiktok.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAccount])],
  controllers: [SocialController],
  providers: [
    SocialService,
    FacebookService,
    InstagramService,
    LinkedInService,
    TikTokService,
  ],
  exports: [
    SocialService,
    FacebookService,
    InstagramService,
    LinkedInService,
    TikTokService,
  ],
})
export class SocialModule {}