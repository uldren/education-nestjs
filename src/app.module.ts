import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './configs/mongo.config';
import { getTelegramConfig } from './configs/telegram.config';
import { FilesModule } from './files/files.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),

		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		FilesModule,
		SitemapModule,

		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),

		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTelegramConfig,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
