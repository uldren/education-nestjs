import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuards } from '../../src/auth/guards/jwt.guards';
import { UserEmail } from '../../src/decorators/user-email.decorator';
import { IdValidationPipe } from '../../src/pipes/id-validation.pipe';
import { TelegramService } from '../../src/telegram/telegram.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService,
	) {}

	@UseGuards(JwtAuthGuards)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuards)
	@UsePipes(new ValidationPipe({ transform: true }))
	@Post('notify')
	async notify(@Body() dto: CreateReviewDto) {
		const message = `Имя: ${dto.name}\n
		Заголовок: ${dto.title}\n
		Описание: ${dto.description}\n
		Рейтинг: ${dto.rating}\n
		ID продукта: ${dto.productId}`;

		return this.telegramService.sendMessage(message);
	}

	@UseGuards(JwtAuthGuards)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuards)
	@Get('byProduct/:productId')
	async getByProductId(
		@Param('productId', IdValidationPipe) productId: string,
		@UserEmail() email: string,
	) {
		console.log(email);
		return this.reviewService.findByProductId(productId);
	}

	@UseGuards(JwtAuthGuards)
	@Delete('byProduct/:productId')
	async deleteByProductId(
		@Param('productId', IdValidationPipe) productId: string,
	) {
		return this.reviewService.deleteByProductId(productId);
	}
}
