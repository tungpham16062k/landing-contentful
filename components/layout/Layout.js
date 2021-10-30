import React from 'react';

import { useStyle } from './styles';

import Header from './header';
import Footer from './footer';

function Layout(props) {
    const { children } = props;
    const classes = useStyle();
    return (
        <div className={classes.wrapper}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;