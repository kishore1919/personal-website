import React from 'react';

const Font = ({
    family,
    chosenWeights,
}: Readonly<{
    family: string;
    chosenWeights?: ReadonlyArray<number>;
}>) => {
    const defaultWeights = Array.from({ length: 9 }, (_, i) => (i + 1) * 100);
    const weights = defaultWeights.filter((weight) =>
        !chosenWeights ? weight : chosenWeights.includes(weight)
    );

    if (chosenWeights && !weights.length) {
        throw new Error(
            `There is no matching font weight for ${chosenWeights.join(
                ', '
            )} in ${defaultWeights.join(', ')}`
        );
    }

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href={`https://fonts.googleapis.com/css2?family=${family
                    .split(' ')
                    .join('+')}:wght@${weights.join(';')}&display=swap`}
                rel="stylesheet"
            />
        </>
    );
};

export default Font;
