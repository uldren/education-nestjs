import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { FileElementResponce } from './dto/file-element.responce';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponce[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${path}/uploads/${dateFolder}`;
		const res: FileElementResponce[] = [];

		await ensureDir(uploadFolder);

		for (const file of files) {
			await writeFile(
				`${uploadFolder}/${file.originalname}`,
				file.buffer,
			);
			res.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
		}

		return res;
	}

	async convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
