import { DeepReadonly } from '../type';

type Portfolios = DeepReadonly<
    {
        name: string;
        description: string;
        languages: string[];
        url: string;
    }[]
>;

type Data = DeepReadonly<{
    page: number;
    languages: string[];
    portfolios: Portfolios;
    language: string;
}>;

export type { Portfolios, Data };
