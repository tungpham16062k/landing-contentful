import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import '@styles/main.css';
import theme from '@styles/theme';

import RootContainer from '@containers/root';

export default function MyApp(props) {
    const { Component, pageProps } = props;
    return (
        <ThemeProvider theme={theme}>
            <RootContainer>
                <Component {...pageProps} />
            </RootContainer>
        </ThemeProvider>
    );
}