import os from 'os';
import readline from 'readline';
import { getUsername } from './utils/getUsername.js';

process.chdir(os.homedir());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const FileManager = async () => {
	const username = getUsername();

	console.log(`Welcome to the File Manager, ${username}!`);
	console.info('You are currently in', os.homedir());

	rl.on('line', (input) => {
		const command = input.trim();
		command === '.exit' && rl.close();

		currentPath = process.cwd();
		console.info(`You are currently in ${currentPath}>`);
	});
	rl.on('close', () => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		process.exit(0);
	});
}

await FileManager();