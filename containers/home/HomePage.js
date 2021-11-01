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
    dakenh: require('@assets/images/common/dakenh1.png'),
    dlCall: require('@assets/images/common/dialog_call.png'),
    menu: require('@assets/images/common/menu.png'),
    filter: require('@assets/images/common/customer_filter.png'),
    ggPlay: require('@assets/images/common/gg_play.png'),
    appStore: require('@assets/images/common/app_store.png'),
    mobile1: require('@assets/images/common/mobile_1.png'),
    mobile2: require('@assets/images/common/mobile_2.png'),
    mobile3: require('@assets/images/common/mobile_3.png'),
    mobile4: require('@assets/images/common/mobile_4.png'),
    mobile5: require('@assets/images/common/mobile_5.png'),
    mobile6: require('@assets/images/common/mobile_6.png'),
    secSix0: require('@assets/images/common/25_fit.png'),
    secSix1: require('@assets/images/common/ecoe.png'),
    secSix2: require('@assets/images/common/viettel.png'),
    secSix3: require('@assets/images/common/vihat.png'),
    secSix4: require('@assets/images/common/paragon.png'),
    secSix5: require('@assets/images/common/globus.png'),
    secSix6: require('@assets/images/common/paragon_sin.png'),
    secSix7: require('@assets/images/common/xstrahl.png'),
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

const secThreeOpts = [
    {
        title: 'Gia tăng hiệu quả chăm sóc khách hàng',
        description: 'Với việc hỗ trợ chăm sóc đa kênh: Facebook, tổng đài, Website, Zalo … và tích hợp Mini-CRM, mang lại trải nghiệm xuyên suốt cho người dùng khi tương tác với doanh nghiệp. Từ đó mang khách hàng quay trở lại mua hàng nhiều hơn.',
    },
    {
        title: 'Tiết kiệm chi phí',
        description: `Tiết kiệm chi phí gọi
        Tiết kiệm chi phí nhân sự: các giải pháp Automation Marketing`,
    },
    {
        title: 'Quản lý hiệu quả',
        description: 'Quản lý được hiệu suất của nhân viên chăm sóc khách hàng và nhân viên kinh doanh',
    },
]

const secThreeRightOpts = [
    {
        title: '14.203',
        description: 'người dùng hoạt động',
    },
    {
        title: '500.000',
        description: 'cuộc gọi đồng thời',
    },
    {
        title: '1.302.032',
        description: 'cuộc gọi mỗi ngày',
    },
    {
        title: '2.534.252',
        description: 'phút gọi mỗi ngày',
    },
];

const secFourOpts = [
    {
        title: 'Giao diện trực quan',
        description: 'Dễ dàng theo dõi tiến độ và quản lý các công việc của nhân viên',
    },
    {
        title: 'Trạng thái khách hàng 2 cấp',
        description: 'Quản lý trạng thái trạng thái khách hàng 2 cấp độ, dễ dạng theo dõi theo dạng KANBAN',
    },
    {
        title: 'Quản lý chi tiết',
        description: 'Dễ dàng quản lý và theo dõi toàn bộ quá trình chăm sóc khách hàng với toàn bộ lịch sử tương tác',
    },
];

const secFiveOpts = [
    {
        id: 'columOne',
        imgOpts: [3, 6],
    },
    {
        id: 'columTwo',
        imgOpts: [4, 5, 1],
    },
    {
        id: 'columThree',
        imgOpts: [2, 4],
    },
];

const tabOpts = [
    {
        id: 'all', label: 'all',
    },
    {
        id: 'natural', label: 'naturalLanguage',
    },
    {
        id: 'sound', label: 'sound',
    },
];

const secSixOpts = [
    {
        id: 'bds',
        label: 'Bất động sản',
    },
    {
        id: 'tc',
        label: 'Tài chính',
    },
    {
        id: 'bl',
        label: 'Bán lẻ',
    },
    {
        id: 'cn',
        label: 'Công nghệ',
    },
    {
        id: 'gd',
        label: 'Giáo dục',
    },
    {
        id: 'yt',
        label: 'Y tế',
    },
    {
        id: 'satm',
        label: 'Spa & Thẩm mỹ',
    },
];

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curTab: secSixOpts[0].id,
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    _renderSectionOne = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecOne}>
                <div className={classNames(classes.container, classes.secOneContent)}>
                    <div>{i18n.t('Giải pháp quản trị và chăm sóc khách hàng toàn diện')}</div>
                    <div>{i18n.t('Tối ưu chi phí vận hành kết hợp với hệ thống tổng đài chuyên nghiệp')}</div>
                    <div className={classes.boxCustomImg}><ImageViewer src={icons.dakenh} /></div>
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
                        <Grid container spacing={4} item xs={12} md={7} className={classes.heightFit}>
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
                                secThreeOpts.map((item, idx) => {
                                    const { title, description } = item;
                                    return (
                                        <Grid item xs={10} key={idx}>
                                            <div className={classNames(classes.secThreeItem, { 'marT0': idx === 0 })}>
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
                        <Grid item xs={12} sm={12} md={6} className={classes.heightFit}>
                            <div className={classes.boxRightThree}>
                                {
                                    secThreeRightOpts.map((item, idx) => {
                                        const { title, description } = item;
                                        return (
                                            <div key={idx} className={classNames(classes.secThreeItemR, { 'custom': idx % 2 !== 0, 'active': secThreeRightOpts.length - 1 === idx })}>
                                                <div>{title}</div>
                                                <div>{description}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    _renderSectionFour = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecFour}>
                <div className={classNames(classes.container, classes.secFourContent)}>
                    <div>{i18n.t('Có gì ở OMICRM?')}</div>
                    <div><ImageViewer src={icons.menu} /></div>
                    <Grid container>
                        <Grid item xs={12} md={6} className={classes.boxDlImg}>
                            <ImageViewer src={icons.filter} className={classes.dlImg} />
                        </Grid>
                        <Grid container spacing={4} item xs={12} md={6} className={classes.heightFit}>
                            <Grid item xs={12}><span className={classes.caption}>{i18n.t('Quản lý khách hàng')}</span></Grid>
                            {
                                secFourOpts.map((item, idx) => {
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
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    _renderSectionFive = () => {
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecFive}>
                <div className={classNames(classes.container)}>
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <div className={classes.boxFiveInfo}>
                                <div>{i18n.t('Sử dụng OMICRM trên điện thoại')}</div>
                                <div>{i18n.t('Mang tổng đài đi khắp mọi nơi chỉ với 1 chiếc SmartPhone')}</div>
                                <div className={classes.boxFiveImg}>
                                    <ImageViewer src={icons.ggPlay} />
                                    <ImageViewer src={icons.appStore} />
                                </div>
                            </div>
                        </Grid>
                        <Grid container item xs={12} sm={12} md={7} className={classes.heightFit}>
                            <div className={classes.boxRightFive}>
                                {
                                    secFiveOpts.map((item, idx) => {
                                        const { id, imgOpts } = item;
                                        return (
                                            <div key={idx} className={classNames(classes.flexColumn, [id])}>
                                                {imgOpts.map((elm, index) => (
                                                    <ImageViewer key={index} src={icons[`mobile${elm}`]} />
                                                ))
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    _renderSectionSix = () => {
        const { curTab } = this.state;
        const { classes, i18n } = this.props;
        return (
            <div className={classes.boxSecSix}>
                <div className={classNames(classes.container)}>
                    <div className={classes.bigCaption}>{i18n.t('600+')}</div>
                    <div className={classNames(classes.caption, 'opacity')}>{i18n.t('khách hàng là doanh nghiệp đã sử dụng OMICRM')}</div>
                    <div className={classes.boxHeader}>
                        {
                            secSixOpts.map((item, idx) => {
                                const { id, label } = item;
                                const isActive = curTab === id;

                                return (
                                    <div key={idx} className={classNames(classes.headerItem, { 'active': isActive })} onClick={() => this.setState({ curTab: id })}>
                                        <div>{i18n.t(label)}</div>
                                        <div className={classNames({ 'active': isActive })}></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className={classes.boxRightSix}>
                        {
                            Array.from({ length: 8 }).map((_, idx) => {
                                return (
                                    <div className={classes.boxItemSix}><ImageViewer src={icons[`secSix${idx}`]} /></div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrapper}>
                {this._renderSectionOne()}
                {this._renderSectionTwo()}
                {this._renderSectionThree()}
                {this._renderSectionFour()}
                {this._renderSectionFive()}
                {this._renderSectionSix()}
            </div>
        )
    }

}

HomePage.defaultProps = {
    onRef: () => null,
}

export default compose(withI18n(), withStyles(styles))(HomePage);