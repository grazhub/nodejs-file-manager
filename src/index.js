import os from 'os';
import readline from 'readline';
import { changeDir, getUpperDir, listDir } from './commands/navigation.js';
import { getUsername } from './utils/getUsername.js';

const homedir = os.homedir();
let currentPath = homedir;
const rl = readline.createInterface({
	input: process.stdin,
    output: process.stdout,
});

const goCommand = (command) => {
  	const [operation, option] = command.split(' ');
	
	switch (operation) {
		case 'up':
			const newPath = currentPath !== homedir ? getUpperDir(currentPath) : currentPath;
			process.chdir(newPath);
			currentPath = newPath;
			break;
		case 'cd':
			const pathToDirectory = option;
			changeDir(pathToDirectory);
			break;
		case 'ls':
			listDir(currentPath);
			break;
	
		default:
			break;
	}
}

process.chdir(homedir);

const FileManager = async () => {
	const username = getUsername();

	console.log(`Welcome to the File Manager, ${username}!`);
	console.info('You are currently in', homedir);

	rl.on('line', (input) => {
		const command = input.trim();
		command === '.exit' && rl.close();
		goCommand(command);

		currentPath = process.cwd();
		console.info(`You are currently in ${currentPath}>`);
	});
	rl.on('close', () => {
		console.log(`Thank you for using File Manager, ${username}, goodbye!`);
		process.exit(0);
	});
}

await FileManager();