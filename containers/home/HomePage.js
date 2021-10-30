import React, { Component } from 'react';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

class HomePage extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                Đây là trang chủ
            </div>
        )
    }

}

export default withStyles(styles)(HomePage);