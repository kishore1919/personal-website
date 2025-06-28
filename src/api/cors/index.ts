import type { Response } from '../endpoint';
import type { NextApiRequest, NextApiResponse } from 'next';

import Cors from 'cors';

const initMiddleware = <T>(
	middleware: (
		request: NextApiRequest,
		response: NextApiResponse<T>,
		callback: (result: unknown) => void
	) => void
) => {
	return (request: NextApiRequest, response: NextApiResponse<T>) => {
		return new Promise((resolve, reject) => {
			middleware(request, response, (result) => {
				return result instanceof Error
					? reject(result)
					: resolve(result);
			});
		});
	};
};

const cors = <T>() => {
	return initMiddleware<Response<T>>(
		Cors({
			credentials: true,
			origin: process.env['NEXT_PUBLIC_ORIGIN'],
		})
	);
};

// const config = {
//   port: process.env['MONGO_PORT'],
//   database: process.env['MONGO_DB'],
//   address: process.env['MONGO_ADDRESS'],
//   collections: {
//     // ...existing code...
//   }
// };

export default cors;
