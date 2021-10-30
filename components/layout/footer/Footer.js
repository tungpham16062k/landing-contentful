import React from 'react';

import { useStyle } from './styles';

import { Grid } from '@mui/material';

function Footer() {
    const classes = useStyle();
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Grid container>
                    <Grid item lg={6} xl={6} md={12} sm={12} xs={12}>
                        Logo
                    </Grid>
                    <Grid item container lg={6} xl={6} md={12} sm={12} xs={12}>
                        <Grid item lg={4} xl={4} md={4} sm={12} xs={12}>
                            <h3>Sản phẩm</h3>

                        </Grid>
                        <Grid item lg={4} xl={4} md={4} sm={12} xs={12}>
                            <h3>Về OMICRM</h3>

                        </Grid>
                        <Grid item lg={4} xl={4} md={4} sm={12} xs={12}>
                            <h3>Về OMICRM</h3>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.copyright}>
                        <span>Copyright © 2021 OMICRM. All rights reserved.</span>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


export default (Footer);