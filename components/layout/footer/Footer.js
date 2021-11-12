import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';

import withI18n from '@hocs/I18nHocs';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import { Grid } from '@mui/material';

import ImageViewer from '@components/common/image-viewer';

const logos = {
    circleColor: require('@assets/images/logo/logo_circle_main.svg'),
    fullColor: require('@assets/images/logo/logo_full_main.svg'),
};

const leftOpts = [
    {
        label: 'Email',
        description: 'cskh@omicrm.com'
    },
    {
        label: 'Địa chỉ',
        description: 'Số 6 đường 16, Hiệp Bình Chánh, Thủ Đức, HCM'
    },
];

const Footer = ({ classes, i18n }) => {
    const rightOpts = [
        {
            id: '',
            cateOpts: [
                { id: 'qweqwe', label: 'Sản phẩm' },
                { id: 'qweqwe', label: 'OmiCall' },
                { id: 'qweqwe', label: 'Phiếu ghi' },
                { id: 'qweqwe', label: 'Đa kênh' },
                { id: 'qweqwe', label: 'Chiến dịch' },
                { id: 'qweqwe', label: 'Khách hàng' },
            ],
        },
        {
            id: '',
            cateOpts: [
                { id: 'qweqwe', label: 'Về OMICRM' },
                { id: 'qweqwe', label: 'Giới thiệu' },
                { id: 'qweqwe', label: 'Bảng giá' },
                { id: 'qweqwe', label: 'Điều khoản' },
                { id: 'qweqwe', label: 'Chính sách' },
            ],
        },
    ];
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Grid container item xs={12}>
                    <Grid item lg={7} xl={7} md={12} sm={12} xs={12} classes={{ root: classes.boxLeft }}>
                        <div>
                            <div className={classes.boxLogo}>
                                <div><ImageViewer src={logos.circleColor} size={40} /></div>
                                <div>
                                    <div><ImageViewer src={logos.fullColor} style={{ width: 100 }} /></div>
                                    <div>{i18n.t('Nền tảng quản lý giao tiếp đa kênh')}</div>
                                </div>
                            </div>
                            <div className={classes.boxInfo}>
                                {
                                    leftOpts.map((item, idx) => {
                                        const { label, description } = item;
                                        const firstItem = idx === 0;
                                        return (
                                            <div key={idx} className={classNames({ 'marT0': firstItem })}>
                                                <div>{label}</div>
                                                <div className={classNames({ [classes.bold]: firstItem })}>{description}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className={classes.boxCircle}>
                                {
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <div key={idx} />
                                    ))
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item container lg={5} xl={5} md={12} sm={12} xs={12} className={classes.boxRight}>
                        {
                            rightOpts.map((item, idx) => {
                                const { cateOpts } = item;
                                return (
                                    <Grid key={idx} item lg={5} xl={5} md={3} sm={12} xs={12}>
                                        <div className={classes.boxItem}>
                                            {
                                                cateOpts.map((elm, index) => (
                                                    <div key={index} className={classNames({ 'firstItem': index === 0 })}>{elm.label}</div>
                                                ))
                                            }
                                        </div>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.copyright}>
                    <span>Copyright © 2021 OMICRM. All rights reserved.</span>
                </Grid>
            </div>
        </div>
    )
}

export default compose(withI18n(), withStyles(styles))(Footer);