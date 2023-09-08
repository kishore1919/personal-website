const replacePresentWithNow = (strings: ReadonlyArray<string>) => {
	return strings.map((string) => {
		return string.replace('Present', 'Now');
	});
};

const capitalize = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export { capitalize, replacePresentWithNow };
