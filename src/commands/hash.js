import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export const calculateHash = async (filePath) => {
	const resolvedPath = path.resolve(process.cwd(), filePath);
	let readableStream;
	try {
		const hash = createHash('sha256');
		readableStream = createReadStream(resolvedPath);

		await pipeline(readableStream, hash);
		const hashHex = hash.digest('hex');
		console.log(hashHex);
	} catch (err) {
		console.error('Operation failed. ', err);
	} finally {
		readableStream?.close();
	}
}
