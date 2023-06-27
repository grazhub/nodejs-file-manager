const prefix = '--username=';

export const getUsername = () => {
	const args = process.argv.slice(2);
	const username = args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);

	return username || 'User';
};
