export type PortfolioData = {
    readonly name: string;
    readonly description: string;
    readonly language: string;
    readonly url: string;
};

export type Data = {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguages: ReadonlyArray<string>;
    readonly portfolioPaginated: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
};
