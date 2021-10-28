import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface NavLinksProps {
    readonly fullScreen: boolean;
    readonly close: () => void;
}

type Home = {
    readonly href: '/';
    readonly title: 'Home';
};

type Portfolio = {
    readonly href: '/portfolio';
    readonly title: 'Portfolio';
};

type About = {
    readonly href: '/about';
    readonly title: 'About';
};

type Roommate = {
    readonly href: '/contact';
    readonly title: 'Contact';
};

type Resume = {
    readonly href: '/resume';
    readonly title: 'Resume';
};

export type NavLinkType = Home | Portfolio | About | Roommate | Resume;

interface NavLinkProps {
    readonly navLink: NavLinkType;
    readonly close: () => void;
}

const NavLink = ({ navLink: { href, title }, close }: NavLinkProps) => {
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

const NavLinks = ({ fullScreen, close }: NavLinksProps) => {
    const navLinks: ReadonlyArray<NavLinkType> = [
        { href: '/', title: 'Home' },
        { href: '/portfolio', title: 'Portfolio' },
        { href: '/about', title: 'About' },
        { href: '/contact', title: 'Contact' },
        { href: '/resume', title: 'Resume' },
    ];

    const NavLinksElem = (): JSX.Element => (
        <>
            {navLinks.map((navLink, index) => (
                <NavLink close={close} key={index} navLink={navLink} />
            ))}
        </>
    );

    return fullScreen ? (
        <NavMenu>
            <NavLinksElem />
        </NavMenu>
    ) : (
        <LeftSide>
            <NavLinksElem />
        </LeftSide>
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
