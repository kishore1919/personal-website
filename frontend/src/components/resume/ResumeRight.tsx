import * as React from 'react';
import styled from 'styled-components';

const SkillSection = ({
    title,
    list,
}: {
    readonly title:
        | 'Programming Languages'
        | 'Technologies'
        | 'Achievements'
        | 'Personal Skills';
    readonly list: ReadonlyArray<string>;
}) => (
    <Section>
        <SectionTitle>{title}</SectionTitle>
        <ul>
            {list.map((skill) => (
                <List key={skill}>{skill}</List>
            ))}
        </ul>
    </Section>
);

const ResumeRight = () => (
    <ResumeRightContainer>
        <SkillSection
            title="Programming Languages"
            list={['TypeScript & JavaScript', 'Java', 'C#', 'Python']}
        />
        <SkillSection
            title="Technologies"
            list={[
                'React & React Native & NodeJS & Jest',
                'JavaFX & Java Swing & JUnit & Gradle',
                'Basic Linux & Git Commands',
                'Basic PostgreSQL & MongoDB',
            ]}
        />
        <SkillSection
            title="Achievements"
            list={[
                'Building an Room Finder System through collaboration with a friend',
                'Wrote my own NPM package to solve my problems',
                'Built a cross-platform chess game with Java Game Framework - LibGDX Framework',
                "Dean's List for January & May 2021 Trimester",
                "Built a functional Notepad similar to Window's Notepad in Java Swing and JavaFX",
                'Built my very own website',
            ]}
        />
        <SkillSection
            title="Personal Skills"
            list={[
                'Proficient verbal communication skills in English, Mandarin and Cantonese; satisfactory in Malay',
                'Excellent writing skills in English and Mandarin; satisfactory in Malay',
                'Highly organised',
                'Able to learn new skills efficiently',
                'Able to work independently or as part of a team',
                'Able to take on and fulfill own responsibilities',
            ]}
        />

        <Section>
            <SectionTitle>Working Experience</SectionTitle>
            <Subtitle>Internship (Oct 2021 - Dec 2021)</Subtitle>
            <div>Didian Sdn Bhd</div>
            <ul>
                <List>Full Stack Developer</List>
            </ul>
        </Section>

        <Section>
            <SectionTitle>Education</SectionTitle>
            <Subtitle>
                Bachelor of Science (Honours) Software Engineering (May 2019 -
                Present)
            </Subtitle>
            <div>Universiti Tunku Abdul Rahman</div>
            <ul>
                <List>CGPA - 3.4728</List>
                <List>GPA - 3.6133</List>
            </ul>
        </Section>

        <Section>
            <SectionTitle>References</SectionTitle>
            <Refers>
                <Referer>
                    <Subtitle>Ms Gunavathi a/p Duraisamy</Subtitle>
                    <div>Lecturer</div>
                    <ul>
                        <List>Phone: 017-6639798</List>
                        <List>Email: gunavathi@utar.edu.my</List>
                    </ul>
                </Referer>
                <Referer>
                    <Subtitle>Mr Wong Chim Chwee</Subtitle>
                    <div>Assistant Professor</div>
                    <ul>
                        <List>Phone: 03-90860288</List>
                        <List>Email: wongcc@utar.edu.my</List>
                    </ul>
                </Referer>
            </Refers>
        </Section>
    </ResumeRightContainer>
);

const ResumeSection = styled.div`
    padding: 20px;
    @media (max-width: 840px) {
        width: 100% !important;
        padding: 0 !important;
    }
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

const ResumeRightContainer = styled(ResumeSection)`
    width: 70%;
    background-color: ${({ theme }) => theme.theme.secondaryColor};
    color: ${({ theme }) => theme.theme.primaryColor};
`;

const Subtitle = styled.div`
    font-weight: bolder;
    margin: 0 0 15px 0;
`;

const List = styled.li`
    margin: 0 0 10px 0;
    color: ${({ theme }) => theme.theme.resumeListText};
`;

const Refers = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`;

const Referer = styled.div`
    margin: 0 25px 25px 0;
`;

export default ResumeRight;
