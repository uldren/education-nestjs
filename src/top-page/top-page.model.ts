import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Servises,
	Books,
	Products,
}

export class HhData {
	@Prop()
	count: number;
	@Prop()
	juniorSalary: number;
	@Prop()
	middleSalary: number;
	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;
	@Prop()
	description: string;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema({ timestamps: true, collection: 'toppage' })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;
	@Prop()
	secondCategory: string;
	@Prop({ unique: true })
	alias: string;
	@Prop()
	title: string;
	@Prop()
	category: string;
	@Prop({ type: () => HhData })
	hh?: HhData;
	@Prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];
	@Prop()
	seoText: string;
	@Prop()
	tagTitle: string;
	@Prop({ type: () => [String] })
	tags: string[];
	@Prop({ default: now() })
	createdAt: Date;
	@Prop({ default: now() })
	updatedAt: Date;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

// TopPageSchema.index({ title: 'text', seoText: 'text' });
TopPageSchema.index({ '$**': 'text' });
