import React from 'react';
import styled from 'styled-components';
import {
    defaultValue,
    Email,
    getEmail,
    getMessage,
    getName,
    isAllValueValid,
    Message,
    Name,
} from '../src/common/contact';
import { GlobalContainer } from '../src/web/theme/global-theme';
import { url } from '../src/web/url';
import parseAsData from '../src/web/parser/contact';
import type { NextPage } from 'next';
import { ToastPromise } from '../src/web/components/toaser';
import Seo from '../src/web/components/seo';
import axios from 'axios';
import links from '../src/web/data/links';

const Contact: NextPage = () => {
    const defaultContactState = {
        name: defaultValue as Name,
        email: defaultValue as Email,
        message: defaultValue as Message,
    } as const;

    const [state, setState] = React.useState({
        ...defaultContactState,
        honeyPot: {
            value: '',
        },
    });

    const hiddenLabel = React.createRef<HTMLLabelElement>();

    const { email, message, name, honeyPot } = state;

    const faxClassName = 'fax';
    const messageSentOutMessage =
        'Your Message Has Been Successfully Sent!\nThank you!';

    React.useEffect(() => {
        const { current } = hiddenLabel;
        if (current) {
            current.style.setProperty('visibility', 'hidden');
            current.style.setProperty('display', 'none');
            current.style.setProperty('opacity', '0');
            current.style.setProperty('z-index', '-1');
        }
    }, []);

    const checkHoneyPot = () => {
        const { value } = honeyPot;
        if (!value) {
            return 'ok';
        }
        toastNotification(
            new Promise((resolve) =>
                setTimeout(() => resolve(messageSentOutMessage), 2000)
            )
        );
        return 'not-ok';
    };

    const toastNotification = (promise: Promise<any>) =>
        ToastPromise({
            promise,
            pending: 'Sending your message...',
            success: {
                render: ({ data }) => data as any,
            },
            error: {
                render: ({ data }) => data as any,
            },
        });

    return (
        <GlobalContainer>
            <Seo
                title="Contact"
                keywords={['Contact']}
                content="Got something to tell me? Wanna get in touch? Wanna hire me? Wanna collab on projects? You can find me here and just email me already"
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
                    <ContactFormDiv>
                        <ContactForm method="POST">
                            <label
                                tabIndex={-1}
                                ref={hiddenLabel}
                                htmlFor={faxClassName}
                                className={faxClassName}
                            >
                                <input
                                    tabIndex={-1}
                                    type="text"
                                    id={faxClassName}
                                    autoComplete="off"
                                    name={faxClassName}
                                    onChange={(event) =>
                                        setState((prev) => ({
                                            ...prev,
                                            honeyPot: {
                                                value: event.target.value,
                                            },
                                        }))
                                    }
                                />
                            </label>
                            <InputInfoContainer>
                                <InputInfo htmlFor="name">
                                    Hello, my name is
                                </InputInfo>
                                <ErrorMessage>{name.error}</ErrorMessage>
                            </InputInfoContainer>
                            <InputLabel htmlFor="name">
                                <InputDiv>
                                    <InputField
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name.value}
                                        placeholder="Bruce Wayne"
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
                            <InputInfoContainer>
                                <InputInfo htmlFor="email">
                                    You can reach me at
                                </InputInfo>
                                <ErrorMessage>{email.error}</ErrorMessage>
                            </InputInfoContainer>
                            <InputLabel htmlFor="email">
                                <InputDiv>
                                    <InputField
                                        required
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email.value}
                                        placeholder="brucewayne@batman.com"
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
                            <InputInfoContainer>
                                <InputInfo htmlFor="message">
                                    I would like to
                                </InputInfo>
                                <ErrorMessage>{message.error}</ErrorMessage>
                            </InputInfoContainer>
                            <InputLabel htmlFor="message">
                                <InputDiv>
                                    <TextArea
                                        required
                                        rows={8}
                                        id="message"
                                        name="message"
                                        value={message.value}
                                        placeholder="Ask you a question/Tell you something"
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
                            <SendButtonContainer>
                                <SendButton
                                    value="SEND"
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        const shouldSend = checkHoneyPot();
                                        if (shouldSend === 'not-ok') {
                                            return;
                                        }
                                        if (
                                            !isAllValueValid({
                                                name,
                                                email,
                                                message,
                                            })
                                        ) {
                                            return;
                                        }
                                        toastNotification(
                                            axios
                                                .post(
                                                    url.contact,
                                                    {
                                                        name: name.value,
                                                        email: email.value,
                                                        message: message.value,
                                                    },
                                                    {
                                                        headers: {
                                                            'Content-Type':
                                                                'application/json',
                                                        },
                                                    }
                                                )
                                                .then(({ data }) => {
                                                    const parsedJson =
                                                        parseAsData(data);
                                                    switch (parsedJson.type) {
                                                        case 'input':
                                                            setState(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    ...parsedJson,
                                                                })
                                                            );
                                                            break;
                                                        case 'succeed':
                                                            setState(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    ...defaultContactState,
                                                                })
                                                            );
                                                            break;
                                                    }
                                                    return messageSentOutMessage;
                                                })
                                                .catch(() => {
                                                    throw new Error(
                                                        [
                                                            `Oops! I can't send your email as there is an issue`,
                                                            `Please write an email to ${links.gmail}. Thank you`,
                                                        ].join('\n')
                                                    );
                                                })
                                        );
                                    }}
                                />
                            </SendButtonContainer>
                        </ContactForm>
                    </ContactFormDiv>
                </ContactContainer>
            </Container>
        </GlobalContainer>
    );
};

const Container = styled.div`
    display: flex;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;

const ContactContainer = styled.div`
    display: block;
    justify-content: center;
    align-items: center;
    width: 70%;
    margin: 16px 0;
    box-shadow: -5px 5px ${({ theme }) => theme.green},
        5px -5px ${({ theme }) => theme.red};
    @media (max-width: 904px) {
        width: 80%;
    }
    @media (max-width: 741px) {
        width: 85%;
    }
    @media (max-width: 583px) {
        width: 90%;
    }
`;

const ContactFormDiv = styled.div`
    padding: 24px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.theme.primaryColor};
`;

const ContactForm = styled.form`
    @media (max-width: 463px) {
        margin: -7px;
    }
`;

const ContactMeContainer = styled.div`
    padding: 8px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.theme.secondaryColor};
`;

const ContactMeParagraph = styled.p`
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.theme.primaryColor};
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 0.65em;
`;

const InputField = styled.input`
    width: 100%;
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.gray};
    box-sizing: border-box;
    resize: vertical;
    background-color: ${({ theme }) => theme.theme.primaryColor};
    color: ${({ theme }) => theme.theme.secondaryColor};
    outline: none;
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
    @media (max-width: 463px) {
        padding: 10px;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    color: ${({ theme }) => theme.theme.secondaryColor};
    background-color: ${({ theme }) => theme.theme.primaryColor};
    border: 2px solid ${({ theme }) => theme.gray};
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

const InputInfoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const InputLabel = styled.label`
    font-size: 1em;
    color: ${({ theme }) => theme.theme.contactMeLabel};
`;

const InputInfo = styled(InputLabel)`
    margin: 0 16px 0 0;
`;

const InputDiv = styled.div`
    margin: 20px;
    border: none;
    @media (max-width: 491px) {
        margin: 20px 5px 20px 5px;
    }
`;

const SendButtonContainer = styled.div`
    display: grid;
    place-items: center;
`;

const SendButton = styled.input`
    text-decoration: none;
    font-size: 1em;
    padding: 16px 48px;
    position: relative;
    cursor: pointer;
    color: ${({ theme }) => theme.red};
    background: linear-gradient(
        to right,
        ${({ theme }) => theme.red} 50%,
        ${({ theme }) => theme.theme.secondaryColor} 50%
    );
    border: 1px solid ${({ theme }) => theme.theme.secondaryColor};
    background-size: 300% 100%;
    background-position: right bottom;
    transition: all 0.2s ease-out;
    :hover {
        border: 1px solid ${({ theme }) => theme.red};
        color: ${({ theme }) => theme.theme.secondaryColor};
        background-position: left bottom;
    }
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

export default Contact;
