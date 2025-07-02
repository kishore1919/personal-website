import type { Argument } from '@poolofdeath20/util';

import React from 'react';

import { scrambleAndShow } from '../effect';

const useWordScramble = (
	props: Argument<typeof scrambleAndShow> & Readonly<{
		timeOut: number;
	}>,
) => {
	const words = scrambleAndShow({
		count: props.count,
		content: props.content,
	});

	const [index, setIndex] = React.useState(0);
	const [running, setRunning] = React.useState(false);

	const word = words[index];

	React.useEffect(() => {
		if (!running) {
			return;
		}

		if (!word || word.isSame) {
			setRunning(false);
			return;
		}

		const timer = setTimeout(() => {
			setIndex((prevIndex) => prevIndex + 1);
		}, props.timeOut);

		return () => clearTimeout(timer);
	}, [index, running, props.timeOut, word]);

	return {
		word: running && word ? word.content : props.content,
		stop: () => setRunning(false),
		start: () => {
			setIndex(0);
			setRunning(true);
		},
	};
};;

export default useWordScramble;
