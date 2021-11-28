import * as React from 'react';
import styled from 'styled-components';
const SendingMessage = React.lazy(() =>
    import('../components/contact/Message').then((module) => ({
        default: module.SendingMessage,
    }))
);
const FinalMessage = React.lazy(() =>
    import('../components/contact/Message').then((module) => ({
        default: module.FinalMessage,
    }))
);
import {
    getName,
    getEmail,
    getMessage,
    allValueValid,
    Name,
    Email,
    Message,
    Data,
} from '../util/contact';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import Title from '../components/Title';
import { contactURL } from '../util/url';
import { HashLoading, ErrorBoundary } from '../components/HashLoading';

type ContactState = {
    readonly name: Name;
    readonly email: Email;
    readonly message: Message;
    readonly showFinal: boolean;
    readonly showWaiting: boolean;
};

const Contact = (): JSX.Element => {
    const [state, setState] = React.useState<ContactState>({
        name: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        message: {
            value: '',
            error: '',
        },
        showFinal: false,
        showWaiting: false,
    });

    const { email, message, name, showFinal, showWaiting } = state;

    const setShowWaiting = (showWaiting: boolean) =>
        setState((prevState) => ({
            ...prevState,
            showWaiting,
        }));

    const submit = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (allValueValid(name, email, message)) {
            setShowWaiting(true);
            fetch(contactURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                referrer: 'no-referrer',
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                }),
            })
                .then((res) => {
                    console.log({ res });
                    return res.json();
                })
                .then((json: Data) => {
                    setShowWaiting(false);
                    showMessage(json);
                })
                .catch((err) => {
                    console.error(err);
                    setShowWaiting(false);
                    alert(
                        "I am sorry to inform you that there's an error in sending email. Please write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you"
                    );
                });
        }
    };

    const setShowMessage = ({
        email,
        message,
        name,
        showFinal,
    }: {
        readonly name: ContactState['name'];
        readonly email: ContactState['email'];
        readonly message: ContactState['message'];
        readonly showFinal: ContactState['showFinal'];
    }) => {
        setState((prevState) => ({
            ...prevState,
            name,
            email,
            message,
            showFinal,
        }));
    };

    const showMessage = (json: Data) => {
        const { type } = json;
        switch (type) {
            case 'input':
            case 'succeed':
                setShowMessage({
                    ...json,
                    showFinal: type === 'succeed',
                });
                break;
            case 'failed':
                alert(
                    "I am sorry to inform you that there's an error in sending email. Please write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you"
                );
                break;
        }
    };

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>
        setState((prevState) => ({
            ...prevState,
            name: getName(event.target.value),
        }));

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
        setState((prevState) => ({
            ...prevState,
            email: getEmail(event.target.value),
        }));

    const changeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setState((prevState) => ({
            ...prevState,
            message: getMessage(event.target.value),
        }));

    return (
        <ContentContainer>
            <Title
                title="Contact"
                content="PoolOfDeath20 or Gervin's contact page. Come to this page to contact him"
            />

            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <SendingMessage
                        show={showWaiting}
                        closeMessage={() => setShowWaiting(false)}
                    />
                </React.Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <FinalMessage
                        show={showFinal}
                        closeMessage={() =>
                            setState((prevState) => ({
                                ...prevState,
                                showFinal: false,
                            }))
                        }
                    />
                </React.Suspense>
            </ErrorBoundary>

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
                    <ContactFormDiv onSubmit={submit}>
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
                                        onChange={changeName}
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
                                        onChange={changeEmail}
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
                                        onChange={changeMessage}
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
