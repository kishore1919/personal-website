import fetch from 'node-fetch';

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

const fetchGithubAPI = async () =>
    (
        await fetch('https://api.github.com/users/GervinFung/repos?per_page=50')
    ).json();

export const queryLanguageSelector = ({
    all,
    github,
    portfolioData,
}: {
    readonly all: 'All';
    readonly github: any;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
}): ReadonlyArray<string> => {
    const languages = portfolioData.flatMap((portfolio) => {
        const name = portfolio.path;
        return github.flatMap((repo: any) =>
            repo.name === name ? [repo.language] : []
        );
    });
    return [all, ...Array.from(new Set(languages))];
};

export const queryPortfolio = ({
    all,
    github,
    portfolioData,
    selectedLanguage,
}: {
    readonly all: 'All';
    readonly github: any;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
    readonly selectedLanguage: string;
}): ReadonlyArray<PortfolioData> => {
    if (selectedLanguage === all) {
        return portfolioData;
    }

    const portfolioQueried = portfolioData.flatMap((portfolio) => {
        const name = portfolio.path;
        return github.flatMap((repo: any) =>
            repo.name === name && repo.language === selectedLanguage
                ? [portfolio]
                : []
        );
    });

    return portfolioQueried;
};

export const validatePageQuery = ({
    numberOfPortfolioPerPage,
    page,
}: {
    readonly page: string;
    readonly numberOfPortfolioPerPage: number;
}): number => {
    const parsedPage = Number.parseInt(page, 10);
    if (parsedPage >= 0) {
        return parsedPage * numberOfPortfolioPerPage;
    }
    return 0;
};

const processLanguage = (language: string): string => {
    if (language === 'CPP') {
        return 'C++';
    } else if (language === 'C') {
        return 'C#';
    }
    return language;
};

export const validatePortfolioLanguageQuery = ({
    all,
    github,
    language,
}: {
    readonly github: any;
    readonly language: string;
    readonly all: 'All';
}): string | 'All' => {
    const finalizedLang = processLanguage(language).toLowerCase();
    const langFound = github.find(
        (repo: any) =>
            repo.language && repo.language.toLowerCase() === finalizedLang
    );
    return langFound === undefined ? all : langFound.language;
};

export const queryPortfolioForPaging = ({
    pageNumber,
    portfolioData,
}: {
    readonly pageNumber: number;
    readonly portfolioData: ReadonlyArray<PortfolioData>;
}): ReadonlyArray<PortfolioData> =>
    portfolioData.flatMap((_, index) => {
        const data = portfolioData[index + pageNumber];
        return index < 9 ? (data ? [data] : []) : [];
    });

export const githubAPI = fetchGithubAPI();
export const portfolioData = [
    {
        path: 'LibGDX-Chess-Game',
        caption:
            'A Parallel AI Chess Game made with LibGDX Framework. Choose against AI from Level 1 to Level 10. You can play against your friend as well.',
    },
    {
        path: 'MinimalTicTacToe',
        caption:
            'Simple AI TicTacToe made with React + TypeScript and Styled-Components. Choose against AI or human. You can play in 3x3 grid up to 5x5.',
    },
    {
        path: 'TextEditorFX',
        caption:
            'A Simple Text Editor similar to NotePad. My first JavaFX project. I wrote this as an upgraded version of the previous TextEditor.',
    },
    {
        path: 'SimpleParallelChessAI',
        caption:
            'A Parallel AI Chess Game made with Java Swing. Choose against AI from Level 1 to Level 10. You can play against your friend as well.',
    },
    {
        path: 'AndroidSimpleAIChess',
        caption:
            'First Android Project - Parallel AI Chess Game. Choose against AI from Level 1 to Level 10. You can play against your friend as well.',
    },
    {
        path: 'RealTimeMarkdown',
        caption:
            'First React Project - A Markdown Editor made with React + TypeScript',
    },
    {
        path: 'Connect4',
        caption:
            'A Connect-4 Game written in C# WinForms. This program was written to familiarize myself with C# syntax since C# is very similar to Java.',
    },
    {
        path: 'TicTacToe',
        caption:
            'Simple AI Tic-Tac-Toe Game made with Java Swing. Choose against AI or human. You can play in 3x3 grid up to 10x10.',
    },
    {
        path: 'TextEditor',
        caption:
            'A Simple Text Editor similar to NotePad. I wrote this because the undo option of Notepad can only undo once. But with this software you can undo all of your edit.',
    },
    {
        path: 'reversito',
        caption:
            'A NPM package to reverse a string and number and array. Written for fun and to learn to publish NPM package',
    },
    {
        path: 'Room',
        caption:
            'A website build with rental information by web scraping from UTAR Accommodation list and build a better website using the information through collaboration with Eugene Yong',
    },
    {
        path: 'KnapsackProblem',
        caption:
            'Do you know how to solve the knapsack? Come and find out how to solve Knapsack in 5 different ways.',
    },
    {
        path: 'SimpleParallelDispatcher',
        caption:
            'Simple Basic Parallel Program. A Java program that use thread and semaphore to simulate dispatcher.',
    },
];
