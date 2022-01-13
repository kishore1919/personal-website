import {
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsString,
} from 'parse-dont-validate';

type PortfolioData = Readonly<{
    name: string;
    description: string;
    language: string;
    url: string;
}>;

export type Data = Readonly<{
    numberOfPagesQueried: number;
    portfolioLanguages: ReadonlyArray<string>;
    portfolioPaginated: ReadonlyArray<PortfolioData>;
    selectedLanguage: string;
}>;

export const parseAsPortfolioData = (data: any): Data => ({
    numberOfPagesQueried: parseAsNumber(
        data.numberOfPagesQueried
    ).orElseThrowDefault('numberOfPagesQueried'),
    portfolioLanguages: parseAsReadonlyArray(data.portfolioLanguages, (val) =>
        parseAsString(val).orElseThrowDefault('portfolioLanguage')
    ).orElseThrowDefault('portfolioLanguages'),
    portfolioPaginated: parseAsReadonlyArray(
        data.portfolioPaginated,
        (val) => ({
            name: parseAsString(val.name).orElseThrowDefault('name'),
            description: parseAsString(val.description).orElseThrowDefault(
                'description'
            ),
            language: parseAsString(val.language).orElseThrowDefault(
                'language'
            ),
            url: parseAsString(val.url).orElseThrowDefault('url'),
        })
    ).orElseThrowDefault('portfolioPaginated'),
    selectedLanguage: parseAsString(data.selectedLanguage).orElseThrowDefault(
        'selectedLanguage'
    ),
});
