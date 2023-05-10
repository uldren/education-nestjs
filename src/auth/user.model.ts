import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true, collection: 'user' })
export class UserModel {
	@Prop({ unique: true, trim: true, lowercase: true })
	email: string;
	@Prop()
	passwordHash: string;
	@Prop({ default: now() })
	createdAt: Date;
	@Prop({ default: now() })
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
