import { describe, expect, it } from 'vitest';
import { chunkDatas } from '../../src/web/logical-operation';

describe('Logical Operation', () => {
	describe('Data Processing', () => {
		it.each([
			{
				input: {
					data: Array.from({ length: 15 }, (_, index) => {
						return index;
					}),
					perChunk: 5,
				},
				output: [
					[0, 1, 2, 3, 4],
					[5, 6, 7, 8, 9],
					[10, 11, 12, 13, 14],
				],
			},
			{
				input: {
					data: Array.from({ length: 14 }, (_, index) => {
						return index;
					}),
					perChunk: 5,
				},
				output: [
					[0, 1, 2, 3, 4],
					[5, 6, 7, 8, 9],
					[10, 11, 12, 13],
				],
			},
		])('should return a chunked array of any given array', (value) => {
			expect(chunkDatas(value.input)).toStrictEqual(value.output);
		});
	});
});
