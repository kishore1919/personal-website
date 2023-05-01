import React from 'react';
import Typography from '@mui/material/Typography';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Holder from './holder';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import links from '../../links';

const SocialLink = ({
    href,
    children,
    background,
    backgroundColor,
}: Readonly<{
    href: string;
    background: string;
    backgroundColor?: string;
    children: React.ReactNode;
}>) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener"
        underline="none"
        sx={{
            p: 1,
            backgroundColor: backgroundColor ?? background,
            background,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '50%',
            border: 'none',
        }}
    >
        {children}
    </Link>
);

const Footer = () => (
    <Holder
        sx={{
            m: 0,
            mt: 4,
        }}
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <CopyrightIcon fontSize="small" />
            <Typography>2020 - {new Date().getFullYear()}</Typography>
        </Box>
        <Box
            sx={{
                m: 0,
                mt: 4,
                mb: 2,
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gridGap: 24,
            }}
        >
            <SocialLink href={links.github} background="#282A36">
                <GitHubIcon
                    fontSize="large"
                    style={{
                        backgroundColor: '#282A36',
                        color: 'white',
                    }}
                />
            </SocialLink>
            <SocialLink href={links.linkedin} background="#1877F2">
                <LinkedInIcon
                    fontSize="large"
                    style={{
                        backgroundColor: '#1877F2',
                        color: 'white',
                    }}
                />
            </SocialLink>
            <SocialLink
                href={links.instagram}
                backgroundColor="#F09433"
                background={`linear-gradient(45deg, ${[
                    '#F09433 0%',
                    '#E6683C 25%',
                    '#DC2743 50%',
                    '#CC2366 75%',
                    '#CC2366 75%',
                ].join(',')})`}
            >
                <InstagramIcon
                    fontSize="large"
                    style={{
                        backgroundColor: '#F09433',
                        background: `linear-gradient(45deg, ${[
                            '#F09433 0%',
                            '#E6683C 25%',
                            '#DC2743 50%',
                            '#CC2366 75%',
                            '#CC2366 75%',
                        ].join(',')})`,
                        color: 'white',
                    }}
                />
            </SocialLink>
            <SocialLink href={links.facebook} background="#3B5998">
                <FacebookSharpIcon
                    fontSize="large"
                    style={{
                        backgroundColor: '#3B5998',
                        color: 'white',
                    }}
                />
            </SocialLink>
        </Box>
    </Holder>
);

export default Footer;
