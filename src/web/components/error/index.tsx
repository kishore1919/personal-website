import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { keyframes } from '@emotion/react';
import Title from '../common/title';
import { SecondaryMainButton } from '../common/button';

const chargeHomeButton = keyframes`
    0% {
        background-position: 100% 0%;
    }
    100% {
        background-position: 0% -100%;
    }
`;

const MarginTopBox = ({
    children,
    shouldNotMarginTop,
}: Readonly<{
    shouldNotMarginTop?: true;
    children: React.ReactNode;
}>) => (
    <Box
        sx={{
            m: 0,
            mt: !shouldNotMarginTop ? 4 : undefined,
            display: 'grid',
            placeItems: 'center',
        }}
    >
        {children}
    </Box>
);

const ClickRefresh = ({
    title,
    refresh,
    timeToChange,
}: Readonly<{
    title: string;
    refresh: () => void;
    timeToChange: number;
}>) => (
    <SecondaryMainButton
        title={title}
        onClick={refresh}
        sx={({ palette }) => ({
            fontWeight: 600,
            backgroundColor: 'custom.blue.dark',
            background: [
                `linear-gradient(to left`,
                `${palette.background.default} 50%`,
                `${palette.custom.blue.dark} 50%)`,
            ].join(','),
            backgroundSize: '200%',
            display: 'inline-block',
            animation: `${chargeHomeButton} ease-in-out ${timeToChange}s`,
            '&:hover': {
                backgroundPosition: 'left !important',
            },
        })}
    />
);

const ErrorContainer = ({
    type,
    messages,
    statusCode,
}: Readonly<{
    type: 'reload' | 'replace';
    statusCode?: number;
    messages: ReadonlyArray<string>;
}>) => {
    const router = useRouter();

    const home = '/';
    const delay = 1;
    const timeToChange = 15 + delay;

    const [countDown, setCountDown] = React.useState(timeToChange - delay);

    React.useEffect(() => {
        if (!countDown) {
            type === 'reload' ? router.reload() : router.replace(home);
        }
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'test') {
            return;
        }
        const goTo = setTimeout(
            () => setCountDown((countDown) => countDown - 1),
            1000
        );
        return () => clearTimeout(goTo);
    }, [countDown]);

    return (
        <Box
            sx={{
                m: 0,
                mt: 4,
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <Title
                title={`${statusCode ?? ''} Error`}
                content="You took the wrong turn and came here"
            />
            <Box
                sx={{
                    width: '80%',
                }}
            >
                <MarginTopBox shouldNotMarginTop>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        {statusCode}
                    </Typography>
                </MarginTopBox>
                <MarginTopBox>
                    {messages.map((message, index) => (
                        <Typography
                            key={message}
                            variant={!index ? 'h3' : 'inherit'}
                            sx={{
                                m: 0,
                                mb: index ? 1 : 6,
                                color: !index ? undefined : 'text.secondary',
                            }}
                        >
                            {message}
                        </Typography>
                    ))}
                </MarginTopBox>
                <MarginTopBox>
                    <Typography>
                        {type === 'reload' ? 'Auto Reload' : 'Back to Home'} in:
                        00:00:
                        {`${countDown >= 10 ? '' : 0}${countDown}`}
                    </Typography>
                    <Typography
                        sx={{
                            m: 0,
                            mt: 4,
                            fontWeight: 700,
                        }}
                    >
                        OR
                    </Typography>
                </MarginTopBox>
                <MarginTopBox>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            whiteSpace: 'pre',
                        }}
                    >
                        {type === 'reload' ? (
                            <>
                                Quickly{' '}
                                <Box
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <ClickRefresh
                                        timeToChange={timeToChange}
                                        title="RELOAD"
                                        refresh={() => router.reload()}
                                    />{' '}
                                </Box>
                                Now
                            </>
                        ) : (
                            <>
                                Go{' '}
                                <Link
                                    href={home}
                                    style={{
                                        textDecoration: 'none',
                                    }}
                                >
                                    <ClickRefresh
                                        timeToChange={timeToChange}
                                        title="HOME"
                                        refresh={() => router.replace(home)}
                                    />{' '}
                                </Link>
                                Immediately
                            </>
                        )}
                    </Box>
                </MarginTopBox>
            </Box>
        </Box>
    );
};

export default ErrorContainer;
