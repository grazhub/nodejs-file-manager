import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compressFile = async (pathToFile, destPath) => {
	const resolvedFilePath = path.resolve(process.cwd(), pathToFile);
	const resolvedDestPath = path.resolve(process.cwd(), destPath, path.basename(resolvedFilePath));
	const brotli = createBrotliCompress();

	try {
		const readableStream = createReadStream(resolvedFilePath);
		const writableStream = createWriteStream(resolvedDestPath);
		await pipeline(readableStream, brotli, writableStream);
		console.log('File compressed');
	} catch (error) {
		console.error('Operation failed. ', error);
	}
};

export const decompressFile = async (pathToFile, destPath) => {
	const resolvedFilePath = path.resolve(process.cwd(), pathToFile);
	const resolvedDestPath = path.resolve(process.cwd(), destPath, path.basename(resolvedFilePath));
	const brotli = createBrotliDecompress();

	try {
		const readableStream = createReadStream(resolvedFilePath);
		const writableStream = createWriteStream(resolvedDestPath);
		await pipeline(readableStream, brotli, writableStream);
		console.log('File decompressed');
	} catch (error) {
		console.error('Operation failed. ', error);
	}
};
