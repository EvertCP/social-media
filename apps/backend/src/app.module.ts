import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database/database.config';
import { UsersModule } from './modules/users/users.module';
import { ScheduledPostsModule } from './modules/scheduled-posts/scheduled-posts.module';
import { AuthModule } from './auth/auth.module';
import { SocialModule } from './modules/social/social.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    ScheduledPostsModule,
    AuthModule,
    SocialModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}