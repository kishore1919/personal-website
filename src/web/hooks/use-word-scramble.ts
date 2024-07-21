import React from 'react';
import { scrambleAndShow } from '../effect';
import { isTruthy, type Argument } from '@poolofdeath20/util';

type Result = Readonly<
	| {
			status: 'not-started';
	  }
	| {
			status: 'started';
			index: number;
	  }
>;

const useWordScramble = (
	props: Argument<typeof scrambleAndShow> &
		Readonly<{
			timeOut: number;
		}>
) => {
	const words = scrambleAndShow({
		count: props.count,
		content: props.content,
	});

	const [result, setResult] = React.useState({
		previous: {
			status: 'not-started',
		} as Result,
		current: {
			status: 'not-started',
		} as Result,
	} as const);

	const ended = isTruthy(
		result.current.status === 'started' &&
			words.at(result.current.index)?.isSame
	);

	const setPreviousResult = (previous: Result) => {
		return setResult((result) => {
			return {
				...result,
				previous,
			};
		});
	};

	const setCurrentResult = (current: Result) => {
		return setResult((result) => {
			return {
				...result,
				current,
			};
		});
	};

	const changeWord = () => {
		const timer = setTimeout(() => {
			setResult((result) => {
				const { current } = result;
				return {
					...result,
					current:
						current.status === 'not-started'
							? current
							: {
									status: 'started',
									index: current.index + (ended ? 0 : 1),
								},
				};
			});
		}, props.timeOut);
		return () => {
			return clearTimeout(timer);
		};
	};

	React.useEffect(() => {
		const { previous, current } = result;
		switch (previous.status) {
			case 'started': {
				setCurrentResult(previous);
				break;
			}
			case 'not-started': {
				if (current.status === 'not-started') {
					setCurrentResult(previous);
				} else {
					if (words.at(current.index)?.isSame) {
						setCurrentResult(previous);
					} else {
						return changeWord();
					}
				}
			}
		}
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.previous.status]);

	React.useEffect(() => {
		return changeWord();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [result.current.status === 'started' && result.current.index]);

	return {
		word: () => {
			return result.current.status !== 'started'
				? props.content
				: (words.at(result.current.index)?.content ?? props.content);
		},
		stop: () => {
			return setPreviousResult({
				status: 'not-started',
			});
		},
		start: () => {
			return setPreviousResult({
				status: 'started',
				index: 0,
			});
		},
	};
};

export default useWordScramble;
