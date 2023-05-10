import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { connection } from 'mongoose';
import {
	USER_NOT_FOUND_ERROR,
	WRONG_PASSWORD_ERROR,
} from '../src/auth/auth.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const loginDtoSuccess: AuthDto = {
	login: 'dev@ant-bagrov.ru',
	password: '1234',
};

const loginDtoUserFail: AuthDto = {
	login: 'ifademan@gmail.com',
	password: '1234',
};

const loginDtoPassFail: AuthDto = {
	login: 'dev@ant-bagrov.ru',
	password: '4321',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {});

	afterAll(async () => {
		await connection.close();
	});

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - login success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDtoSuccess)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toHaveProperty('access_token');
			});
	});

	it('/auth/login (POST) - user fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDtoUserFail)
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - password fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDtoPassFail)
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized',
			});
	});
});
