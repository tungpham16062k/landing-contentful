import React, { Fragment, useState, useMemo } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';

import withI18n from '@hocs/I18nHocs';

import { pushRoute } from '@utils/RouterUtils';
import { toggleWebLanguage } from '@utils/WebUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import useMediaQuery from '@mui/material/useMediaQuery';

import { ImageViewer, TextButton } from '@components/common';
import CDrawer from '@components/common/drawer/CDrawer';

const menus = [
    { id: 'introduce', text: 'introduce', target: 'push' },
    { id: 'omi-call', text: 'OMICall', target: 'push' },
    { id: 'pricing', text: 'pricing', target: 'push' },
    { id: 'https://api.omicall.com/', text: 'API DOCS', target: 'new' },
    { id: 'https://docs.omicrm.com/', text: 'document', target: 'new' },
];

const icons = {
    logo: require('@assets/images/logo/logo.png'),
    omicrm: require('@assets/images/logo/ic_crm.svg'),
    vietnam: require('@assets/images/national/vietnam1.png'),
    menu: require('@assets/icons/common/ic_menu_list.svg'),
    logo1: require('@assets/images/logo/logo_crm.svg'),
    omicrm1: require('@assets/images/logo/ic_crm_b.svg'),
}

const menusOpts = [
    { id: 'introduce', text: 'introduce', target: 'push' },
    { id: 'omi-call', text: 'OMICall', target: 'push' },
    { id: 'pricing', text: 'pricing', target: 'push' },
    { id: 'https://api.omicall.com/', text: 'API DOCS', target: 'new' },
    { id: 'https://docs.omicrm.com/', text: 'document', target: 'new' },
    { id: 'register', text: 'Đăng ký', target: 'push' },
    { id: 'login', text: 'Đăng nhập', target: 'push' },
];


const Header = ({ classes, i18n, fixedMenu }) => {

    const [states, setStates] = useState({ show: {} });

    const isShowMenu = useMediaQuery('(max-width:1050px)');

    const handleClick = (...args) => e => {
        const [cType, cValue] = args;
        switch (cType) {
            case 'toggleLng':
                toggleWebLanguage(cValue);
                break;
            case 'go2Home':
                pushRoute('/');
                break;
            default: break;
        }
    }

    const toggleShow = (show, status, otherState) => setStates({ ...states, show: { ...states.show, [show]: status, ...otherState } });

    const _renderDrawer = () => {
        const dialogProps = {
            normalDrawer: true,
            hideTitle: true,
            open: !!states.show.drawer,
            customWidth: 330,
            onClose: () => toggleShow('drawer', false),
        }
        return (
            <CDrawer  {...dialogProps}>
                <div className={classes.boxSubMenu}>
                    <ImageViewer onClick={() => toggleShow('drawer', false)} src={icons.menu} className={classes.subMenuIc} size={20} svg={{ color: 'primary' }} />
                    {menusOpts.map((item, idx) => (
                        <div key={idx} className={classes.subMenuItem}>{i18n.t(item.text)}</div>
                    ))}
                </div>
            </CDrawer>
        );
    }

    return (
        <div className={classNames(classes.wrapper, { 'fixedMenu': fixedMenu })}>
            <div className={classes.containers}>
                <div className={classNames(classes.boxLogo, { 'fixedMenu': fixedMenu })} onClick={handleClick('go2Home')}>
                    <div><ImageViewer src={icons[`logo${fixedMenu ? '1' : ''}`]} size={fixedMenu ? 40 : 60} /></div>
                    <div>
                        <div><ImageViewer src={icons[`omicrm${fixedMenu ? '1' : ''}`]} style={{ width: 100 }} /></div>
                        <div>{i18n.t('Nền tảng quản lý giao tiếp đa kênh')}</div>
                    </div>
                </div>
                <div className={classes.nav}>
                    {isShowMenu ?
                        <Fragment>
                            <div><ImageViewer src={icons.vietnam} size={20} className={classes.marLR24} /></div>
                            <ImageViewer onClick={() => toggleShow('drawer', true)} src={icons.menu} size={20} svg={{ color: fixedMenu ? 'primary' : 'white' }} />
                        </Fragment>
                        :
                        <Fragment>
                            {menus.map(item => (
                                <TextButton
                                    noUnderline
                                    key={item.id}
                                    className={classes.menuItem}
                                    color={fixedMenu ? 'primary' : 'white'}
                                    href={item.id}
                                    text={i18n.t(item.text)}
                                    target={item.target}
                                />
                            ))}
                            <div className={classNames(classes.btn, 'bgGreen', { 'colorW': fixedMenu })}>Đăng ký</div>
                            <div className={classNames(classes.btn, { 'bgPrimary': fixedMenu, 'colorW': fixedMenu })}>Đăng nhập</div>
                            <div><ImageViewer src={icons.vietnam} style={{ height: 20, marginLeft: 24 }} /></div>
                        </Fragment>
                    }
                    {/* <TextButton
                        noUnderline
                        className={classes.menuItem}
                        color={'white'}
                        text={'VI'}
                        onClick={handleClick('toggleLng', 'vi')}
                    />
                    <TextButton
                        noUnderline
                        className={classes.menuItem}
                        color={'white'}
                        text={'EN'}
                        onClick={handleClick('toggleLng', 'en')}
                    /> */}
                </div>
            </div>
            {_renderDrawer()}
        </div>
    )
}

export default compose(withI18n(), withStyles(styles))(Header);