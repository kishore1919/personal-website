import React from 'react';
import type { NextPage } from 'next';
import Seo from '../src/web/components/seo';
import { GlobalContainer } from '../src/web/theme/global-theme';
import styled from 'styled-components';
import useWindowResize from '../src/web/hook/window-width-resize';
import { ToastError, ToastPromise } from '../src/web/components/toaser';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Resume: NextPage = () => {
    const { width } = useWindowResize();

    const defaultWidthRatio = 0.8;
    const [state, setState] = React.useState({
        widthRatio: defaultWidthRatio,
        hasSuccessfullyLoaded: undefined as undefined | boolean,
    });

    const { hasSuccessfullyLoaded } = state;
    const cache = React.useRef({
        hasSuccessfullyLoaded,
    });

    const pdf = 'GervinFungDaXuen-Résumé.pdf';

    const resume = `/files/${pdf}` as const;

    const setHasSuccessfullyLoaded = (hasSuccessfullyLoaded: boolean) => {
        setState((prev) => ({
            ...prev,
            hasSuccessfullyLoaded,
        }));
        cache.current = {
            ...cache.current,
            hasSuccessfullyLoaded,
        };
    };

    console.log({
        ...state,
        width,
    });

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            widthRatio:
                width < 800
                    ? 0.85
                    : width < 760
                    ? 0.9
                    : width < 400
                    ? 0.95
                    : defaultWidthRatio,
        }));
    }, [width]);

    React.useEffect(() => {
        const promise = new Promise<string>((resolve, reject) => {
            const interval = setInterval(() => {
                const { hasSuccessfullyLoaded } = cache.current;
                if (hasSuccessfullyLoaded) {
                    clearInterval(interval);
                    resolve('Loaded Résumé');
                } else if (hasSuccessfullyLoaded === false) {
                    reject('Fail to load Résumé');
                }
            }, 1);
        });
        ToastPromise({
            promise,
            pending: 'Loading Résumé',
            success: {
                render: ({ data }) => data as any,
            },
            error: {
                render: ({ data }) => data as any,
            },
        });
    }, []);

    return (
        <ResumeContainer>
            <Seo
                title="Résumé"
                keywords={[
                    'Resume',
                    'Résumé',
                    'UTAR',
                    'Didian',
                    'Frontend',
                    'Backend',
                    'Development Tools',
                ]}
                content="Wanna know if I'm qualified for a position? Take a look at my résumé"
            />
            {state.hasSuccessfullyLoaded ? null : (
                <Skeleton
                    style={{
                        width: width * state.widthRatio,
                        height: '100vh',
                        padding: '8px 0 0 0',
                    }}
                />
            )}
            <PDFDocument loading="" file={resume} onLoadError={ToastError}>
                <PDFPage
                    loading=""
                    pageNumber={1}
                    width={width * state.widthRatio}
                    onLoadSuccess={() => setHasSuccessfullyLoaded(true)}
                    onLoadError={(error) => {
                        setHasSuccessfullyLoaded(false);
                        ToastError(error);
                    }}
                />
            </PDFDocument>
            <DownloadContainer>
                <DownloadButton
                    onClick={() =>
                        axios
                            .get(resume, {
                                responseType: 'blob',
                            })
                            .then(({ data }) => {
                                const link = document.createElement('a');
                                link.href = window.URL.createObjectURL(
                                    new Blob([data])
                                );
                                link.setAttribute('download', pdf);
                                document.body.appendChild(link);
                                link.click();
                                link.parentNode?.removeChild(link);
                            })
                            .catch(ToastError)
                    }
                >
                    Download
                </DownloadButton>
            </DownloadContainer>
        </ResumeContainer>
    );
};

const ResumeContainer = styled(GlobalContainer)`
    display: grid;
    place-items: center;
`;

const PDFDocument = styled(Document)`
    display: grid;
    place-items: center;
`;

const PDFPage = styled(Page)`
    > .react-pdf__Page__canvas {
        height: min-content !important;
    }
    > .react-pdf__Page__annotations {
        height: min-content !important;
    }
    > .react-pdf__Page__textContent {
        display: none;
    }
`;

const DownloadContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    margin: 32px 0 0 0;
    > a {
        text-decoration: none;
    }
`;

const DownloadButton = styled.button`
    font-size: 1em;
    padding: 16px 48px;
    border: 1px solid ${({ theme }) => theme.red};
    color: ${({ theme }) => theme.theme.secondaryColor};
    background: linear-gradient(
        to right,
        transparent 50%,
        ${({ theme }) => theme.red} 50%
    );
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.2s ease-out;
    cursor: pointer;
    :hover {
        background-position: left bottom;
        color: ${({ theme }) => theme.red};
    }
    font-family: ${({ theme }) => theme.fontFamily}, sans-serif !important;
`;

export default Resume;
