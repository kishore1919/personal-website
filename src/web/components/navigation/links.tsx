import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Home = Readonly<{
    href: '/';
    title: 'Home';
}>;

type Project = Readonly<{
    href: '/projects';
    title: 'Projects';
}>;

type Roommate = Readonly<{
    href: '/contact';
    title: 'Contact';
}>;

type Resume = Readonly<{
    href: '/resume';
    title: 'Resume';
}>;

type LinkType = Home | Project | Roommate | Resume;
type LinkTitle = LinkType['title'] | 'Résumé' | '404 Error';
type LinkNavigation = LinkType['href'];

const CustomLink = ({
    navLink: { href, title },
}: Readonly<{
    navLink: LinkType;
}>) => {
    const router = useRouter();
    const CustomLink =
        router.pathname === href ? LinkWrapperActive : LinkWrapper;
    return (
        <CustomLink>
            <Link href={href}>{title}</Link>
        </CustomLink>
    );
};

const Links = () => {
    const links: ReadonlyArray<LinkType> = [
        { href: '/', title: 'Home' },
        { href: '/projects', title: 'Projects' },
        { href: '/contact', title: 'Contact' },
        { href: '/resume', title: 'Resume' },
    ];
    return (
        <OuterContainer>
            <Center>
                {links.map((navLink) => (
                    <CustomLink key={navLink.title} navLink={navLink} />
                ))}
            </Center>
        </OuterContainer>
    );
};

const OuterContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
`;

const Center = styled.div`
    display: grid;
    grid-gap: 16px;
    width: fit-content;
    grid-auto-flow: column;
    @media (max-width: 586px) {
        grid-gap: 8px;
    }
    @media (max-width: 370px) {
        grid-gap: 4px;
    }
`;

const LinkWrapperStyled = styled.div`
    font-size: 1em;
    text-transform: uppercase;
    transition: border 0.5s;
    display: grid;
    place-items: center;
    padding: 8px 16px;
    box-sizing: border-box;
    @media (max-width: 586px) {
        padding: 8px;
    }
    &:hover {
        border: 3px solid ${({ theme }) => theme.theme.secondaryColor};
    }
    > a {
        text-decoration: none;
        transition: color 0.5s;
        &:focus {
            outline: none;
        }
        &:hover {
            color: ${({ theme }) => theme.theme.secondaryColor} !important;
        }
    }
`;

const LinkWrapperActive = styled(LinkWrapperStyled)`
    font-weight: bold;
    border: 3px solid ${({ theme }) => theme.theme.secondaryColor};
    > a {
        color: ${({ theme }) => theme.theme.secondaryColor};
    }
`;

const LinkWrapper = styled(LinkWrapperStyled)`
    border: 3px solid transparent;
    > a {
        color: darkgrey;
    }
`;

export type { LinkTitle, LinkNavigation };

export default Links;
