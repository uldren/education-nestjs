import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions(),
	};
};

const getMongoString = (configService: ConfigService) =>
	process.env.NODE_ENV === 'production'
		? 'mongodb://' +
		  configService.get('MONGO_USERNAME') +
		  ':' +
		  configService.get('MONGO_PASSWORD') +
		  '@' +
		  configService.get('MONGO_HOST') +
		  ':' +
		  configService.get('MONGO_PORT') +
		  '/' +
		  configService.get('MONGO_DATABASE')
		: 'mongodb://localhost:27017/test';

const getMongoOptions = () => ({
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
