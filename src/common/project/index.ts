import type { DeepReadonly } from '../type';

type Projects = DeepReadonly<
    {
        name: string;
        description: string;
        url: string;
    }[]
>;

type Data = DeepReadonly<{
    page: number;
    languages: string[];
    projects: Projects;
    language: string;
}>;

type QueryParams = Readonly<{
    language: string;
    page: number;
}>;

export type { Projects, Data, QueryParams };
