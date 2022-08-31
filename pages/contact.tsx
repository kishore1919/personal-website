import React from 'react';
import styled from 'styled-components';
import { FinalMessage } from '../src/web/components/contact/Message';
import { SendingMessage } from '../src/web/components/contact/Message';
import {
    isAllValueValid,
    Data,
    Email,
    getEmail,
    getMessage,
    getName,
    Message,
    Name,
    defaultValue,
} from '../src/common/contact';
import { GlobalContainer } from '../src/web/theme/GlobalTheme';
import Title from '../src/web/components/Title';
import { contactURL } from '../src/web/url';
import parseAsData from '../src/web/parser/contact';
import { NextPage } from 'next';

const Contact: NextPage = () => {
    const defaultState = {
        name: defaultValue as Name,
        email: defaultValue as Email,
        message: defaultValue as Message,
        isShowFinal: false as boolean,
    } as const;

    const [state, setState] = React.useState({
        ...defaultState,
        isShowWaiting: false,
    });

    const { email, message, name, isShowFinal, isShowWaiting } = state;

    const setShowWaiting = (isShowWaiting: boolean) =>
        setState((prev) => ({
            ...prev,
            isShowWaiting,
        }));

    const setShowMessage = ({
        email,
        message,
        name,
        isShowFinal,
    }: Readonly<{
        name: Name;
        email: Email;
        message: Message;
        isShowFinal: boolean;
    }>) =>
        setState((prev) => ({
            ...prev,
            name,
            email,
            message,
            isShowFinal,
        }));

    const showMessage = (json: Data) => {
        const { type } = json;
        switch (type) {
            case 'input':
                setShowMessage({
                    ...json,
                    isShowFinal: false,
                });
                break;
            case 'succeed':
                setShowMessage({
                    ...defaultState,
                    isShowFinal: true,
                });
                break;
            case 'failed':
                alert(
                    `I am sorry to inform you that there's an error in sending email.\nError: ${JSON.stringify(
                        json.error
                    ).replace(
                        /"([^"]+)":/g,
                        '$1:'
                    )}.\nPlease write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you`
                );
                break;
        }
    };

    return (
        <ContentContainer>
            <Title
                title="Contact"
                content="PoolOfDeath20 or Gervin's contact page. Come to this page to contact him"
            />
            <SendingMessage
                isShow={isShowWaiting}
                closeMessage={() => setShowWaiting(false)}
            />
            <FinalMessage
                isShow={isShowFinal}
                closeMessage={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowFinal: false,
                    }))
                }
            />
            <Container>
                <ContactContainer>
                    <ContactMeContainer>
                        <ContactMeParagraph>
                            <b>Got something to ask or tell me?</b>
                        </ContactMeParagraph>
                        <ContactMeParagraph>
                            <b>Just contact me!</b>
                        </ContactMeParagraph>
                    </ContactMeContainer>
                    <ContactFormDiv
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (isAllValueValid(name, email, message)) {
                                setShowWaiting(true);
                                fetch(contactURL, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    referrer: 'no-referrer',
                                    body: JSON.stringify({
                                        name: name.value,
                                        email: email.value,
                                        message: message.value,
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((json) => {
                                        setShowWaiting(false);
                                        showMessage(parseAsData(json));
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        setShowWaiting(false);
                                        alert(
                                            `I am sorry to inform you that there's an error in sending email.\nError: ${JSON.stringify(
                                                error
                                            ).replace(
                                                /"([^"]+)":/g,
                                                '$1:'
                                            )}.\nPlease write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you`
                                        );
                                    });
                            }
                        }}
                    >
                        <ContactForm>
                            <InputInfo htmlFor="name">
                                Hello, my name is
                            </InputInfo>
                            <ErrorMessage>{name.error}</ErrorMessage>
                            <InputLabel>
                                <InputDiv>
                                    <InputField
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name.value}
                                        placeholder="Tony Stark"
                                        required
                                        onChange={(event) =>
                                            setState((prev) => ({
                                                ...prev,
                                                name: getName(
                                                    event.target.value
                                                ),
                                            }))
                                        }
                                    />
                                </InputDiv>
                            </InputLabel>
                            <InputInfo htmlFor="email">
                                You can reach me at
                            </InputInfo>
                            <ErrorMessage>{email.error}</ErrorMessage>
                            <InputLabel>
                                <InputDiv>
                                    <InputField
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email.value}
                                        placeholder="tonystark@gmail.com"
                                        required
                                        onChange={(event) =>
                                            setState((prev) => ({
                                                ...prev,
                                                email: getEmail(
                                                    event.target.value
                                                ),
                                            }))
                                        }
                                    />
                                </InputDiv>
                            </InputLabel>
                            <InputInfo htmlFor="message">
                                I would like to
                            </InputInfo>
                            <ErrorMessage>{message.error}</ErrorMessage>
                            <InputLabel>
                                <InputDiv>
                                    <TextArea
                                        name="message"
                                        id="message"
                                        value={message.value}
                                        placeholder="Ask you a question/Tell you something"
                                        rows={8}
                                        required
                                        onChange={(event) =>
                                            setState((prev) => ({
                                                ...prev,
                                                message: getMessage(
                                                    event.target.value
                                                ),
                                            }))
                                        }
                                    />
                                </InputDiv>
                            </InputLabel>
                            <SubmitButtonContainer>
                                <SubmitButton />
                            </SubmitButtonContainer>
                        </ContactForm>
                    </ContactFormDiv>
                </ContactContainer>
            </Container>
        </ContentContainer>
    );
};

const ContentContainer = styled(GlobalContainer)``;

const Container = styled.div`
    display: flex;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
`;

const ContactContainer = styled.div`
    display: block;
    justify-content: center;
    align-items: center;
    width: 75vw;
    margin: 15px;
    box-shadow: -5px 5px ${({ theme }) => theme.greenColor},
        5px -5px ${({ theme }) => theme.redColor};
    @media (max-width: 463px) {
        width: 95vw;
    }
`;

const ContactFormDiv = styled.div`
    padding: 20px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.theme.primaryColor};
`;

const ContactForm = styled.form.attrs({
    method: 'POST',
})`
    @media (max-width: 463px) {
        margin: -7px;
    }
`;

const ContactMeContainer = styled.div`
    padding: 1px;
    margin: 0 auto;
    background: ${({ theme }) => theme.theme.secondaryColor};
`;

const ContactMeParagraph = styled.p`
    text-align: center;
    letter-spacing: 5.5px;
    text-shadow: 4px 2px ${({ theme }) => theme.greenColor},
        -4px 2px ${({ theme }) => theme.redColor};
    color: ${({ theme }) => theme.theme.primaryColor};
    font-size: 2.5em;
    @media (max-width: 973px) {
        text-shadow: 3px 1px ${({ theme }) => theme.greenColor},
            -3px 1px ${({ theme }) => theme.redColor};
        font-size: 2em;
    }
    @media (max-width: 847px) {
        font-size: 1.75em;
    }
    @media (max-width: 586px) {
        font-size: 1.5em;
    }
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 15px;
    border: 2px solid ${({ theme }) => theme.contactInputBorder};
    box-sizing: border-box;
    resize: vertical;
    background-color: ${({ theme }) => theme.theme.primaryColor};
    color: ${({ theme }) => theme.theme.secondaryColor};
    outline: none;
    font-size: 0.6em;
    &:hover {
        outline: none;
    }
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
    @media (max-width: 463px) {
        padding: 10px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 15px;
    border: 2px solid ${({ theme }) => theme.contactInputBorder};
    box-sizing: border-box;
    resize: vertical;
    background-color: ${({ theme }) => theme.theme.primaryColor};
    color: ${({ theme }) => theme.theme.secondaryColor};
    outline: none;
    font-size: 0.6em;
    resize: none;
    &:hover {
        outline: none;
    }
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
    @media (max-width: 463px) {
        padding: 10px;
    }
`;

const InputLabel = styled.label`
    color: ${({ theme }) => theme.theme.contactMeLabel};
    font-size: 2em;
    @media (max-width: 973px) {
        font-size: 1.3em;
    }
    @media (max-width: 586px) {
        font-size: 1.5em;
    }
`;

const InputInfo = styled(InputLabel)`
    margin-right: 10px;
`;

const InputDiv = styled.div`
    margin: 20px;
    border: none;
    @media (max-width: 491px) {
        margin: 20px 5px 20px 5px;
    }
`;

const SubmitButtonContainer = styled.div`
    text-align: center;
    margin-bottom: 10px;
`;

const SubmitButton = styled.input.attrs({
    type: 'submit',
    value: 'Send',
})`
    padding: 6px 16px 6px 16px;
    background-color: ${({ theme }) => theme.ctaColor};
    background: linear-gradient(
            to right,
            ${({ theme }) => theme.ctaColor} 50%,
            ${({ theme }) => theme.theme.primaryColor} 50%
        )
        left;
    background-size: 200%;
    color: white;
    border-color: transparent;
    font-size: 2.5em;
    transition: all 0.25s ease;
    &:hover {
        background-color: ${({ theme }) => theme.theme.secondaryColor};
        cursor: pointer;
        background-position: right;
        color: ${({ theme }) => theme.ctaColor};
    }
    letter-spacing: 1.5px;
    font-family: 'Orbitron', sans-serif !important;
    @media (max-width: 973px) {
        font-size: 2em;
    }
    @media (max-width: 847px) {
        font-size: 1.75em;
    }
    @media (max-width: 586px) {
        font-size: 1.5em;
    }
`;

export default Contact;
