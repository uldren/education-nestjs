import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
			{ dbName: process.env.MONGO_DATABASE },
		),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
