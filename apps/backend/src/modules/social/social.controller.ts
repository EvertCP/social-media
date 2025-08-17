import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SocialService } from './social.service';
import { FacebookService } from './facebook.service';
import { InstagramService } from './instagram.service';
import { LinkedInService } from './linkedin.service';
import { TikTokService } from './tiktok.service';
import { SocialAccount } from '../../models/social-account.entity';
// import { AuthGuard } from '@nestjs/passport';

@Controller('social')
export class SocialController {
  constructor(
    private readonly socialService: SocialService,
    private readonly facebookService: FacebookService,
    private readonly instagramService: InstagramService,
    private readonly linkedinService: LinkedInService,
    private readonly tiktokService: TikTokService,
  ) {}

  @Get('accounts')
  // @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<SocialAccount[]> {
    return this.socialService.findAll();
  }

  @Get('accounts/user/:userId')
  // @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param('userId') userId: string): Promise<SocialAccount[]> {
    return this.socialService.findByUser(userId);
  }

  // Facebook endpoints
  @Get('auth/facebook')
  // @UseGuards(AuthGuard('jwt'))
  async getFacebookAuthUrl(): Promise<{ url: string }> {
    const url = await this.facebookService.getAuthUrl();
    return { url };
  }

  @Post('auth/facebook/callback')
  // @UseGuards(AuthGuard('jwt'))
  async handleFacebookCallback(
    @Body('code') code: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    return this.facebookService.handleCallback(code, userId);
  }

  @Post('publish/facebook/:accountId')
  // @UseGuards(AuthGuard('jwt'))
  async publishToFacebook(
    @Param('accountId') accountId: string,
    @Body('content') content: string,
    @Body('mediaUrls') mediaUrls: string[],
  ): Promise<any> {
    return this.facebookService.publishPost(accountId, content, mediaUrls);
  }

  // Instagram endpoints
  @Get('auth/instagram')
  // @UseGuards(AuthGuard('jwt'))
  async getInstagramAuthUrl(): Promise<{ url: string }> {
    const url = await this.instagramService.getAuthUrl();
    return { url };
  }

  @Post('auth/instagram/callback')
  // @UseGuards(AuthGuard('jwt'))
  async handleInstagramCallback(
    @Body('code') code: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    return this.instagramService.handleCallback(code, userId);
  }

  @Post('publish/instagram/:accountId')
  // @UseGuards(AuthGuard('jwt'))
  async publishToInstagram(
    @Param('accountId') accountId: string,
    @Body('content') content: string,
    @Body('mediaUrls') mediaUrls: string[],
  ): Promise<any> {
    return this.instagramService.publishPost(accountId, content, mediaUrls);
  }

  // LinkedIn endpoints
  @Get('auth/linkedin')
  // @UseGuards(AuthGuard('jwt'))
  async getLinkedInAuthUrl(): Promise<{ url: string }> {
    const url = await this.linkedinService.getAuthUrl();
    return { url };
  }

  @Post('auth/linkedin/callback')
  // @UseGuards(AuthGuard('jwt'))
  async handleLinkedInCallback(
    @Body('code') code: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    return this.linkedinService.handleCallback(code, userId);
  }

  @Post('publish/linkedin/:accountId')
  // @UseGuards(AuthGuard('jwt'))
  async publishToLinkedIn(
    @Param('accountId') accountId: string,
    @Body('content') content: string,
    @Body('mediaUrls') mediaUrls: string[],
  ): Promise<any> {
    return this.linkedinService.publishPost(accountId, content, mediaUrls);
  }

  // TikTok endpoints
  @Get('auth/tiktok')
  // @UseGuards(AuthGuard('jwt'))
  async getTikTokAuthUrl(): Promise<{ url: string }> {
    const url = await this.tiktokService.getAuthUrl();
    return { url };
  }

  @Post('auth/tiktok/callback')
  // @UseGuards(AuthGuard('jwt'))
  async handleTikTokCallback(
    @Body('code') code: string,
    @Body('userId') userId: string,
  ): Promise<any> {
    return this.tiktokService.handleCallback(code, userId);
  }

  @Post('publish/tiktok/:accountId')
  // @UseGuards(AuthGuard('jwt'))
  async publishToTikTok(
    @Param('accountId') accountId: string,
    @Body('content') content: string,
    @Body('mediaUrls') mediaUrls: string[],
  ): Promise<any> {
    return this.tiktokService.publishPost(accountId, content, mediaUrls);
  }
}