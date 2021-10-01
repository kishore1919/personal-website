import React from 'react';
import styled from 'styled-components';

interface SectionProps {
    readonly title: 'Programming Languages' | 'Technologies' | 'Achievements' | 'Personal Skills';
    readonly list: ReadonlyArray<string>;
}

const SkillSection = ({ title, list }: SectionProps) => (
    <Section>
        <SectionTitle>{title}</SectionTitle>
        <ul>
            {list.map(skill => <List key={skill}>{skill}</List>)}
        </ul>
    </Section>
);

const ResumeRight = () => (
    <ResumeRightContainer>
        <SkillSection
            title='Programming Languages'
            list={['TypeScript & JavaScript', 'Java', 'C#', 'Python']}
        />
        <SkillSection
            title='Technologies'
            list={['JavaFX & Java Swing & JUnit & Gradle', 'React & React Native & NodeJS & Jest', 'Basic Linux & Git Commands', 'Basic MySQL, SQL & MongoDB']}
        />
        <SkillSection
            title='Achievements'
            list={['Building an Intelligent Room Finder System through collaboration with a friend',
            'Built a cross-platform chess game with Java Game Framework - LibGDX Framework',
            'Dean\'s List for January 2021 Trimester',
            'Built a functional Notepad similar to Window\'s Notepad in Java Swing and JavaFX',
            'Built my very own website']}
        />
        <SkillSection
            title='Personal Skills'
            list={['Proficient verbal communication skills in English, Mandarin and Cantonese; satisfactory in Malay',
            'Excellent writing skills in English and Mandarin; satisfactory in Malay',
            'Highly organised',
            'Able to learn new skills efficiently',
            'Able to work independently or as part of a team',
            'Able to take on and fulfill own responsibilities']}
        />

        <Section>
            <SectionTitle>Education</SectionTitle>
            <Subtitle>Bachelor of Science (Honours) Software Engineering (May 2019 - Present)</Subtitle>
            <div>Universiti Tunku Abdul Rahman</div>
            <ul>
                <List>CGPA - 3.4356</List>
                <List>GPA - 3.7033</List>
            </ul>
            <Subtitle>SPM(2017)</Subtitle>
            <div>S. M. Chung Hwa Tenom</div>
            <ul><List>7As 3Bs</List></ul>
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
    text-shadow: 4px 1px ${({ theme }) => theme.greenColor}, -4px 1px ${({ theme }) => theme.redColor};
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