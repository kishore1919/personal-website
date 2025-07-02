import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import ClickRefresh from '../common/click-refresh';
import MarginTopBox from '../common/margin-top-box';
import Title from '../common/title';

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

		if (process.env['NEXT_PUBLIC_NODE_ENV'] === 'testing') {
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
	}, [countDown, props.type, router, home]);

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
										onClick={() => {
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
										onClick={() => {
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
