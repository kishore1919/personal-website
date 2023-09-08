import childProcess from 'child_process';

const main = () => {
	const environment = (process.argv.at(2) ?? '').replace(/-/g, '');
	console.log({ environment });
	childProcess.execSync(`cp config/.env.${environment} .env`, {
		stdio: 'inherit',
	});
};

main();
