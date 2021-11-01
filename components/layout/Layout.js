import React, { useRef } from 'react';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import Header from './header';
import Footer from './footer';

const Layout = ({ classes, children }) => {

    const myRefs = useRef({});

    const handScroll = () => {
        const wrapper = myRefs.current.wrapper;
        if (wrapper) {
            console.log("TCL: Layout -> children", children.onRef)
            console.log("TCL: Layout -> wrapper.scrollTop", wrapper.scrollTop)
        }
    }

    return (
        <div className={classes.wrapper}>
            <Header />
            <div className={classes.boxContent} ref={ref => myRefs.current.wrapper = ref} onScroll={() => handScroll()}>
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default withStyles(styles)(Layout);