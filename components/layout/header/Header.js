import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';

import withI18n from '@hocs/I18nHocs';

import { pushRoute } from '@utils/RouterUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import { ImageViewer, TextButton } from '@components/common';
import { toggleWebLanguage } from '@utils/WebUtils';

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
}

const Header = ({ classes, i18n }) => {

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

    return (
        <div className={classes.wrapper}>
            <div className={classes.containers}>
                <div className={classes.boxLogo} onClick={handleClick('go2Home')}>
                    <div><ImageViewer src={icons.logo} size={60} /></div>
                    <div>
                        <div><ImageViewer src={icons.omicrm} style={{ width: 100 }} /></div>
                        <div>{i18n.t('Nền tảng quản lý giao tiếp đa kênh')}</div>
                    </div>
                </div>
                <div className={classes.nav}>
                    {menus.map(item => (
                        <TextButton
                            noUnderline
                            key={item.id}
                            className={classes.menuItem}
                            color={'white'}
                            href={item.id}
                            text={i18n.t(item.text)}
                            target={item.target}
                        />
                    ))}
                    <div className={classNames(classes.btn, 'bgGreen')}>Đăng ký</div>
                    <div className={classNames(classes.btn)}>Đăng nhập</div>
                    <div><ImageViewer src={icons.vietnam} style={{ height: 20, marginLeft: 24 }} /></div>
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
        </div>
    )
}

export default compose(withI18n(), withStyles(styles))(Header);