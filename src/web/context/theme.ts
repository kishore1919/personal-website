import type { Mode } from '@poolofdeath20/util';

import React from 'react';

const ThemeContext = React.createContext({
	mode: 'dark' as Mode,
});

export { ThemeContext };
