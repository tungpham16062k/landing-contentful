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
    // lng flag
    vn: require('@assets/images/national/vietnam.png'),
    // other
    menu: require('@assets/icons/common/ic_menu_list.svg'),
};

const logos = {
    circleColor: require('@assets/images/logo/logo_circle_color.svg'),
    circleWhite: require('@assets/images/logo/logo_circle_white.svg'),
    fullColor: require('@assets/images/logo/logo_full_color.svg'),
    fullWhite: require('@assets/images/logo/logo_full_white.svg'),
};

const menusOpts = [
    { id: 'introduce', text: 'introduce', target: 'push' },
    { id: 'omi-call', text: 'OMICall', target: 'push' },
    { id: 'pricing', text: 'pricing', target: 'push' },
    { id: 'https://api.omicall.com/', text: 'API DOCS', target: 'new' },
    { id: 'https://docs.omicrm.com/', text: 'document', target: 'new' },
    { id: 'https://sso.omicrm.vn/register', text: 'Đăng ký', target: 'new' },
    { id: 'https://sso.omicrm.vn/', text: 'Đăng nhập', target: 'new' },
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

const Header = ({ classes, i18n }) => {

    const [states, setStates] = useState({ show: {} });
    const [isOverlay, setOverlay] = useState();

    const overlayStatus = useRef();
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
                        <div
                            key={idx}
                            className={classes.subMenuItem}
                            onClick={() => item.id.includes('https') && window.open(item.id)}
                        >{i18n.t(item.text)}</div>
                    ))}
                </div>
            </CDrawer>
        );
    };

    const _renderMenu = () => {
        let logoStyle = isOverlay ? 'Color' : 'White';
        return (
            <div className={classNames(classes.wrapper, 'p-sticky', { 'overlay': isOverlay })}>
                <div className={classes.container}>
                    <div className={classNames(classes.boxLogo, { 'overlay': isOverlay })} onClick={handleClick('go2Home')}>
                        <div><ImageViewer src={logos[`circle${logoStyle}`]} size={40} /></div>
                        <div>
                            <div><ImageViewer src={logos[`full${logoStyle}`]} style={{ width: 100 }} /></div>
                            <div>{i18n.t('Nền tảng quản lý giao tiếp đa kênh')}</div>
                        </div>
                    </div>
                    <div className={classes.navWrapper}>
                        {isShowMenu ?
                            <Fragment>
                                <div><ImageViewer src={icons.vn} size={20} className={classes.btnChangeLgn} /></div>
                                <ImageViewer onClick={() => toggleShow('drawer', true)} src={icons.menu} size={20} svg={{ color: isOverlay ? 'primary' : 'white' }} />
                            </Fragment>
                            :
                            <Fragment>
                                {menus.map(item => (
                                    <TextButton
                                        noUnderline
                                        key={item.id}
                                        className={classes.navLink}
                                        color={isOverlay ? 'primary' : 'white'}
                                        href={item.id}
                                        text={i18n.t(item.text)}
                                        target={item.target}
                                    />
                                ))}
                                <div style={{ borderColor: isOverlay ? 'white' : '#00898E' }} className={classNames(classes.navBtn, 'bgGreen', { 'colorW': isOverlay })} onClick={() => window.open('https://sso.omicrm.vn/register')}>
                                    Đăng ký
                                </div>
                                <div style={{ borderColor: isOverlay ? '#1468ee' : 'white' }} className={classNames(classes.navBtn, { 'bgPrimary': isOverlay, 'colorW': isOverlay })} onClick={() => window.open('https://sso.omicrm.vn/')}>
                                    Đăng nhập
                                </div>
                                <div><ImageViewer src={icons.vn} style={{ height: 20, marginLeft: 24, objectFit: 'contain' }} /></div>
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