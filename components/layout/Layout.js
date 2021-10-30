import React from 'react';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import Header from './header';
import Footer from './footer';

const Layout = ({ classes, children }) => {
    return (
        <div className={classes.wrapper}>
            <Header />
            <div className={classes.boxContent}>
                {children}
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default withStyles(styles)(Layout);