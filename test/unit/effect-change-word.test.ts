import { describe, it, expect } from 'vitest';

import { scrambleAndShowBase } from '../../src/web/effect';

describe('Effect', () => {
	describe('Shuffle and change words', () => {
		it('should return an array of randomized characters', () => {
			const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const alphabetList = alphabets.split('');
			const content = 'Hi there';
			const listOfRandomStrings = scrambleAndShowBase(alphabets)({
				content,
				count: 5,
			});
			const lastItem = listOfRandomStrings.at(-1);

			expect(lastItem?.content === content).toBe(lastItem?.isSame);
			expect(
				listOfRandomStrings.filter((string) => {
					return (
						!string.isSame &&
						string.content.split('').every((character) => {
							return alphabetList.includes(character);
						})
					);
				})
			).toEqual(
				listOfRandomStrings.filter((_, index, { length }) => {
					return index + 1 < length;
				})
			);
		});
	});
});
