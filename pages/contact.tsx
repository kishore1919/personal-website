import type { SxProps, Theme } from '@mui/material/styles';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { capitalize } from '@poolofdeath20/util';
import React from 'react';

import { ContactMessageParser } from '../src/common/contact';
import {
	sendMessage,
	SendMessageError,
} from '../src/web/api-functions/contact';
import { Error, Success, Info } from '../src/web/components/common/alert';
import Holder from '../src/web/components/common/holder';
import Section from '../src/web/components/common/section';
import Seo from '../src/web/components/seo';
import consts from '../src/web/const';
import useBreakpoint from '../src/web/hooks/use-breakpoint-value';

const TextFieldInput = (
	props: Readonly<{
		id: string;
		value: string;
		multiline?: true;
		error: undefined | string;
		placeholder: string;
		type: 'text' | 'email';
		setValue: (_: string) => void;
		delay: number;
	}>
) => {
	const { setValue, ...rest } = props;

	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation =
		process.env.NEXT_PUBLIC_NODE_ENV === 'testing'
			? undefined
			: ({
					transition: 'opacity 1s',
					transitionDelay: `${props.delay}00ms`,
					opacity: show ? 1 : 0,
				} satisfies SxProps<Theme>);

	return (
		<TextField
			{...rest}
			autoComplete="off"
			error={Boolean(props.error)}
			helperText={props.error}
			label={capitalize(props.id)}
			onChange={(event) => {
				event.persist();
				setValue(event.target.value);
			}}
			required
			rows={props.multiline ? 8 : 0}
			slotProps={{
				inputLabel: {
					required: false,
				},
				htmlInput: {
					spellCheck: 'false',
				},
			}}
			sx={{
				zIndex: 0,
				backgroundColor: 'background.default',
				...animation,
			}}
		/>
	);
};

const HoneyPot = (
	props: Readonly<{
		value: string;
		setValue: (value: string) => void;
	}>
) => {
	const hidden = {
		label: React.useRef(null as null | HTMLLabelElement),
		input: React.useRef(null as null | HTMLInputElement),
	};

	const identifier = 'fax';

	React.useEffect(() => {
		const hideElement = (element: null | HTMLElement) => {
			element?.style.setProperty('visibility', 'hidden');
			element?.style.setProperty('display', 'none');
			element?.style.setProperty('opacity', '0');
			element?.style.setProperty('z-index', '-1');
		};

		hideElement(hidden.label.current);
		hideElement(hidden.input.current);
	}, [hidden.label, hidden.input]);

	return (
		<React.Fragment>
			<label
				className={identifier}
				htmlFor={identifier}
				ref={hidden.label}
				tabIndex={-1}
			>
				Fax
			</label>
			<input
				autoComplete="off"
				className={identifier}
				id={identifier}
				name={identifier}
				onChange={(event) => {
					props.setValue(event.target.value);
				}}
				ref={hidden.input}
				tabIndex={-1}
				type="text"
				value={props.value}
			/>
		</React.Fragment>
	);
};

const Contact: NextPage = () => {
	const emptyContactInfo = {
		name: '',
		email: '',
		message: '',
	};
	const [contactInfo, setContactInfo] = React.useState(emptyContactInfo);

	const [contactInfoParseResult, setContactInfoParseResult] = React.useState(
		undefined as undefined | ContactMessageParser['parse']
	);

	const [honeyPot, setHoneyPot] = React.useState('');

	const [messageResult, setMessageResult] = React.useState(
		undefined as
			| undefined
			| Readonly<
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
			  >
	);

	const [show, setShow] = React.useState(false);

	React.useEffect(() => {
		setShow(true);
	}, []);

	const animation: SxProps<Theme> | undefined =
		process.env.NEXT_PUBLIC_NODE_ENV === 'testing'
			? undefined
			: {
					transition: 'opacity 1s',
					transitionDelay: '200ms',
					opacity: show ? 1 : 0,
				};

	const breakPoint = useBreakpoint();

	const messageSentOutMessage = 'Your message has been successfully sent!';
	const messageFailedMessage =
		'Please ensure that each field is filled in correctly';

	const setMessageResultToUndefined = () => {
		return setMessageResult(undefined);
	};

	React.useEffect(() => {
		if (!messageResult || messageResult.status === 'sending') {
			return;
		}

		const timer = setTimeout(setMessageResultToUndefined, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [messageResult]);

	return (
		<React.Fragment>
			<Seo
				description="I am Gervin Fung Da Xuen. Everything you want to know about me as a software engineer, can be found here. Feel free to poke around. Every side projects deemed important/useful will be shown here. All side projects is available as repositories/organizations on Github"
				keywords={['Personal Website', 'Contact Page']}
				title="Contact"
				url="contact"
			/>
			<Holder sx={animation}>
				<Section
					elevation={0}
					sx={({ palette }) => {
						return {
							borderRadius: 0,
							boxShadow: [
								`-5px 5px ${palette.custom.striking.green}`,
								`5px -5px ${palette.custom.striking.red}`,
							].join(' ,'),
							width: consts.width.others[breakPoint ?? 'xl'],
							backgroundColor: 'background.default',
						};
					}}
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
								backgroundColor: 'custom.opposite',
							}}
						>
							<Typography
								sx={{
									fontWeight: 'bold',
									color: 'custom.default',
								}}
							>
								Alright, you want to contact me?
							</Typography>
							<Typography
								sx={{
									fontWeight: 'bold',
									color: 'custom.default',
								}}
							>
								Just drop me a line! I will do my best to
								respond if need be
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
							<HoneyPot setValue={setHoneyPot} value={honeyPot} />
							<TextFieldInput
								delay={2}
								error={
									contactInfoParseResult?.name.status !==
									'error'
										? undefined
										: contactInfoParseResult.name.reason
								}
								id="name"
								placeholder="What did your mom call you"
								setValue={(name) => {
									setContactInfo((prev) => {
										return {
											...prev,
											name,
										};
									});
								}}
								type="text"
								value={contactInfo.name}
							/>
							<TextFieldInput
								delay={4}
								error={
									contactInfoParseResult?.email.status !==
									'error'
										? undefined
										: contactInfoParseResult.email.reason
								}
								id="email"
								placeholder="Where can I email you back"
								setValue={(email) => {
									setContactInfo((prev) => {
										return {
											...prev,
											email,
										};
									});
								}}
								type="email"
								value={contactInfo.email}
							/>
							<TextFieldInput
								delay={6}
								error={
									contactInfoParseResult?.message.status !==
									'error'
										? undefined
										: contactInfoParseResult.message.reason
								}
								id="message"
								multiline
								placeholder="Remember, short & sweet please"
								setValue={(message) => {
									setContactInfo((prev) => {
										return {
											...prev,
											message,
										};
									});
								}}
								type="text"
								value={contactInfo.message}
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
									onClick={(event) => {
										event.preventDefault();
										const { status, ...values } =
											ContactMessageParser.from(
												contactInfo
											).allValueIsValid();
										if (status === 'error') {
											setContactInfoParseResult(values);
											return setMessageResult({
												status: 'failed',
												reason: messageFailedMessage,
											});
										}
										setMessageResult({
											status: 'sending',
										});
										sendMessage({
											name: contactInfo.name,
											email: contactInfo.email,
											message: contactInfo.message,
											...(!honeyPot
												? undefined
												: ({
														isHoneyPot: true,
													} as const)),
										})
											.then((result) => {
												switch (result.type) {
													case 'input': {
														return setMessageResult(
															{
																status: 'failed',
																reason: messageFailedMessage,
															}
														);
													}
													case 'succeed': {
														setContactInfo(
															emptyContactInfo
														);
														return setMessageResult(
															{
																status: 'succeed',
																message:
																	messageSentOutMessage,
															}
														);
													}
												}
											})
											.catch((message: unknown) => {
												if (
													!(
														message instanceof
														SendMessageError
													)
												) {
													throw new TypeError(
														'Message is not an instance of Error'
													);
												}

												setMessageResult({
													status: 'failed',
													reason: message.message,
												});
											});
									}}
									sx={({ palette }) => {
										return {
											width: 'fit-content',
											color: 'custom.striking.red',
											border:
												palette.mode === 'dark'
													? 'none'
													: `1px solid ${palette.custom.striking.red}`,
											backgroundColor:
												'custom.contrast.white',
											background: [
												`linear-gradient(to right`,
												`${palette.custom.striking.red} 50%`,
												`${palette.custom.contrast.white} 50%)`,
											].join(','),
											backgroundSize: '300% 100%',
											backgroundPosition: 'right bottom',
											transition: 'all 0.2s ease-out',
											fontSize: '1em',
											'&:hover': {
												color: 'custom.contrast.white',
												backgroundColor:
													'custom.striking.red',
												backgroundPosition:
													'left bottom',
											},
										};
									}}
									variant="contained"
								>
									SEND
								</Button>
							</Box>
						</FormControl>
					</Box>
				</Section>
			</Holder>
		</React.Fragment>
	);
};

export default Contact;
