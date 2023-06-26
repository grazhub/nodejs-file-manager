import path from 'path';
import { readdir } from 'fs/promises';

export const getUpperDir = (currentPath) => {
  	return path.dirname(currentPath);
};

export const changeDir = (targetPath) => {
	if (!targetPath) return;
	try {
		process.chdir(targetPath);
	} catch (error) {
		console.error('Operation failed');
	}
};

export const listDir = async (currentPath) => {
	try {
		const dirList = await readdir(currentPath, { withFileTypes: true });

		const formattedList = dirList.map((el) => ({
			name: el.name,
			type: el.isFile() ? 'file' : 'directory'
		}));

		formattedList.sort((a, b) => {
			const typeCompare = a.type < b.type && -1 || a.type > b.type && 1 || 0;
			const nameCompare = a.name < b.name && -1 || a.name > b.name && 1 || 0;
			
			return typeCompare !== 0 ? typeCompare : nameCompare;
		});

		console.table(formattedList);
	} catch (error) {
		console.error('Operation failed');
	}
};
