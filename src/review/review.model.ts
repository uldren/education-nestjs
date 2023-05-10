import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true, collection: 'review' })
export class ReviewModel {
	@Prop()
	name: string;
	@Prop()
	title: string;
	@Prop()
	description: string;
	@Prop()
	rating: number;
	@Prop({ type: Types.ObjectId, ref: 'product' })
	productId: Types.ObjectId;
	@Prop({ default: now() })
	createdAt: Date;
	@Prop({ default: now() })
	updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
