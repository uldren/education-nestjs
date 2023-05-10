import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
	controllers: [ReviewController],
	providers: [ReviewService],
	imports: [
		MongooseModule.forFeature([{ name: 'review', schema: ReviewSchema }]),
	],
})
export class ReviewModule {}
