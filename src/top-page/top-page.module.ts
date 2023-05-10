import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { TopPageSchema } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
	controllers: [TopPageController],
	imports: [
		MongooseModule.forFeature([{ name: 'toppage', schema: TopPageSchema }]),
	],
	providers: [TopPageService],
})
export class TopPageModule {}
