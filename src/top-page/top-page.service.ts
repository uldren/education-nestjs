import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel('toppage')
		private topPageModel: Model<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto): Promise<TopPageModel> {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.find({ alias }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel
			.find({ $text: { $search: text, $caseSensitive: false } })
			.exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel
			.findByIdAndUpdate(id, dto, { new: true })
			.exec();
	}
}
