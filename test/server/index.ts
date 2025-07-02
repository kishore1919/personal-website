import child from 'child_process';

export default class Server {
	private serverProcess: child.ChildProcess | undefined;
	private constructor(private readonly port: number) {}

	static readonly of = (port: number) => {
		return new this(port);
	};

	readonly getPort = () => {
		return this.port;
	};

	readonly kill = () => {
		if (this.serverProcess) {
			this.serverProcess.kill();
		}
	};

	readonly start = async () => {
		this.serverProcess = child.spawn('pnpm', ['next', 'start', '-p', String(this.port)], {
			stdio: ['inherit', 'inherit', 'inherit'],
		});

		this.serverProcess.stdout?.setEncoding('utf-8');
		this.serverProcess.stderr?.setEncoding('utf-8');

		await new Promise<void>((resolve, reject) => {
			this.serverProcess?.stdout?.on('data', (data: string) => {
				console.log(`Server stdout: ${data}`);
				if (data.includes(`ready - started server on`)) {
					resolve();
				}
			});

			this.serverProcess?.stderr?.on('data', (data: string) => {
				console.error(`Server stderr: ${data}`);
			});

			this.serverProcess?.on('error', (err) => {
				reject(err);
			});
		});
	};
}
