const chunkDatas = <T>(
	props: Readonly<{
		data: ReadonlyArray<T>;
		perChunk: number;
	}>
) => {
	return props.data.reduce(
		(total, one, index) => {
			const chunkIndex = Math.floor(index / props.perChunk);

			const chunk = total.at(chunkIndex);

			const newTotal = !chunk
				? total.concat([[one]])
				: total.map((chunk, index) => {
						return index !== chunkIndex ? chunk : chunk.concat(one);
					});

			return newTotal;
		},
		[] as ReadonlyArray<ReadonlyArray<T>>
	);
};

export { chunkDatas };
