export interface PortfolioData {
    readonly path: string;
    readonly caption: string;
}

export interface Data {
    readonly numberOfPagesQueried: number;
    readonly portfolioLanguageQueried: ReadonlyArray<string>;
    readonly portfolioForPagingQueried: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
}
