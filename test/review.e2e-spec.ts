import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Types, connection } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const productDto: CreateReviewDto = {
	name: 'Картошка',
	title: 'Мешок картошки',
	description: 'Описание продукта',
	rating: 4,
	productId,
};

const loginDto: AuthDto = {
	login: 'dev@ant-bagrov.ru',
	password: '1234',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

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

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);
		token = body.access_token;
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(productDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...productDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body);
			});
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toHaveLength(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toHaveLength(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});
});
