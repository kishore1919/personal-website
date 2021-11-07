import * as React from 'react';
import styled, { css } from 'styled-components';
import {
    FaGithub,
    FaInstagram,
    FaHeadphones,
    FaDumbbell,
    FaBook,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
} from 'react-icons/fa';
import { TiSocialLinkedin, TiSocialFacebook } from 'react-icons/ti';
import { keyConfig, isDarkResume } from '../../util/theme/colorTheme';

type ResumeState = {
    readonly path: `asset/files/resume/GervinFungDaXuenResume_UTAR_${
        | 'dark'
        | 'light'}.pdf`;
};

const ResumeLeft = () => {
    const { key } = keyConfig;

    const [state, setState] = React.useState<ResumeState>();

    const downloadResume = () =>
        setState(() => ({
            path: `asset/files/resume/GervinFungDaXuenResume_UTAR_${isDarkResume(
                localStorage.getItem(key) ??
                    window.matchMedia('(prefers-color-scheme: dark)').matches
            )}.pdf`,
        }));

    return (
        <ResumeLeftContainer>
            <Section>
                <SelfIntro>
                    <div>
                        <img
                            src="asset/images/others/resume.webp"
                            alt="resume.webp"
                        />
                    </div>
                    <SelfIntroLabel>
                        <h2>Gervin Fung Da Xuen</h2>
                    </SelfIntroLabel>
                    <SelfIntroLabel>
                        <h2>Software Engineering Student</h2>
                    </SelfIntroLabel>
                    <ResumeDownloadContainer>
                        <ResumeDownloadLink
                            href={state?.path}
                            onClick={downloadResume}
                        >
                            Download
                        </ResumeDownloadLink>
                    </ResumeDownloadContainer>
                    <PersonalWebsite>
                        <WebsiteLink>
                            https://poolofdeath20.herokuapp.com
                        </WebsiteLink>
                    </PersonalWebsite>
                </SelfIntro>

                <div>
                    <ContactInfo>
                        <div>
                            <Address />
                        </div>
                        <MediumTextSpan>
                            P.O Box 64 A308, Blok F Jalan Datuk Haji Yassin,
                            Tenom, Sabah
                        </MediumTextSpan>
                    </ContactInfo>
                    <ContactInfo>
                        <div>
                            <Email />
                        </div>
                        <MediumTextSpan>
                            gervinfungdaxuen@gmail.com
                        </MediumTextSpan>
                    </ContactInfo>
                    <ContactInfo>
                        <div>
                            <Phone />
                        </div>
                        <MediumTextSpan>011-5548-4654</MediumTextSpan>
                    </ContactInfo>
                </div>
            </Section>

            <Section>
                <SectionTitle>Social</SectionTitle>
                <SocialLinkDiv>
                    <Github href="https://github.com/GervinFung">
                        <GithubLogo />
                    </Github>
                    <SocialLinkName href="https://github.com/GervinFung">
                        Gervin Fung
                    </SocialLinkName>
                </SocialLinkDiv>
                <SocialLinkDiv>
                    <Linkedin href="https://www.linkedin.com/in/gervin-fung-387409209">
                        <LinkedinLogo />
                    </Linkedin>
                    <SocialLinkName href="https://www.linkedin.com/in/gervin-fung-387409209">
                        Gervin Fung
                    </SocialLinkName>
                </SocialLinkDiv>
                <SocialLinkDiv>
                    <Facebook href="https://www.facebook.com/GervinFung">
                        <FacebookLogo />
                    </Facebook>
                    <SocialLinkName href="https://www.facebook.com/GervinFung">
                        Gervin Fung
                    </SocialLinkName>
                </SocialLinkDiv>
                <SocialLinkDiv>
                    <Instagram href="https://www.instagram.com/poolofdeath20">
                        <InstagramLogo />
                    </Instagram>
                    <SocialLinkName href="https://www.instagram.com/poolofdeath20">
                        PoolOfDeath20
                    </SocialLinkName>
                </SocialLinkDiv>
            </Section>

            <Section>
                <SectionTitle>Profile</SectionTitle>
                <MediumTextParagraph>
                    A Software Engineering Undergraduates seeking a full time
                    job in an organization with a professional work-driven
                    environment where I can utilise and improve my current
                    knowledge and skills, and fulfill the organizational goals
                    along the way.
                </MediumTextParagraph>
            </Section>

            <Section>
                <SectionTitle>Interests</SectionTitle>
                <Interests>
                    <InterestRow>
                        <div>
                            <Headphone />
                        </div>
                        <MediumTextParagraph>Music</MediumTextParagraph>
                    </InterestRow>
                    <InterestRow>
                        <div>
                            <Dumbbell />
                        </div>
                        <MediumTextParagraph>Workout</MediumTextParagraph>
                    </InterestRow>
                    <InterestRow>
                        <div>
                            <Book />
                        </div>
                        <MediumTextParagraph>Comics</MediumTextParagraph>
                    </InterestRow>
                </Interests>
            </Section>
        </ResumeLeftContainer>
    );
};

const ResumeSection = styled.div`
    padding: 20px;
    @media (max-width: 840px) {
        width: 100% !important;
        padding: 0 !important;
    }
`;

const ResumeLeftContainer = styled(ResumeSection)`
    width: 30%;
    color: ${({ theme }) => theme.theme.secondaryColor};
    background-color: ${({ theme }) => theme.theme.primaryColor};
`;

const Section = styled.section`
    padding: 0 0 35px 0;
    @media (max-width: 840px) {
        padding: 20px;
    }
`;

const SectionTitle = styled.h1`
    margin: 0 0 25px 0;
    letter-spacing: 5.5px !important;
    text-transform: uppercase;
    text-shadow: 4px 1px ${({ theme }) => theme.greenColor},
        -4px 1px ${({ theme }) => theme.redColor};
`;

const SelfIntro = styled.div`
    text-align: center;
`;

const SelfIntroLabel = styled.div`
    text-shadow: 3px 1px ${({ theme }) => theme.greenColor},
        -3px 1px ${({ theme }) => theme.redColor};
`;

const ResumeDownloadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 10px 0;
    > a {
        text-decoration: none;
        color: white;
        font-size: 1.2em;
        padding: 10px 16px 10px 16px;
        margin: 15px;
        background-color: #059862;
        width: 280px;
        &:hover {
            background-color: #006d32;
            cursor: pointer;
        }
    }
`;

const ResumeDownloadLink = styled.a`
    text-decoration: none;
    color: white;
    font-size: 1.2em;
    padding: 10px 16px 10px 16px;
    margin: 15px;
    background-color: #059862;
    width: 280px;
    &:hover {
        background-color: #006d32;
        cursor: pointer;
    }
`;

const PersonalWebsite = styled.div`
    word-break: break-word;
`;

const WebsiteLink = styled.a.attrs({
    href: 'https://poolofdeath20.herokuapp.com',
    target: 'blank',
    rel: 'noopener noreferrer',
})`
    text-decoration: none;
    color: ${({ theme }) => theme.theme.secondaryColor};
`;

const ContactInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 22px;
    word-break: break-word;
`;

const MediumTextSpan = styled.span`
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
`;

const MediumTextParagraph = styled.p`
    color: ${({ theme }) => theme.theme.mediumEmphasesTextColor};
`;

const ResumeFAS = css`
    font-size: 1.35em !important;
    padding: 0 20px 0 0 !important;
`;

const Address = styled(FaMapMarkerAlt)`
    ${ResumeFAS}
`;

const Email = styled(FaEnvelope)`
    ${ResumeFAS}
`;

const Phone = styled(FaPhone)`
    ${ResumeFAS}
`;

const SocialIcon = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer noopener',
})`
    justify-content: center;
    display: flex;
    align-items: center;
    color: whitesmoke;
    border-radius: 50%;
    padding: 10px;
    width: 35px;
    height: 35px;
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
    font-size: 2.2em !important;
`;

const Linkedin = styled(SocialIcon)`
    background: #007bb5;
    &:hover {
        color: #007bb5;
    }
`;

const LinkedinLogo = styled(TiSocialLinkedin)`
    font-size: 2.2em !important;
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
    font-size: 2.5em !important;
`;

const Github = styled(SocialIcon)`
    background: #282a36;
    &:hover {
        color: #282a36;
    }
`;

const GithubLogo = styled(FaGithub)`
    font-size: 2.5em !important;
`;

const SocialLinkDiv = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
`;

const SocialLinkName = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer noopener',
})`
    text-decoration: none;
    color: ${({ theme }) => theme.theme.secondaryColor};
`;

const Interests = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const InterestRow = styled.div`
    margin: 15px;
    text-align: center;
`;

const InterestFAS = css`
    font-size: 1.35em !important;
    color: ${({ theme }) => theme.theme.secondaryColor} !important;
`;

const Headphone = styled(FaHeadphones)`
    ${InterestFAS}
`;

const Dumbbell = styled(FaDumbbell)`
    ${InterestFAS}
`;

const Book = styled(FaBook)`
    ${InterestFAS}
`;

export default ResumeLeft;
