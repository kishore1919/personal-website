const colorTheme = (() => {
	const black = '#000';
	const white = '#FFF';

	type Contrast = typeof black | typeof white;

	return {
		default: black as Contrast,
		opposite: white as Contrast,
		contrast: {
			black,
			white,
		},
		striking: {
			red: '#FF3F4A',
			green: '#0FFBF9',
		},
		red: {
			dark: '#F11223',
			light: '#F44250',
		},
		blue: {
			dark: '#0676FF',
			light: '#3992FF',
		},
		yellow: {
			dark: '#E5B301',
			light: '#FECC1B',
		},
		orange: {
			dark: '#FF8F06',
			light: '#FFA639',
		},
		green: {
			dark: '#43CF3F',
			light: '#6BD968',
		},
		purple: {
			dark: '#BB25B5',
			light: '#D83BD2',
		},
	} as const;
})();

export { colorTheme };
