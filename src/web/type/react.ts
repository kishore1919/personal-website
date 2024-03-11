import type { PropsWithChildren } from 'react';

type Children = Readonly<{
	children: NonNullable<PropsWithChildren['children']>;
}>;

export type { Children };
