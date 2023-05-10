import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../src/configs/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserSchema } from './user.model';

@Module({
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
		PassportModule,
		ConfigModule,
	],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
