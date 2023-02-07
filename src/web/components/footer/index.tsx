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
    color: ${({ theme }) => theme.color.secondary};
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
`;

const Facebook = styled(SocialIcon)`
    background: ${({ theme }) => theme.social.facebook};
    &:hover {
        color: ${({ theme }) => theme.social.facebook};
    }
`;

const FacebookLogo = styled(TiSocialFacebook)`
    font-size: 1.5em !important;
`;

const Linkedin = styled(SocialIcon)`
    background: ${({ theme }) => theme.social.linkedin};
    &:hover {
        color: ${({ theme }) => theme.social.linkedin};
    }
`;

const LinkedinLogo = styled(TiSocialLinkedin)`
    font-size: 1.5em !important;
`;

const Instagram = styled(SocialIcon)`
    background: ${({ theme }) => theme.social.instagram.normal};
    background: linear-gradient(
        45deg,
        ${({ theme }) => theme.social.instagram.gradient}
    );
    &:hover {
        color: ${({ theme }) => theme.social.instagram.hover};
    }
`;

const InstagramLogo = styled(FaInstagram)`
    font-size: 1.5em !important;
`;

const Github = styled(SocialIcon)`
    background: ${({ theme }) => theme.social.github};
    &:hover {
        color: ${({ theme }) => theme.social.github};
    }
`;

const GithubLogo = styled(FaGithub)`
    font-size: 1.5em !important;
`;

const Google = styled(SocialIcon)`
    background: ${({ theme }) => theme.social.google};
`;

const GoogleLogo = styled(FcGoogle)`
    font-size: 1.25em !important;
`;

export default Footer;
