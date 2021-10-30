import React from 'react';

import withI18n from '@hocs/I18nHocs';

import { pushRoute } from '@utils/RouterUtils';

import { useStyle } from './styles';

import { TextButton } from '@components/common';
import { toggleWebLanguage } from '@utils/WebUtils';

const menus = [
    { id: 'introduce', text: 'introduce', target: 'push' },
    { id: 'omi-call', text: 'OMICall', target: 'push' },
    { id: 'pricing', text: 'pricing', target: 'push' },
    { id: 'https://api.omicall.com/', text: 'API Docs', target: 'new' },
    { id: 'https://docs.omicrm.com/', text: 'document', target: 'new' },
];

function Header({ i18n }) {
    const classes = useStyle();

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
            <div className={classes.container}>
                <div className={classes.logo} onClick={handleClick('go2Home')}>
                    Logo
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
                    <TextButton
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
                    />
                </div>
            </div>
        </div>
    )
}

export default withI18n('common')(Header);