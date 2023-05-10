import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5)
	@Min(1, { message: 'Рейтинг не может быть меньше 1' })
	@IsNumber()
	rating: number;

	@IsNotEmpty()
	@Type(() => Types.ObjectId)
	@Transform(({ value }) => Types.ObjectId.createFromHexString(value))
	productId: Types.ObjectId;
}
