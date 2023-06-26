import { createReadStream, createWriteStream, constants } from 'fs';
import { appendFile, writeFile, rename, copyFile as copy, access, rm } from 'fs/promises';
import { pipeline } from 'stream/promises';
import path from 'path';

export const readFile = async (filePath) => {
	try {
		const resolvedPath = path.resolve(process.cwd(), filePath);
		const readableStream = createReadStream(resolvedPath, { encoding: 'utf8' });
		for await (const chunk of readableStream) {
			console.log(chunk);
		}
		readableStream.on('error', (error) => console.log('Error of reading file: ', error));
	} catch (error) {
		console.error('Operation failed');
	}
};

export const createFile = async (fileName) => {
	const filePath = path.join(process.cwd(), fileName);
	try {
		await appendFile(filePath, '');
	} catch (error) {
		console.error('Operation failed');
	}
}

export const renameFile = async (pathToRenameFile, fileName) => {
	try {
		const currentPath = path.resolve(process.cwd(), pathToRenameFile);
		const newPath = path.resolve(path.dirname(currentPath), fileName);
		await rename(currentPath, newPath);
	} catch (error) {
		console.error('Operation failed');
	}
}

export const copyFile = async (pathToTargetFile, newDirectory) => {
	try {
		const currentPath = path.resolve(process.cwd(), pathToTargetFile);
		const newPath = path.join(process.cwd(), newDirectory, path.basename(currentPath));

		const readableStream = createReadStream(currentPath);
      	const writableStream = createWriteStream(newPath);

		await pipeline(readableStream, writableStream);
	} catch (error) {
		console.error('Operation failed');
	}
}

export const moveFile = async (pathToTargetFile, newDirectory) => {
	try {
		const currentPath = path.resolve(process.cwd(), pathToTargetFile);

		await copyFile(pathToTargetFile, newDirectory);
		await rm(currentPath, { recursive: true, force: true });
	} catch (error) {
		console.error('Operation failed');
	}
}

export const deleteFile = async (pathToTargetFile) => {
	try {
		const currentPath = path.resolve(process.cwd(), pathToTargetFile);
		await rm(currentPath, { recursive: true, force: true });
	} catch (error) {
		console.error('Operation failed');
	}
}
