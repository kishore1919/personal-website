import type { Argument, Return } from '@poolofdeath20/util';

const scrambleAndShowBase = (listOfCharacters: string) => {
	return ({
		count,
		content,
	}: Readonly<{
		count: number;
		content: string;
	}>) => {
		const generateWord = () => {
			return listOfCharacters.charAt(
				Math.floor(Math.random() * listOfCharacters.length)
			);
		};

		return Array.from(
			{
				length: count,
			},
			() => {
				const generatedContent = content
					.split('')
					.map(() => generateWord())
					.join('');
				return {
					content: generatedContent,
					isSame: content === generatedContent,
				};
			}
		).concat({
			content,
			isSame: true,
		});
	};
};

const scrambleAndShow = (
	param: Argument<Return<typeof scrambleAndShowBase>>
) => {
	const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerCaseAlphabets = alphabets.toLowerCase();
	const number = '0123456789';
	const listOfCharacters = `${alphabets}${lowerCaseAlphabets}${number}`;
	return scrambleAndShowBase(listOfCharacters)(param);
};

export { scrambleAndShowBase, scrambleAndShow };
