import React from 'react';
import { scrambleAndShow } from '../effect';

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
    props: Parameters<typeof scrambleAndShow>[0] & {
        timeOut: number;
    }
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

    const ended = Boolean(
        result.current.status === 'started' &&
            words.at(result.current.index)?.isSame
    );

    const setPreviousResult = (previous: Result) =>
        setResult((result) => ({
            ...result,
            previous,
        }));

    const setCurrentResult = (current: Result) =>
        setResult((result) => ({
            ...result,
            current,
        }));

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
        return () => clearTimeout(timer);
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
                        changeWord();
                    }
                }
            }
        }
    }, [result.previous.status]);

    React.useEffect(() => {
        changeWord();
    }, [result.current.status === 'started' && result.current.index]);

    return {
        ...result,
        started: () => result.current.status !== 'started',
        word: () =>
            result.current.status !== 'started'
                ? props.content
                : words.at(result.current.index)?.content ?? props.content,
        stop: () =>
            setPreviousResult({
                status: 'not-started',
            }),
        start: () =>
            setPreviousResult({
                status: 'started',
                index: 0,
            }),
    };
};

export default useWordScramble;
