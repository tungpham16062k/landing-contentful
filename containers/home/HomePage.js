import React, { Component } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';

//hocs
import withI18n from '@hocs/I18nHocs';

import { withStyles } from '@mui/styles';
import { styles } from './styles';
import { ImageViewer } from '@components/common';
import { Grid } from '@mui/material';

const icons = {
    logo: require('@assets/images/logo/logo.png'),
    dakenh: require('@assets/images/common/dakenh.png'),
    dlCall: require('@assets/images/common/dialog_call.png'),
}

const secTwoOpts = [
    {
        title: 'Giảm thiểu chi phí',
        description: 'Tiết kiệm 50% cước gọi, gọi nội bộ miễn phí, đột phá doanh số nhờ gia tăng chất lượng dịch vụ CSKH.',
    },
    {
        title: 'Quản lý cuộc gọi',
        description: 'Hệ thống phân tích, đánh giá chất lượng cuộc gọi của nhân viên, tự động báo cáo theo thời gian thực.',
    },
    {
        title: 'Tích hợp hiện đại',
        description: 'Hỗ trợ API mở, dễ dàng tích hợp với các hệ thống cùng lĩnh vực như Call Center, phần mềm, CRM/ERP.',
    },
    {
        title: 'Kho đầu số',
        description: 'Hỗ trợ đầu số cố định, đầu số hotline đẹp, đa dạng như: 1800xx, 1900xx, 028, 024, Mobile Sip 090xx,..',
    },
];

class HomePage extends Component {

    _renderSectionOne = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecOne}>
                <div className={classNames(classes.container, classes.secOneContent)}>
                    <div>{i18n.t('Giải pháp quản trị và chăm sóc khách hàng toàn diện')}</div>
                    <div>{i18n.t('Tối ưu chi phí vận hành kết hợp với hệ thống tổng đài chuyên nghiệp')}</div>
                    <div><ImageViewer src={icons.dakenh} /></div>
                </div>
            </div>
        );
    }

    _renderSectionTwo = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecTwo}>
                <div className={classNames(classes.container, classes.secTwoContent)}>
                    <div>{i18n.t('Tại sao lại lựa chọn chúng tôi?')}</div>
                    <div>{i18n.t('Tổng đài ảo chuyên nghiệp và thông minh')}</div>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <ImageViewer src={icons.dlCall} className={classes.dlImg} />
                        </Grid>
                        <Grid container spacing={4} item xs={7} className={classes.secTwoDes}>
                            {
                                secTwoOpts.map((item, idx) => {
                                    const { title, description } = item;
                                    return (
                                        <Grid item xs={12} md={5} key={idx}>
                                            <div className={classes.secTwoItem}>
                                                <div>
                                                    <div></div>
                                                    <div>{title}</div>
                                                </div>
                                                <div>{description}</div>
                                            </div>
                                        </Grid>
                                    );
                                })
                            }
                            <Grid item xs={12}>
                                <div className={classes.btn}>{i18n.t('Chi tiết về OmiCall')}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    _renderSectionThree = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecThree}>
                <div className={classNames(classes.container, classes.secThreeContent)}>
                    <div>{i18n.t('Tại sao lại lựa chọn chúng tôi?')}</div>
                    <Grid container className={classNames(classes.secThreeInfo)}>
                        <Grid item xs={12} md={6}>
                            {
                                secTwoOpts.map((item, idx) => {
                                    const { title, description } = item;
                                    return (
                                        <Grid item xs={10} key={idx}>
                                            <div className={classes.secTwoItem}>
                                                <div>
                                                    <div></div>
                                                    <div>{title}</div>
                                                </div>
                                                <div>{description}</div>
                                            </div>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                        <Grid container spacing={4} item xs={6} className={classes.secTwoDes}>
                            {
                                secTwoOpts.map((item, idx) => {
                                    const { title, description } = item;
                                    return (
                                        <Grid item xs={12} md={5} key={idx}>
                                            <div className={classes.secTwoItem}>
                                                <div>
                                                    <div></div>
                                                    <div>{title}</div>
                                                </div>
                                                <div>{description}</div>
                                            </div>
                                        </Grid>
                                    );
                                })
                            }
                            <Grid item xs={12}>
                                <div className={classes.btn}>{i18n.t('Chi tiết về OmiCall')}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }


    _renderTrailer = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxTrailer}>
                <div className={classNames(classes.container, classes.trailerContent)}>
                    <div>{i18n.t('Giải pháp quản trị và chăm sóc khách hàng toàn diện')}</div>
                    <div>{i18n.t('Tối ưu chi phí vận hành kết hợp với hệ thống tổng đài chuyên nghiệp')}</div>
                    <div><ImageViewer src={icons.dakenh} /></div>
                </div>
            </div>
        );
    }

    render() {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.wrapper}>
                {this._renderSectionOne()}
                {this._renderSectionTwo()}
                {this._renderSectionThree()}
            </div>
        )
    }

}

export default compose(withI18n(), withStyles(styles))(HomePage);