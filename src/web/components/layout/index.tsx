import React from 'react';
import styled from 'styled-components';
import Footer from '../footer';
import Header from '../header';
import GlobalStyle from '../../theme/global-theme';
import Head from 'next/head';
import parse from 'parse-dont-validate';
import data from '../../../common/data';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <>
        <Head>
            {data.nodeEnv !== 'production' && data.nodeEnv !== 'development'
                ? null
                : (() => {
                      const gaMeasurementId = parse(
                          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                      )
                          .asString()
                          .elseThrow(
                              'NEXT_PUBLIC_GA_MEASUREMENT_ID is not a string'
                          );

                      return (
                          <>
                              <script
                                  async
                                  src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                              />
                              <script>
                                  {[
                                      'window.dataLayer = window.dataLayer || []',
                                      'function gtag(){window.dataLayer.push(arguments);}',
                                      `gtag('js', new Date())`,
                                      `gtag('config', '${gaMeasurementId}', {page_path: window.location.pathname})`,
                                  ].join('\n')}
                              </script>
                          </>
                      );
                  })()}
        </Head>
        <GlobalStyle />
        <Header />
        <Container>{children}</Container>
        <Footer />
    </>
);

const Container = styled.div`
    width: 100%;
    margin: auto;
`;

export default Layout;
