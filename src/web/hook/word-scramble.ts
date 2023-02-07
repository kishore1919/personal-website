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

const useWordScramble = ({
    count,
    timeOut,
    content,
}: Parameters<typeof scrambleAndShow>[0] & {
    timeOut: number;
}) => {
    const words = scrambleAndShow({
        count,
        content,
    });

    const [state, setState] = React.useState({
        result: {
            previous: {
                status: 'not-started',
            } as Result,
            current: {
                status: 'not-started',
            } as Result,
        } as const,
    });

    const { result } = state;

    const ended = Boolean(
        result.current.status === 'started' &&
            words.at(result.current.index)?.isSame
    );

    const setPreviousResult = (previous: Result) =>
        setState((prev) => ({
            ...prev,
            result: {
                ...prev.result,
                previous,
            },
        }));

    const setCurrentResult = (current: Result) =>
        setState((prev) => ({
            ...prev,
            result: {
                ...prev.result,
                current,
            },
        }));

    const changeWord = () => {
        const timer = setTimeout(() => {
            setState((prev) => {
                const { current } = result;
                return {
                    ...prev,
                    result: {
                        ...prev.result,
                        current:
                            current.status === 'not-started'
                                ? current
                                : {
                                      status: 'started',
                                      index: current.index + (ended ? 0 : 1),
                                  },
                    },
                };
            });
        }, timeOut);
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
        ...state,
        started: () => result.current.status !== 'started',
        word: () =>
            result.current.status !== 'started'
                ? content
                : words.at(result.current.index)?.content,
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
