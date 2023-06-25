const prefix = '--username=';

export const getUsername = () => {
	const args = process.argv.slice(2);
  
	// const processArgs = {};
	const username = args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
	// args.forEach((arg) => {
	// 	if (arg.startsWith(prefix)) {
	// 		const [name, value] = arg.split('=');
	//   		processArgs[name.replace(prefix, '')] = value;
	// 	}
	// });

	return username || 'User';
};
