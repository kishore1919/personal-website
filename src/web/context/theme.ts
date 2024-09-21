import type { Mode } from '@poolofdeath20/util';

import React from 'react';

const ThemeContext = React.createContext({
	mode: 'dark' as Mode,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setMode: (_: Mode) => {},
});

export { ThemeContext };
