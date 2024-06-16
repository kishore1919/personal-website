import child from 'child_process';

import { Defined } from '@poolofdeath20/util';

export default class Server {
	private constructor(private readonly port: number) {}

	static readonly of = (port: number) => {
		return new this(port);
	};

	readonly getPort = () => {
		return this.port;
	};

	readonly kill = () => {
		child
			.execSync('ps -ef | grep next', {
				encoding: 'utf-8',
			})
			.split('\n')
			.filter((process) => {
				return process.includes('node ');
			})
			.map((process) => {
				return Defined.parse(process.split(' ').filter(Boolean).at(1))
					.map(parseInt)
					.orThrow('Could not parse process id');
			})
			.forEach((pid) => {
				child.execSync(`kill ${pid}`);
			});
	};

	readonly start = async () => {
		const server = child
			.exec(`make start arguments="-p ${this.port}"`)
			.on('spawn', () => {
				return console.log('spawned server');
			})
			.on('message', console.log)
			.on('error', console.error)
			.on('kill', this.kill);

		server.stdout?.setEncoding('utf-8');
		server.stderr?.setEncoding('utf-8');

		await new Promise<void>((resolve) => {
			server.stdout?.on('data', (data: string) => {
				if (data.includes(`${this.port}`)) {
					resolve();
				}
			});
		});
	};
}
