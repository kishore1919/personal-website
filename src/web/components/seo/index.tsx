import React from 'react';
import { DefaultSeo } from 'next-seo';
import Schema from './schema';
import { colorTheme } from '../../theme';

const Seo = (
	props: Readonly<{
		title: string;
		description: string;
		keywords: ReadonlyArray<string>;
		url: undefined | string;
	}>
) => {
	const origin = process.env.NEXT_PUBLIC_ORIGIN;

	const url = props.url ? `${origin}/${props.url}` : origin;

	const iconPath = '/images/icons';
	const dimensions = [72, 96, 128, 152, 192, 384, 512] as const;

	const name = 'Gervin';

	const title = `${name} | ${props.title}`;

	const { description } = props;

	const content = colorTheme.contrast.black;

	return (
		<React.Fragment>
			<Schema />
			<DefaultSeo
				title={title}
				canonical={url}
				defaultTitle={title}
				titleTemplate={title}
				description={description}
				twitter={{
					handle: `@${name}`,
					site: `@${name}`,
					cardType: 'summary_large_image',
				}}
				openGraph={{
					url,
					title,
					description,
					images: dimensions.map((dimension) => {
						const squareDimension = `${dimension}x${dimension}`;

						return {
							alt: `website icon as dimension of ${squareDimension}`,
							width: dimension,
							height: dimension,
							url: `${iconPath}/icon-${squareDimension}.png`,
						};
					}),
				}}
				additionalMetaTags={[
					{
						name: 'keyword',
						content: `Gervin Fung Da Xuen, ${name}, Dart, Rust, Java, TypeScript, React-based, FullStack Developer, PoolOfDeath20, Game Developer, ${props.keywords.join(
							','
						)}`,
					},
					{
						name: 'author',
						content: 'Gervin Fung Da Xuen | PoolOfDeath20',
					},
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1',
					},
					{
						name: 'mobile-web-app-capable',
						content: 'yes',
					},
					{
						name: 'apple-mobile-web-app-capable',
						content: 'yes',
					},
					{
						name: 'application-name',
						content: name,
					},
					{
						name: 'application-mobile-web-app-title',
						content: name,
					},
					{
						name: 'theme-color',
						content,
					},
					{
						name: 'msapplication-navbutton-color',
						content,
					},
					{
						name: 'apple-mobile-web-app-status-bar-style',
						content,
					},
					{
						name: 'msapplication-starturl',
						content: 'index.html',
					},
				]}
				additionalLinkTags={[
					{
						rel: 'icon',
						type: 'image/x-icon',
						href: `${iconPath}/favicon.ico`,
					},
					{
						rel: 'apple-touch-icon',
						type: 'image/x-icon',
						href: `${iconPath}/favicon.ico`,
					},
					...dimensions.flatMap((dimension) => {
						const sizes = `${dimension}x${dimension}`;
						const href = `${iconPath}/icon-${sizes}.png`;
						return [
							{
								href,
								sizes,
								rel: 'icon',
							},
							{
								href,
								sizes,
								rel: 'apple-touch-icon',
							},
						];
					}),
				]}
			/>
		</React.Fragment>
	);
};

export default Seo;
