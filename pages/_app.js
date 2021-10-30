import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';

import RootContainer from '@containers/root';

import theme from '@styles/theme';
import '@styles/main.css';

export default function MyApp(props) {
    const { Component, pageProps } = props;

    return (
        <Fragment>
            <Head>
                <title>OMI CALL</title>
                <meta name='viewport' content='initial-scale=1, width=device-width' />
            </Head>
            <ThemeProvider theme={theme}>
                <RootContainer>
                    <Component {...pageProps} />
                </RootContainer>
            </ThemeProvider>
        </Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
