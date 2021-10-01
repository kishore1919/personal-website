import React, { Suspense, lazy, useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
const SendingMessage = lazy(() => import('../components/contact/Message').then(module => ({ default: module.SendingMessage })));
const FinalMessage = lazy(() => import('../components/contact/Message').then(module => ({ default: module.FinalMessage })));
import { getNameError, getEmailError, getMessageError, allValueValid, status, NameErr, EmailErr, MessageErr, Data } from '../util/contact';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import Title from '../components/Title';
import { contactURL } from '../util/url';
import { HashLoading, ErrorBoundary } from '../components/HashLoading';

const Contact = (): JSX.Element => {

    const [nameErr, setNameErr] = useState<NameErr>('');
    const [emailErr, setEmailErr] = useState<EmailErr>('');
    const [messageErr, setMessageErr] = useState<MessageErr>('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [showFinal, setShowFinal] = useState(false);
    const [showWaiting, setShowWaiting] = useState(false);

    const submit = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (allValueValid(name, email, message, nameErr, emailErr, messageErr)) {
            const data = JSON.stringify({name, email, message});
            const option = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                referrer: 'no-referrer',
                body: data
            };
            setShowWaiting(true);
            fetch(contactURL, option).then(res => res.json()).then((json: Data) => {
                setShowWaiting(false);
                showMessage(json)
            }).catch(err => {
                console.error(err.message);
                setShowWaiting(false);
                alert('I am sorry to inform you that there\'s an error in sending email. Please write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you');
            });
        }
    };

    const showMessage = (json: Data) => {
        const stat = json.status;
        if (stat === status.succeed) {
            setName('');
            setEmail('');
            setMessage('');
            setShowFinal(true);
        } else if (stat === status.failed) {
            alert('I am sorry to inform you that there\'s an error in sending email. Please write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you');
        } else if (stat === status.input) {
            if (json.nameErr !== undefined && json.emailErr !== undefined && json.messageErr !== undefined) {
                setNameErr(json.nameErr);
                setEmailErr(json.emailErr);
                setMessageErr(json.messageErr);
            } else {
                throw new Error('None of the error messages can be undefined');
            }
        }
    };

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNameErr(getNameError(name));
        setName(name);
    };

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmailErr(getEmailError(email));
        setEmail(email);
    };

    const changeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const message = e.target.value;
        setMessageErr(getMessageError(message));
        setMessage(message);
    };

    return (
        <ContentContainer>
            <Title title={'Contact'} content={'PoolOfDeath20 or Gervin\'s contact page. Come to this page to contact him'}/>

            <ErrorBoundary>
                <Suspense fallback={<HashLoading/>}>
                    <SendingMessage show={showWaiting} closeMessage={() => setShowWaiting(false)}/>
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<HashLoading/>}>
                    <FinalMessage show={showFinal} closeMessage={() => setShowFinal(false)}/>
                </Suspense>
            </ErrorBoundary>

            <Container>
                <ContactContainer>
                    <ContactMeContainer>
                        <ContactMeParagraph><b>Got something to ask or tell me?</b></ContactMeParagraph>
                        <ContactMeParagraph><b>Just contact me!</b></ContactMeParagraph>
                    </ContactMeContainer>
                    <ContactFormDiv onSubmit={submit}>
                        <ContactForm>
                            <InputInfo htmlFor='name'>Hello, my name is</InputInfo>
                            <ErrorMessage>{nameErr}</ErrorMessage>
                            <InputLabel><InputDiv><InputField type='text' name='name' id='name' value={name} placeholder='Tony Stark' required onChange={changeName}/></InputDiv></InputLabel>
    
                            <InputInfo htmlFor='email'>You can reach me at</InputInfo>
                            <ErrorMessage>{emailErr}</ErrorMessage>
                            <InputLabel><InputDiv><InputField type='email' name='email' id='email' value={email} placeholder='tonystark@gmail.com' required onChange={changeEmail}/></InputDiv></InputLabel>
    
                            <InputInfo htmlFor='message'>I would like to</InputInfo>
                            <ErrorMessage>{messageErr}</ErrorMessage>
                            <InputLabel><InputDiv><TextArea name='message' id='message' value={message} placeholder='Ask you a question/Tell you something' rows={8} required onChange={changeMessage}/></InputDiv></InputLabel>
    
                            <SubmitButtonContainer><SubmitButton/></SubmitButtonContainer>
                        </ContactForm>
                    </ContactFormDiv>
                </ContactContainer>
            </Container>
        </ContentContainer>
    );
}

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
    box-shadow: -5px 5px ${({ theme }) => theme.greenColor}, 5px -5px ${({ theme }) => theme.redColor};
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
    method: 'POST'
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
    text-shadow: 4px 2px ${({ theme }) => theme.greenColor}, -4px 2px ${({ theme }) => theme.redColor};
    color: ${({ theme }) => theme.theme.primaryColor};
    font-size: 2.5em;
    @media (max-width: 973px) {
        text-shadow: 3px 1px ${({ theme }) => theme.greenColor}, -3px 1px ${({ theme }) => theme.redColor};
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
    value: 'Send'
})`
    padding: 6px 16px 6px 16px;
    background-color: ${({ theme }) => theme.ctaColor};
    background: linear-gradient(to right, ${({ theme }) => theme.ctaColor} 50%, ${({ theme }) => theme.theme.primaryColor} 50%) left;
    background-size: 200%;
    color: white;
    border-color: transparent;
    font-size: 2.5em;
    transition: all 0.25s ease;
    &:hover {
        background-color: ${({ theme }) => theme.theme.secondaryColor};
        cursor: pointer;
        background-position: right;
        color:  ${({ theme }) => theme.ctaColor};
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