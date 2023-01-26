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

const Resume: NextPage = () => {
    const { width } = useWindowResize();
    const [state, setState] = React.useState({
        widthRatio: 0.8,
        hasSuccessfullyLoaded: undefined as undefined | boolean,
    });

    const { hasSuccessfullyLoaded } = state;

    const pdf = 'GervinFungDaXuen-Résumé.pdf';

    const resume = `/files/${pdf}` as const;

    React.useEffect(() => {
        if (width < 800) {
            setState((prev) => ({
                ...prev,
                widthRatio: 0.85,
            }));
        } else if (width < 760) {
            setState((prev) => ({
                ...prev,
                widthRatio: 0.9,
            }));
        } else if (width < 400) {
            setState((prev) => ({
                ...prev,
                widthRatio: 0.95,
            }));
        }
    }, [width]);

    React.useEffect(() => {
        if (hasSuccessfullyLoaded === undefined) {
            return;
        }
        const promise = new Promise<string>((resolve, reject) => {
            const mutationObserver = new MutationObserver(() => {
                switch (hasSuccessfullyLoaded) {
                    case true: {
                        mutationObserver.disconnect();
                        resolve('Loaded Résumé');
                        break;
                    }
                    case false: {
                        mutationObserver.disconnect();
                        reject('Fail to load Résumé');
                    }
                }
            });
            mutationObserver.observe(document, {
                subtree: true,
                childList: true,
            });
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
    }, [hasSuccessfullyLoaded]);

    return (
        <GlobalContainer>
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
            <PDFDocument loading="" file={resume} onLoadError={ToastError}>
                <PDFPage
                    loading=""
                    pageNumber={1}
                    width={width * state.widthRatio}
                    onLoadError={(error) => {
                        setState((prev) => ({
                            ...prev,
                            hasSuccessfullyLoaded: false,
                        }));
                        ToastError(error);
                    }}
                    onLoadSuccess={() =>
                        setState((prev) => ({
                            ...prev,
                            hasSuccessfullyLoaded: true,
                        }))
                    }
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
        </GlobalContainer>
    );
};

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
