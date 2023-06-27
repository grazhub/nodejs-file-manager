import os from 'os';

const prefix = '--';

export const getOsInform = (option) => {
	const optionVal = option?.replace(prefix, '');

	switch (optionVal) {
		case 'EOL':
			getOsEOL();
			break;
		case 'cpus':
			getCpusInfo();
			break;
		case 'homedir':
			getHomeDir();
			break;
		case 'username':
			getUserName();
			break;
		case 'architecture':
			getCpuArchitecture();
			break;
	
		default:
			break;
	}

}

const getOsEOL = async () => {
	try {
		const eol = JSON.stringify(os.EOL);
		console.log(`System EOL: ${eol}`);
	} catch (error) {
		console.error('Operation failed', error);
	}
};

const getCpusInfo = async () => {
	try {
		const cpusInfo = os.cpus().map(({ model, speed }) => ({
			model,
			speed: `${speed} MHz`,
		}));
		console.table(cpusInfo);
	} catch (error) {
		console.error('Operation failed', error);
	}
};

const getHomeDir = async () => {
	try {
		const homedir = os.homedir();
    	console.log(`Home directory: ${homedir}`);
	} catch (error) {
		console.error('Operation failed', error);
	}
};

const getUserName = async () => {
	try {
		const { username } = os.userInfo();
    	console.log(`System username is ${username}`);
	} catch (error) {
		console.error('Operation failed', error);
	}
};

const getCpuArchitecture = async () => {
	try {
		const architecture = os.arch();
    	console.log(`CPU Architecture is ${architecture}`);
	} catch (error) {
		console.error('Operation failed', error);
	}
};
