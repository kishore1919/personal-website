import process from 'process';

// eslint-disable-next-line import/no-extraneous-dependencies
import { includeIgnoreFile } from '@eslint/compat';
// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from '@eslint/js';
import { node, next } from '@poolofdeath20/eslint-config';
import tseslint from 'typescript-eslint';

const allowedFor = ['Link', 'Image'];

export default tseslint.config(
	includeIgnoreFile(`${process.cwd()}/.gitignore`),
	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	node,
	{
		...next,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			...next.rules,
			'react/forbid-component-props': [
				'error',
				{
					forbid: [
						{
							propName: 'style',
							allowedFor,
							message: `Props "style" is forbidden for all components except ${allowedFor
								.map((component) => {
									return `"${component}"`;
								})
								.join(', ')}`,
						},
					],
				},
			],
		},
	},
	{
		files: ['script/mongo-setup/document.js'],
		rules: {
			'no-undef': 'off',
		},
		extends: [tseslint.configs.disableTypeChecked],
	}
);
