import type { Children } from '../../type/react';

import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { SecondaryMainButton } from '../common/button';
import Title from '../common/title';

const chargeHomeButton = keyframes`
    0% {
        background-position: 100% 0%;
    }
    100% {
        background-position: 0% -100%;
    }
`;

const MarginTopBox = (
	props: Readonly<
		Children & {
			shouldNotMarginTop?: true;
		}
	>
) => {
	return (
		<Box
			sx={{
				m: 0,
				mt: !props.shouldNotMarginTop ? 4 : undefined,
				display: 'grid',
				placeItems: 'center',
			}}
		>
			{props.children}
		</Box>
	);
};

const ClickRefresh = (
	props: Readonly<{
		title: string;
		onRefresh: () => void;
		timeToChange: number;
	}>
) => {
	return (
		<SecondaryMainButton
			onClick={props.onRefresh}
			sx={({ palette }) => {
				return {
					fontWeight: 600,
					backgroundColor: 'custom.blue.dark',
					background: [
						`linear-gradient(to left`,
						`${palette.background.default} 50%`,
						`${palette.custom.blue.dark} 50%)`,
					].join(','),
					backgroundSize: '200%',
					display: 'inline-block',
					animation: `${chargeHomeButton} ease-in-out ${props.timeToChange}s`,
					'&:hover': {
						backgroundPosition: 'left !important',
					},
				};
			}}
			title={props.title}
		/>
	);
};

const ErrorContainer = (
	props: Readonly<{
		type: 'reload' | 'replace';
		statusCode?: number;
		messages: ReadonlyArray<string>;
	}>
) => {
	const router = useRouter();

	const home = '/';
	const delay = 1;
	const timeToChange = 15 + delay;

	const [countDown, setCountDown] = React.useState(timeToChange - delay);

	React.useEffect(() => {
		if (!countDown) {
			if (props.type === 'reload') {
				router.reload();
			} else {
				void router.replace(home);
			}
		}

		if (process.env.NEXT_PUBLIC_NODE_ENV === 'testing') {
			return;
		}

		const goTo = setTimeout(() => {
			return setCountDown((countDown) => {
				return countDown - 1;
			});
		}, 1000);

		return () => {
			return clearTimeout(goTo);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countDown]);

	return (
		<Box
			sx={{
				m: 0,
				mt: 4,
				display: 'grid',
				placeItems: 'center',
			}}
		>
			<Title
				content="You took the wrong turn and came here"
				title={`${props.statusCode ?? ''} Error`}
			/>
			<Box
				sx={{
					width: '80%',
				}}
			>
				<MarginTopBox shouldNotMarginTop>
					<Typography
						sx={{
							fontWeight: 'bold',
						}}
						variant="h1"
					>
						{props.statusCode}
					</Typography>
				</MarginTopBox>
				<MarginTopBox>
					{props.messages.map((message, index) => {
						return (
							<Typography
								key={message}
								sx={{
									m: 0,
									mb: index ? 1 : 6,
									color: !index
										? undefined
										: 'text.secondary',
								}}
								variant={!index ? 'h3' : 'inherit'}
							>
								{message}
							</Typography>
						);
					})}
				</MarginTopBox>
				<MarginTopBox>
					<Typography>
						{props.type === 'reload'
							? 'Auto Reload'
							: 'Back to Home'}{' '}
						in: 00:00:
						{`${countDown >= 10 ? '' : 0}${countDown}`}
					</Typography>
					<Typography
						sx={{
							m: 0,
							mt: 4,
							fontWeight: 700,
						}}
					>
						OR
					</Typography>
				</MarginTopBox>
				<MarginTopBox>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							whiteSpace: 'pre',
						}}
					>
						{props.type === 'reload' ? (
							<React.Fragment>
								Quickly{' '}
								<Box
									sx={{
										textDecoration: 'none',
									}}
								>
									<ClickRefresh
										onRefresh={() => {
											return router.reload();
										}}
										timeToChange={timeToChange}
										title="RELOAD"
									/>{' '}
								</Box>
								Now
							</React.Fragment>
						) : (
							<React.Fragment>
								Go{' '}
								<Link
									href={home}
									style={{
										textDecoration: 'none',
									}}
								>
									<ClickRefresh
										onRefresh={() => {
											void router.replace(home);
										}}
										timeToChange={timeToChange}
										title="HOME"
									/>{' '}
								</Link>
								Immediately
							</React.Fragment>
						)}
					</Box>
				</MarginTopBox>
			</Box>
		</Box>
	);
};

export default ErrorContainer;
