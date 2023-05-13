import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TopPageModule } from 'src/top-page/top-page.module';
import { SitemapController } from './sitemap.controller';

@Module({
	controllers: [SitemapController],
	imports: [TopPageModule],
	providers: [ConfigService],
})
export class SitemapModule {}
