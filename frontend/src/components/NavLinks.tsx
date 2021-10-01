import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface NavLinksProps {
    readonly fullScreen: boolean;
    readonly close: () => void;
}

interface NavLinkProps {
    readonly href: '/' | '/portfolio' | '/about' | '/contact' | '/resume';
    readonly title: 'Home' | 'Portfolio' | 'About' | 'Contact' | 'Resume';
    readonly close: () => void;
}

const NavLink = ({ href, title, close }: NavLinkProps) => {

    if (useLocation().pathname === href) {
        return (
            <NavLinkWrapperActive>
                <Link onClick={close} to={href}>{title}</Link>
            </NavLinkWrapperActive>
        );
    } return (
        <NavLinkWrapper>
            <Link onClick={close} to={href}>{title}</Link>
        </NavLinkWrapper>
    );
};

const NavLinks = ({ fullScreen, close }: NavLinksProps) => {
    const links: ReadonlyArray<NavLinkProps> = [
        {href: '/', title: 'Home', close: close},
        {href: '/portfolio', title: 'Portfolio', close: close},
        {href: '/about', title: 'About', close: close},
        {href: '/contact', title: 'Contact', close: close},
        {href: '/resume', title: 'Resume', close: close},
    ];

    const navLinks: ReadonlyArray<JSX.Element> = links.map((link, index) => <NavLink close={close} key={index} href={link.href} title={link.title}/>);

    return fullScreen ? <NavMenu>{navLinks}</NavMenu> : <LeftSide>{navLinks}</LeftSide>;
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
        &:hover{
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
    @media (max-width: 877px) {
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
    @media (max-width: 586px) {
        display: none !important;
    }
`;

const NavMenu = styled.div`
    text-align: center;
    @media (max-width: 586px) {
        > div {
            font-size: 1.75em;
            margin: 25px;
        }
    }
`;


export default NavLinks;