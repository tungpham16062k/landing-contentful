import React from 'react';
import Head from 'next/head';

import { getRouterPathname } from '@utils/RouterUtils';

import { SeoConfigs } from '@constants/index';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import Header from './header';
import Footer from './footer';

const getTitle = () => {
    const path = getRouterPathname();
    return `${path === '/' ? 'OMICRM | ' : ''}${SeoConfigs[getRouterPathname()]?.title}`;
};

const Layout = ({ classes, children }) => {
    return (
        <div id={'wrapper'} className={classes.wrapper}>
            <Head>
                <title>{getTitle()}</title>
            </Head>
            <Header />
            <div className={classes.boxContent}>
                {children}
                <Footer />
            </div>
        </div>
    )
};

export default withStyles(styles)(Layout);