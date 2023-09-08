const isBlank = (s: string) => {
	return (
		s.split('').filter((c) => {
			return ' ' === c;
		}).length === s.length
	);
};

const isEmpty = (s: string) => {
	return !s;
};

export { isBlank, isEmpty };
