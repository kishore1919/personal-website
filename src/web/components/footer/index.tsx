import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TiSocialLinkedin, TiSocialFacebook } from 'react-icons/ti';
import links from '../../data/links';

const Footer = () => (
    <Container>
        <CopyRight>
            <p>copyright &copy; 2020 - {new Date().getFullYear()}</p>
        </CopyRight>
        <SocialLinkContainer>
            <Linkedin href={links.linkedin}>
                <LinkedinLogo />
            </Linkedin>
            <Facebook href={links.facebook}>
                <FacebookLogo />
            </Facebook>
            <Instagram href={links.instagram}>
                <InstagramLogo />
            </Instagram>
            <Google href={`mailto:${links.gmail}`}>
                <GoogleLogo />
            </Google>
            <Github href={links.github}>
                <GithubLogo />
            </Github>
        </SocialLinkContainer>
    </Container>
);

const Container = styled.footer`
    display: grid;
    place-items: center;
    background-color: transparent;
    margin: 64px 0 0 0;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

const SocialLinkContainer = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 20px;
`;

const CopyRight = styled.div`
    text-transform: uppercase;
    color: ${({ theme }) => theme.theme.secondaryColor};
    @media (max-width: 586px) {
        font-size: 1em;
    }
`;

const SocialIcon = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer noopener',
})`
    display: grid;
    place-items: center;
    color: whitesmoke;
    border-radius: 50%;
    padding: 8px;
    width: 32px;
    height: 32px;
    transition: all 0.3s ease;
    margin: 5px 10px;
    border: none;
    &:hover {
        transform: rotate(360deg) scale(1.3);
        background: whitesmoke;
    }
    &:focus {
        outline: none;
    }
    @media (max-width: 366px) {
        padding: 5px;
    } ;
`;

const Facebook = styled(SocialIcon)`
    background: #3b5998;
    &:hover {
        color: #3b5998;
    }
`;

const FacebookLogo = styled(TiSocialFacebook)`
    font-size: 1.5em !important;
    @media (max-width: 366px) {
        font-size: 2em !important;
    }
`;

const Linkedin = styled(SocialIcon)`
    background: #1877f2;
    &:hover {
        color: #1877f2;
    }
`;

const LinkedinLogo = styled(TiSocialLinkedin)`
    font-size: 1.5em !important;
    @media (max-width: 366px) {
        font-size: 2em !important;
    }
`;

const Instagram = styled(SocialIcon)`
    background: #f09433;
    background: -moz-linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    background: -webkit-linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    background: linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    &:hover {
        color: #dc2743;
    }
`;

const InstagramLogo = styled(FaInstagram)`
    font-size: 1.5em !important;
    @media (max-width: 366px) {
        font-size: 2.2em !important;
    }
`;

const Github = styled(SocialIcon)`
    background: #282a36;
    &:hover {
        color: #282a36;
    }
`;

const GithubLogo = styled(FaGithub)`
    font-size: 1.5em !important;
    @media (max-width: 366px) {
        font-size: 2.2em !important;
    }
`;

const Google = styled(SocialIcon)`
    background: ${({ theme }) => theme.theme.googleIconBackground};
    &:hover {
        background: ${({ theme }) => theme.theme.googleIconBackground};
    }
`;

const GoogleLogo = styled(FcGoogle)`
    font-size: 1.25em !important;
    @media (max-width: 366px) {
        font-size: 2.2em !important;
    }
`;

export default Footer;
