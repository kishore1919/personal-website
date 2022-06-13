type Portfolios = ReadonlyArray<
    Readonly<{
        name: string;
        description: string;
        language: string;
        url: string;
    }>
>;

type Data = Readonly<{
    page: number;
    languages: ReadonlyArray<string>;
    portfolios: Portfolios;
    language: string;
}>;

export type { Portfolios, Data };
