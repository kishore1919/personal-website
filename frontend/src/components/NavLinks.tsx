import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

type Home = Readonly<{
    href: '/';
    title: 'Home';
}>;

type Portfolio = Readonly<{
    href: '/portfolio';
    title: 'Portfolio';
}>;

type About = Readonly<{
    href: '/about';
    title: 'About';
}>;

type Roommate = Readonly<{
    href: '/contact';
    title: 'Contact';
}>;

type Resume = Readonly<{
    href: '/resume';
    title: 'Resume';
}>;

export type NavLinkType = Home | Portfolio | About | Roommate | Resume;

const NavLink = ({
    navLink: { href, title },
    close,
}: Readonly<{
    navLink: NavLinkType;
    close: () => void;
}>) => {
    const CustomNavLink =
        useLocation().pathname === href ? NavLinkWrapperActive : NavLinkWrapper;
    return (
        <CustomNavLink>
            <Link onClick={close} to={href}>
                {title}
            </Link>
        </CustomNavLink>
    );
};

const NavLinks = ({
    isFullScreen,
    close,
}: Readonly<{
    isFullScreen: boolean;
    close: () => void;
}>) => {
    const Container = isFullScreen ? NavMenu : LeftSide;

    return (
        <Container>
            {(
                [
                    { href: '/', title: 'Home' },
                    { href: '/portfolio', title: 'Portfolio' },
                    { href: '/about', title: 'About' },
                    { href: '/contact', title: 'Contact' },
                    { href: '/resume', title: 'Resume' },
                ] as ReadonlyArray<NavLinkType>
            ).map((navLink) => (
                <NavLink close={close} key={navLink.title} navLink={navLink} />
            ))}
        </Container>
    );
};

const NavLinkWrapperStyled = styled.div`
    margin: 0 10px 0 0;
    font-size: 1em;
    font-weight: bold;
    text-transform: uppercase;
    padding: 5px 10px;
    transition: border 0.5s;
    @media (max-width: 586px) {
        font-size: 1.75em;
        margin: 25px;
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

const NavLinkWrapperActive = styled(NavLinkWrapperStyled)`
    border: 3px solid ${({ theme }) => theme.theme.secondaryColor};
    > a {
        color: ${({ theme }) => theme.theme.secondaryColor};
    }
`;

const NavLinkWrapper = styled(NavLinkWrapperStyled)`
    border: 3px solid transparent;
    > a {
        color: darkgrey;
    }
`;

const LeftSide = styled.div`
    display: flex;
    @media (max-width: 994px) {
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
`;

const NavMenu = styled.div`
    text-align: center;
    > div {
        font-size: 1.75em;
        margin: 25px;
    }
`;

export default NavLinks;
