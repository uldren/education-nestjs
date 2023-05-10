import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductChar {
	@Prop()
	name: string;
	@Prop()
	value: string;
}

@Schema({ timestamps: true, collection: 'product' })
export class ProductModel {
	@Prop()
	image: string;
	@Prop()
	title: string;
	@Prop()
	price: number;
	@Prop()
	oldPrice?: number;
	@Prop()
	credit: number;
	@Prop()
	calculatedRating: number;
	@Prop()
	description: string;
	@Prop()
	advantages: string;
	@Prop()
	disAdvantages: string;
	@Prop({ type: () => [String] })
	categories: string[];
	@Prop({ type: () => [String] })
	tags: string[];
	@Prop({ type: () => [ProductChar], _id: false })
	characteristics: ProductChar[];
	@Prop({ default: now() })
	createdAt: Date;
	@Prop({ default: now() })
	updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
