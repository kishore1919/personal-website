import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
    defaultValue,
    getEmail,
    getMessage,
    getName,
    isAllValueValid,
} from '../../../common/contact';
import type { Email, Message, Name } from '../../../common/contact';
import Holder from '../common/holder';
import Section from '../common/section';
import sendMessage from './send-message';
import { Error, Success, Info } from '../common/alert';
import type { ID } from '../header';
import consts from '../../const';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const TextFieldInput = ({
    id,
    type,
    value,
    error,
    setValue,
    multiline,
    placeholder,
}: Readonly<{
    id: string;
    value: string;
    multiline?: true;
    error: string;
    placeholder: string;
    type: 'text' | 'email';
    setValue: (_: string) => void;
}>) => (
    <TextField
        required
        id={id}
        type={type}
        value={value}
        autoComplete="off"
        multiline={multiline}
        helperText={error}
        error={Boolean(error)}
        label={capitalize(id)}
        placeholder={placeholder}
        rows={multiline ? 8 : undefined}
        InputLabelProps={{ required: false }}
        inputProps={{
            spellCheck: 'false',
        }}
        sx={{
            zIndex: 0,
            backgroundColor: 'background.default',
        }}
        onChange={(event) => {
            event.persist();
            const { value } = event.target;
            setValue(value);
        }}
    />
);

const Contact = ({ id }: ID) => {
    const defaultContactInfo = {
        name: defaultValue as Name,
        email: defaultValue as Email,
        message: defaultValue as Message,
    } as const;

    const [contactInfo, setContactInfo] = React.useState(defaultContactInfo);

    const [honeyPot, setHoneyPot] = React.useState('');

    const [messageResult, setMessageResult] = React.useState(
        undefined as
            | undefined
            | {
                  status: 'sending';
              }
            | {
                  status: 'failed';
                  reason: string;
              }
            | {
                  status: 'succeed';
                  message: string;
              }
    );

    const hiddenLabel =
        React.useRef() as React.MutableRefObject<HTMLLabelElement>;
    const faxClassName = 'fax';

    const messageSentOutMessage = 'Your Message Has Been Successfully Sent!';
    const messageFailedMessage =
        'Please ensure that each field is filled in correctly';

    const setMessageResultToUndefined = () => setMessageResult(undefined);

    React.useEffect(() => {
        const { current } = hiddenLabel;
        if (current) {
            current.style.setProperty('visibility', 'hidden');
            current.style.setProperty('display', 'none');
            current.style.setProperty('opacity', '0');
            current.style.setProperty('z-index', '-1');
        }
    }, []);

    React.useEffect(() => {
        if (messageResult?.status !== 'succeed') {
            return;
        }
        const timer = setTimeout(setMessageResultToUndefined);
        return () => clearTimeout(timer);
    }, [messageResult]);

    return (
        <Holder
            id={id}
            sx={{
                mt: 16,
            }}
        >
            <Section
                elevation={0}
                sx={({ palette }) => ({
                    borderRadius: 0,
                    boxShadow: [
                        `-5px 5px ${palette.custom.striking.green}`,
                        `5px -5px ${palette.custom.striking.red}`,
                    ].join(' ,'),
                    width: consts.width,
                })}
            >
                {messageResult?.status !== 'failed' ? null : (
                    <Error onClose={setMessageResultToUndefined}>
                        {messageResult.reason}
                    </Error>
                )}
                {messageResult?.status !== 'sending' ? null : (
                    <Info onClose={setMessageResultToUndefined}>
                        Sending your message...
                    </Info>
                )}
                {messageResult?.status !== 'succeed' ? null : (
                    <Success onClose={setMessageResultToUndefined}>
                        {messageResult.message}
                    </Success>
                )}
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <Section
                        sx={{
                            py: 3,
                            px: 4,
                            borderRadius: 0,
                            textAlign: 'center',
                            backgroundColor: 'custom.white',
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                color: 'custom.black',
                            }}
                        >
                            Alright, you want to contact me?
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                color: 'custom.black',
                            }}
                        >
                            Just drop me a line! I will do my best to respond if
                            need be
                        </Typography>
                    </Section>
                    <FormControl
                        sx={{
                            p: 2,
                            boxSizing: 'border-box',
                            width: '96%',
                            gridGap: 16,
                        }}
                    >
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
                                value={honeyPot}
                                name={faxClassName}
                                onChange={(event) =>
                                    setHoneyPot(event.target.value)
                                }
                            />
                        </label>
                        <TextFieldInput
                            id="name"
                            type="text"
                            value={contactInfo.name.value}
                            error={contactInfo.name.error}
                            placeholder="What did your mom call you"
                            setValue={(value) =>
                                setContactInfo((prev) => ({
                                    ...prev,
                                    name: getName(value),
                                }))
                            }
                        />
                        <TextFieldInput
                            id="email"
                            type="email"
                            error={contactInfo.email.error}
                            value={contactInfo.email.value}
                            placeholder="Where can I email you back"
                            setValue={(value) =>
                                setContactInfo((prev) => ({
                                    ...prev,
                                    email: getEmail(value),
                                }))
                            }
                        />
                        <TextFieldInput
                            multiline
                            id="message"
                            type="text"
                            error={contactInfo.message.error}
                            value={contactInfo.message.value}
                            placeholder="Remember, short & sweet please"
                            setValue={(value) =>
                                setContactInfo((prev) => ({
                                    ...prev,
                                    message: getMessage(value),
                                }))
                            }
                        />
                        <Box
                            sx={{
                                mt: 1,
                                width: '100%',
                                display: 'grid',
                                placeItems: 'center',
                            }}
                        >
                            <Button
                                disableElevation
                                variant="contained"
                                sx={({ palette }) => ({
                                    width: 'fit-content',
                                    color: 'custom.striking.red',
                                    backgroundColor: 'custom.white',
                                    background: [
                                        `linear-gradient(to right`,
                                        `${palette.custom.striking.red} 50%`,
                                        `${palette.custom.white} 50%)`,
                                    ].join(','),
                                    backgroundSize: '300% 100%',
                                    backgroundPosition: 'right bottom',
                                    transition: 'all 0.2s ease-out',
                                    fontSize: '1em',
                                    '&:hover': {
                                        color: 'custom.white',
                                        backgroundColor: 'custom.striking.red',
                                        backgroundPosition: 'left bottom',
                                    },
                                })}
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (!isAllValueValid(contactInfo)) {
                                        return setMessageResult({
                                            status: 'failed',
                                            reason: messageFailedMessage,
                                        });
                                    }
                                    setMessageResult({
                                        status: 'sending',
                                    });
                                    sendMessage({
                                        name: contactInfo.name.value,
                                        email: contactInfo.email.value,
                                        message: contactInfo.message.value,
                                        ...(!honeyPot
                                            ? undefined
                                            : ({
                                                  isHoneyPot: true,
                                              } as const)),
                                    })
                                        .then((result) => {
                                            switch (result.type) {
                                                case 'input':
                                                    setContactInfo(result);
                                                    return setMessageResult({
                                                        status: 'failed',
                                                        reason: messageFailedMessage,
                                                    });
                                                case 'succeed':
                                                    setContactInfo(
                                                        defaultContactInfo
                                                    );
                                                    return setMessageResult({
                                                        status: 'succeed',
                                                        message:
                                                            messageSentOutMessage,
                                                    });
                                            }
                                        })
                                        .catch((message) => {
                                            setMessageResult({
                                                status: 'failed',
                                                reason: message,
                                            });
                                        });
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Section>
        </Holder>
    );
};

export default Contact;
