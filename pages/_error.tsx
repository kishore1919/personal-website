import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ErrorContainer from '../src/web/components/error';

const getServerSideProps = async (
    context: Parameters<GetServerSideProps>[number]
) => ({
    props: {
        statusCode: context.res.statusCode,
    },
});

const Error = (
    serverProps: InferGetServerSidePropsType<typeof getServerSideProps>
) => (
    <ErrorContainer
        statusCode={serverProps.statusCode}
        type="reload"
        messages={[
            'Oops! You seems lost',
            'Yeah, I am as confused as you are',
            'From what I have seen, it appears that the page you are looking for is now beyond my reach',
            'Luckily, unlike some other mistakes, this can be fixed',
            `So let's get you...`,
        ]}
    />
);

export { getServerSideProps };
export default Error;
