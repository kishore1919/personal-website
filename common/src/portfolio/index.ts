type PortfolioData = Readonly<{
    name: string;
    description: string;
    language: string;
    url: string;
}>;

type Data = Readonly<{
    page: number;
    languages: ReadonlyArray<string>;
    portfolios: ReadonlyArray<PortfolioData>;
    language: string;
}>;

export type { PortfolioData, Data };
