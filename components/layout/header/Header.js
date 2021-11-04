import React, { Fragment, useState, useRef, useEffect } from 'react';
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
};

const Header = ({ classes, i18n, fixedMenu }) => {

    const [states, setStates] = useState({ show: {} });
    const [isOverlay, setOverlay] = useState();

    const overlayStatus = useRef();
    const headerRef = useRef();
    const wrapperRef = useRef();

    const handleWrapperScroll = () => {
        if (wrapperRef.current.scrollTop > 80) {
            if (!overlayStatus.current) {
                overlayStatus.current = true;
                setOverlay(true);
            }
        } else {
            if (overlayStatus.current) {
                overlayStatus.current = false;
                setOverlay();
            }
        }
    };

    useEffect(() => {
        headerRef.current = document.getElementById('header');
        wrapperRef.current = document.getElementById('wrapper');
        wrapperRef.current.addEventListener('scroll', handleWrapperScroll);
    }, []);

    const isShowMenu = useMediaQuery('(max-width:1050px)');

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
    };

    const _renderMenu = () => {
        return (
            <div className={classNames(classes.wrapper, 'p-sticky', { 'overlay': isOverlay })}>
                <div className={classes.container}>
                    <div className={classNames(classes.boxLogo, { 'overlay': isOverlay })} onClick={handleClick('go2Home')}>
                        <div><ImageViewer src={icons[`logo${isOverlay ? '1' : ''}`]} size={isOverlay ? 40 : 60} /></div>
                        <div>
                            <div><ImageViewer src={icons[`omicrm${isOverlay ? '1' : ''}`]} style={{ width: 100 }} /></div>
                            <div>{i18n.t('Nền tảng quản lý giao tiếp đa kênh')}</div>
                        </div>
                    </div>
                    <div className={classes.nav}>
                        {isShowMenu ?
                            <Fragment>
                                <div><ImageViewer src={icons.vietnam} size={20} className={classes.marLR24} /></div>
                                <ImageViewer onClick={() => toggleShow('drawer', true)} src={icons.menu} size={20} svg={{ color: isOverlay ? 'primary' : 'white' }} />
                            </Fragment>
                            :
                            <Fragment>
                                {menus.map(item => (
                                    <TextButton
                                        noUnderline
                                        key={item.id}
                                        className={classes.menuItem}
                                        color={isOverlay ? 'primary' : 'white'}
                                        href={item.id}
                                        text={i18n.t(item.text)}
                                        target={item.target}
                                    />
                                ))}
                                <div className={classNames(classes.btn, 'bgGreen', { 'colorW': isOverlay })}>Đăng ký</div>
                                <div className={classNames(classes.btn, { 'bgPrimary': isOverlay, 'colorW': isOverlay })}>Đăng nhập</div>
                                <div><ImageViewer src={icons.vietnam} style={{ height: 20, marginLeft: 24 }} /></div>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            {_renderMenu()}
            {_renderDrawer()}
        </Fragment>
    )
}

export default compose(withI18n(), withStyles(styles))(Header);