import React, { Component } from 'react';
import classNames from 'classnames';

import { setI18nLng } from '@libs/i18n';

import { initAgencyInfo } from '@utils/WebUtils';
import { setCookie, getCookie, getCookieName } from '@utils/CookieUtils';
import { getRouterQuery } from '@utils/RouterUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import { Spinkit } from '@components/common';
import Layout from '@components/layout';

import { domains } from '@constants/index';

class RootContainer extends Component {
    constructor(props) {
        super(props);
        this._mounted = true;
        this.state = {
            sessionReady: false,
        };
    }

    componentDidMount() {
        const { host } = window.location;
        if (host === domains.localPath) {
            window.location.href = domains.localRedirect;
            return;
        }
        this.handleInitAgencyData();
    }

    handleInitAgencyData = async (cb) => {
        if (!window.location.hostname.includes('app.localhost')) await initAgencyInfo('omicrm.com');
        this.handleInitSessionHandler();
    }

    handleInitSessionHandler = async () => {
        let cookieName = getCookieName() || 'landing', cookie = getCookie(cookieName), routeLng = getRouterQuery()?.lng;
        const sessionCookie = {
            curLng: routeLng || cookie?.curLng,
        };
        setI18nLng(sessionCookie.curLng);
        setCookie(cookieName, sessionCookie);
        this.setState({ sessionReady: true });
    }

    render() {
        const { sessionReady } = this.state;
        const { classes, ...layoutProps } = this.props;
        return (
            <div className={classNames(classes.wrapper, { ['center']: !sessionReady })}>
                {sessionReady
                    ? <Layout {...layoutProps} />
                    : <Spinkit name={'CubeGrid'} size={32} />
                }
            </div>
        );
    }
}

export default withStyles(styles)(RootContainer);