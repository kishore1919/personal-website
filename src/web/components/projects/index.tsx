import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Holder from '../common/holder';
import { projects, projectUtil } from '../../data';
import type { ID } from '../header';
import consts from '../../const';
import { guard } from '../../../common/type';
import useWordScramble from '../../hooks/use-word-scramble';

const ProjectPreview = ({
    id,
    close,
}: Readonly<{
    id: string;
    close: () => void;
}>) => {
    const project = guard({
        error: () => new Error(`There is no project with id od ${id}`),
        value: projects().find((project) => project.id === id),
    });
    const [heights, setHeights] = React.useState({
        scrollTop: 0,
        clientHeight: 0,
    });

    const { imagesName, externalLinks } = project;

    const dialogContent =
        React.useRef() as React.MutableRefObject<HTMLDivElement>;

    const updateHeights = () =>
        setHeights({
            scrollTop: dialogContent.current?.scrollTop,
            clientHeight: dialogContent.current?.clientHeight / 2,
        });

    React.useEffect(() => {
        updateHeights();
    }, []);

    return (
        <Dialog
            open
            fullScreen
            PaperProps={{
                sx: {
                    backgroundImage: 'none',
                    backgroundColor: 'background.default',
                },
            }}
        >
            <DialogContent ref={dialogContent} onScroll={updateHeights}>
                <Box>
                    {!heights.clientHeight ||
                    heights.scrollTop <= heights.clientHeight / 2 ? null : (
                        <Box
                            sx={{
                                mb: 4,
                                mr: 4,
                                right: 0,
                                bottom: 0,
                                position: 'fixed',
                            }}
                        >
                            <IconButton
                                sx={{
                                    p: 1.5,
                                    backgroundColor: 'text.primary',
                                    ['&:hover']: {
                                        backgroundColor: 'text.secondary',
                                    },
                                }}
                                onClick={() =>
                                    dialogContent.current?.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }
                            >
                                <KeyboardArrowUpIcon
                                    sx={{
                                        color: 'background.default',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    )}
                    <Box sx={{ display: 'grid' }}>
                        <Box>
                            <Box
                                sx={{
                                    mt: 2,
                                    ml: 2,
                                }}
                            >
                                <IconButton onClick={close}>
                                    <ArrowBackIosNewIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: consts.width,
                                    display: 'grid',
                                    gridGap: 64,
                                    mb: 6,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        placeItems: 'center',
                                    }}
                                >
                                    <Link
                                        rel="noopener"
                                        target="_blank"
                                        underline="none"
                                        href={externalLinks.github}
                                    >
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                textDecoration: 'underline',
                                                color: 'text.primary',
                                            }}
                                        >
                                            {project.name}
                                        </Typography>
                                    </Link>
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={{
                                                textAlign: {
                                                    sm: 'justify',
                                                    md: 'start',
                                                },
                                            }}
                                        >
                                            {project.description.map(
                                                (description) => {
                                                    if (
                                                        !description.includes(
                                                            projectUtil.subProjectIndicator
                                                        )
                                                    ) {
                                                        return (
                                                            <Typography
                                                                key={
                                                                    description
                                                                }
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                }}
                                                            >
                                                                {description}
                                                            </Typography>
                                                        );
                                                    }
                                                    const [name, sentence] =
                                                        description.split(
                                                            projectUtil.subProjectIndicator
                                                        );
                                                    return (
                                                        <Typography key={name}>
                                                            <Typography
                                                                sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            >
                                                                {name}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                }}
                                                            >{`${projectUtil.subProjectIndicator} ${sentence}`}</Typography>
                                                            <br />
                                                        </Typography>
                                                    );
                                                }
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            sx={{
                                                gap: 4,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: {
                                                    xs: 'start',
                                                    md: 'end',
                                                },
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                >
                                                    Links
                                                </Typography>
                                                <Box>
                                                    {!(
                                                        'homePage' in
                                                        externalLinks
                                                    ) ? null : (
                                                        <Link
                                                            rel="noopener"
                                                            target="_blank"
                                                            underline="none"
                                                            href={
                                                                externalLinks.homePage
                                                            }
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    color: 'text.disabled',
                                                                }}
                                                            >
                                                                Home
                                                            </Typography>
                                                        </Link>
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Link
                                                        href={
                                                            externalLinks.github
                                                        }
                                                        style={{
                                                            textDecoration:
                                                                'none',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: 'text.disabled',
                                                            }}
                                                        >
                                                            Github
                                                        </Typography>
                                                    </Link>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                >
                                                    Relevance
                                                </Typography>
                                                {project.tags.map((tag) => (
                                                    <Typography
                                                        key={tag}
                                                        sx={{
                                                            color: 'text.disabled',
                                                        }}
                                                    >
                                                        {tag}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        placeItems: 'center',
                                        gridGap: 64,
                                    }}
                                >
                                    {imagesName.map((imageName) =>
                                        !imagesName ? null : (
                                            <Box
                                                key={imageName}
                                                alt={imageName}
                                                loading="lazy"
                                                component="img"
                                                src={`/images/projects/${id}/${imageName}.png`}
                                                sx={{
                                                    width: '100%',
                                                    display: 'block',
                                                }}
                                            />
                                        )
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

const Projects = ({ id }: ID) => {
    const [selectedId, setSelectedId] = React.useState(
        undefined as string | undefined
    );

    return (
        <Holder
            id={id}
            sx={{
                mt: 16,
                width: '100%',
            }}
        >
            {!selectedId ? null : (
                <ProjectPreview
                    id={selectedId}
                    close={() => setSelectedId(undefined)}
                />
            )}
            <Box
                sx={{
                    width: consts.width,
                }}
            >
                <Grid container spacing={4}>
                    {projects().map((project) => {
                        const { id, name } = project;

                        const wordScramble = useWordScramble({
                            count: 10,
                            timeOut: 5,
                            content: project.brief,
                        });

                        return (
                            <Grid
                                item
                                key={name}
                                xs={12}
                                lg={6}
                                onClick={() => setSelectedId(id)}
                                onMouseOver={wordScramble.start}
                                onMouseOut={wordScramble.stop}
                            >
                                <Box
                                    sx={{
                                        cursor: 'pointer',
                                        position: 'relative',
                                        '&:hover > img': {
                                            filter: 'brightness(25%)',
                                            transition: 'all 1s ease',
                                        },
                                    }}
                                >
                                    <Box
                                        alt={name}
                                        loading="lazy"
                                        component="img"
                                        src={`/images/projects/${id}/background.png`}
                                        sx={{
                                            width: '100%',
                                            display: 'block',
                                        }}
                                    />
                                    <Box
                                        sx={({ palette }) => ({
                                            pb: 2,
                                            top: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-evenly',
                                            textAlign: 'center',
                                            height: '100%',
                                            width: '100%',
                                            color: 'transparent',
                                            '&:hover': {
                                                transition: 'all 1s ease',
                                                color: palette.custom.striking
                                                    .green,
                                            },
                                            '&:hover > div > div': {
                                                transition: 'all 1s ease',
                                                color: palette.text.primary,
                                            },
                                        })}
                                    >
                                        <Box
                                            sx={{
                                                pb: 1,
                                                boxSizing: 'border-box',
                                            }}
                                        >
                                            <Box
                                                alt={name}
                                                loading="lazy"
                                                component="img"
                                                src={`/images/projects/${id}/logo.png`}
                                                sx={{
                                                    mt: 2,
                                                    width: 100,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    fontSize: '0.9em',
                                                    boxSizing: 'border-box',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {project.date}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    px: 1,
                                                    fontWeight: 600,
                                                    fontSize: '0.9em',
                                                    boxSizing: 'border-box',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                {wordScramble.word()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Holder>
    );
};

export default Projects;
