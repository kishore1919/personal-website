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
					.map(() => {
						const generatedWord = generateWord();
						return generatedWord !== content
							? generatedWord
							: generateWord();
					})
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

type Param = Parameters<ReturnType<typeof scrambleAndShowBase>>[0];

const scrambleAndShow = (param: Param) => {
	const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowerCaseAlphabets = alphabets.toLowerCase();
	const number = '0123456789';
	const listOfCharacters = `${alphabets}${lowerCaseAlphabets}${number}`;
	return scrambleAndShowBase(listOfCharacters)(param);
};

export { scrambleAndShowBase, scrambleAndShow };
