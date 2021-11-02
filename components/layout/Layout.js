import React, { useRef, useState } from 'react';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import Header from './header';
import Footer from './footer';

const Layout = ({ classes, children }) => {

    const [fixedMenu, setFixedMenu] = useState(false);

    const myRefs = useRef({});

    const handScroll = () => {
        const wrapper = myRefs.current.wrapper;
        const childSecTwo = myRefs.current.children.sectionTwo;
        if (wrapper && childSecTwo) {
            const isFixed = wrapper.scrollTop >= childSecTwo.offsetTop;
            setFixedMenu(isFixed);
        }
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onRef: ref => myRefs.current.children = ref,
            });
        }
        return child;
    });

    return (
        <div
            className={classes.wrapper}
            ref={ref => myRefs.current.wrapper = ref}
            onScroll={() => handScroll()}
        >
            <Header fixedMenu={fixedMenu} />
            <div className={classes.boxContent}>
                {childrenWithProps}
                <Footer />
            </div>
        </div>
    )
}

export default withStyles(styles)(Layout);