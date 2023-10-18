import React from 'react';
import type { Mode } from '@poolofdeath20/util';

const ThemeContext = React.createContext({
	mode: 'dark' as Mode,
	setMode: (_: Mode) => {},
});

export { ThemeContext };
