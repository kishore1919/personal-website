import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Holder from '../common/holder';
import { guard } from '../../../common/type';
import useWordScramble from '../../hooks/use-word-scramble';

type ID = Readonly<{
    id: string;
}>;

type CustomId = ReturnType<typeof HeaderLinks>['ids'][number];

const CustomLink = ({
    id,
    isActive,
}: Readonly<{
    id: CustomId;
    isActive: boolean;
}>) => {
    const wordScramble = useWordScramble({
        count: 10,
        timeOut: 30,
        content: id.toUpperCase(),
    });

    return (
        <Link
            href={{ pathname: '/', query: { part: id } }}
            style={{ textDecoration: 'none' }}
        >
            <Box
                onMouseOver={wordScramble.start}
                onMouseOut={wordScramble.stop}
                sx={({ palette }) => ({
                    py: 1,
                    px: 2,
                    cursor: 'pointer',
                    transition: 'border 0.5s',
                    boxSizing: 'border-box',
                    border: `3px solid ${
                        !isActive ? 'transparent' : palette.custom.white
                    }`,
                    '&:hover': {
                        border: `3px solid ${palette.custom.white}`,
                    },
                })}
            >
                <Typography
                    sx={({ palette }) => ({
                        fontWeight: isActive ? 'bold' : undefined,
                        color: !isActive ? 'darkgray' : palette.custom.white,
                        '&:hover': {
                            color: palette.custom.white,
                        },
                    })}
                >
                    {wordScramble.word()}
                </Typography>
            </Box>
        </Link>
    );
};

const HeaderLinks = () => {
    const ids = ['home', 'projects', 'contact'] as const;

    return {
        ids,
        Component: () => {
            const router = useRouter();
            const { part } = router.query;

            const scrollId = ids.find((id) => id === part) ?? ids[0];

            const defaultId = !ids.find((id) => id === part) && ids[0];

            const holder =
                React.useRef() as React.MutableRefObject<HTMLDivElement>;

            React.useEffect(() => {
                // ref: https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
                const element = guard({
                    value: document.getElementById(scrollId),
                    error: () =>
                        new Error(
                            `There is no document with scrollId of ${scrollId}`
                        ),
                });
                window.scrollTo({
                    behavior: 'smooth',
                    top:
                        element.getBoundingClientRect().top +
                        window.pageYOffset -
                        guard({
                            value: holder.current,
                            error: () =>
                                new Error('Holder.current is undefined'),
                        }).offsetHeight -
                        20,
                });
            }, []);

            return (
                <Holder
                    holderRef={holder}
                    sx={{
                        top: 0,
                        zIndex: 2,
                        position: 'sticky',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '16px 24px !important',
                        boxSizing: 'border-box',
                        backdropFilter: 'blur(50px)',
                    }}
                >
                    <Holder
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            gridGap: 24,
                            width: {
                                xs: '50%',
                            },
                        }}
                    >
                        {ids.map((id) => (
                            <CustomLink
                                id={id}
                                key={id}
                                isActive={
                                    defaultId ? id === defaultId : part === id
                                }
                            />
                        ))}
                    </Holder>
                </Holder>
            );
        },
    };
};

export type { ID };

export default HeaderLinks;
