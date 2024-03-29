import React from 'react';

const useHeight = () => {
	const [height, setHeight] = React.useState(0);

	React.useEffect(() => {
		const onScroll = () => {
			setHeight(window.scrollY);
		};

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return height;
};

export default useHeight;
