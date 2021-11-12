import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@mui/material/styles';

import '@styles/main.css';
import theme from '@styles/theme';

import RootContainer from '@containers/root';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <RootContainer>
                    <Component {...pageProps} />
                </RootContainer>
            </ThemeProvider>
        );
    }
}

export default MyApp;