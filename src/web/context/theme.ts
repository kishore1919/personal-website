import React from 'react';

type Mode = 'dark' | 'light';

const ThemeContext = React.createContext({
	mode: 'dark' as Mode,
	setMode: (_: Mode) => {},
});

export type { Mode };
export { ThemeContext };
