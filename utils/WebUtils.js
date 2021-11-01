import React from 'react';

import { i18nText, setI18nLng } from '@libs/i18n';

import WebMgr from '@cores/WebMgr';
import NotifyMgr from '@cores/NotifyMgr';

import { getCookieName, setCookie } from './CookieUtils';
import { getRouterRoute } from './RouterUtils';
import { timerFunc, isArray, isJson, toJson, isString } from './Utils';

import { SeoConfigs } from '@constants/index';

const WebInstance = WebMgr.getInstance();
const NotifyInstance = NotifyMgr.getInstance();

export const showToast = (...args) => NotifyInstance.showToast(...args); // content, options

export const getSubDomain = () => WebInstance.getSubDomain();

export const getWebDomain = type => WebInstance.getWebDomain(type);

export const getDisplaySubDomain = () => WebInstance.getDisplaySubDomain();

export const isWebAgency = () => WebInstance.isWebAgency();
export const initAgencyInfo = domain => WebInstance.initAgencyInfo(domain);
export const getAgencyInfo = (...args) => WebInstance.getAgencyInfo(...args); // field, origin, type

export const setCompanyInfo = info => WebInstance.setCompanyInfo(info);
export const getCompanyInfo = field => WebInstance.getCompanyInfo(field);

export const subscribeKeyboardEvent = (...args) => WebInstance.subscribeKeyboardEvent(...args);

export const setSessionData = data => WebInstance.setSessionData(data);

export const setAccessToken = token => WebInstance.setAccessToken(token);
export const getAccessToken = () => WebInstance.getAccessToken();
export const getTokenContent = field => WebInstance.getTokenContent(field);

export const setConfig = (...args) => WebInstance.setConfig(...args);
export const getConfig = (...args) => WebInstance.getConfig(...args);

export const setBrowserNotifyPermission = (permission) => WebInstance.setBrowserNotifyPermission(permission);
export const getBrowserNotifyPermission = () => WebInstance.getBrowserNotifyPermission();

export const logErrorEvent = (name, content) => WebInstance.logErrorEvent(name, content);

export const setWebVisibility = (status) => WebInstance.setWebVisibility(status);
export const getWebVisibility = () => WebInstance.getWebVisibility();
export const getWebEnv = () => WebInstance.getWebEnv();
export const isWebEnv = () => WebInstance.isWebEnv();

export const getBrowserInfo = (info) => WebInstance.getBrowserInfo(info);
export const isBrowser = (list) => WebInstance.isBrowser(list);
export const setRegistedInfo = (status, cb) => WebInstance.setRegistedInfo(status, cb);
export const getRegisteredInfo = () => WebInstance.getRegisteredInfo();

export const debounce = (...args) => WebInstance.debounce(...args);
export const getNewAccessToken = (...args) => WebInstance.getNewAccessToken(...args);

export const setWebCallback = (cb) => WebInstance.setWebCallback(cb);
export const togglePopperAlert = (...args) => WebInstance.togglePopperAlert(...args);
export const toggleWebDialog = (...args) => WebInstance.toggleWebDialog(...args);
export const showBrowserNotification = (...args) => WebInstance.showBrowserNotification(...args);

export const setWebData = (id, data) => WebInstance.setWebData(id, data);
export const getWebData = (id) => WebInstance.getWebData(id);

export const copy2Clipboard = (content) => {
    if (!content) return;
    window.navigator.clipboard.writeText(content);
    showNotify(i18nText('copySuccess'), { type: 'success' });
}

export const toggleOverlaySpinkit = (visible, options) => {
    let spinkit = document.getElementById(options?.id || 'overlay-spinkit');
    if (spinkit) timerFunc(options?.delay || 0, () => { spinkit.style.display = visible ? 'flex' : 'none'; });
}

export const getRouteRole = (role) => {
    let _isTenantOwner = isTenantOwner(), _isWebAgency = isWebAgency();
    if (isString(role)) {
        switch (role) {
            case 'wallet-recharge': {
                const { pbx_type } = getCompanyInfo();
                return (_isWebAgency || pbx_type === 'sip_connect') ? false : getRole('rechargeAdminWallet');
            }
            case '': default: break;
        }
    }
    if (_isTenantOwner) return true;
    return getRole(role);
}

export const popupWindowCenter = (url, { w, h } = {}) => {
    const { width, availWidth, height, availHeight, availTop } = screen;
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
    const systemZoom = width / window.screen.availWidth;
    let top = ((availHeight - h) / 2 / systemZoom + dualScreenTop) - (height - availHeight !== availTop ? availTop : height - availHeight);
    let left = ((availWidth - w) / 2 / systemZoom + dualScreenLeft);
    const newWindow = window.open(url, '', `width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`);
    if (window.focus) newWindow && newWindow.focus();
    return newWindow;
}

export const autoCloseCSelect = (cb = () => null) => {
    return {
        scroller: '1',
        onScroll: e => {
            cb(e);
            if (e.target.hasAttribute('scroller')) {
                let openingSelectRef = getWebData('openingSelectRef');
                if (openingSelectRef) {
                    openingSelectRef.blur();
                }
            }
        }
    }
}

export const initRefs = (refs) => {
    return Object.fromEntries(refs.map(i => [i, React.createRef()]));
}

export const getLocalStorage = (id) => {
    let value = localStorage.getItem(id), json = toJson(value);
    return json || value;
}

export const setLocalStorage = (id, value) => {
    if (isJson(value)) {
        localStorage.setItem(id, JSON.stringify(isArray(value) ? value : { ...getLocalStorage(id), ...value }));
    } else {
        localStorage.setItem(id, value);
    }
}

export const setPlayerStream = (id, stream) => {
    if (stream) {
        let player = document.getElementById(id);
        if (player) {
            if ('srcObject' in player) {
                player.srcObject = stream;
            } else {
                player.src = window.URL.createObjectURL(stream);
            }
            player.play();
        }
    }
};

export const toggleWebLanguage = (curLng) => {
    setI18nLng(curLng);
    setCookie(getCookieName(), { curLng });
}

export const getSeoConfig = (config) => {
    config = { ...(SeoConfigs[getRouterRoute()] || SeoConfigs.default), ...config };
    let { title, description, canonical, image } = config;
    if (!canonical && typeof window !== 'undefined') {
        let { origin, pathname } = window.location;
        canonical = origin + pathname;
    }
    return {
        title,
        description,
        canonical,
        openGraph: {
            title,
            description,
            url: canonical,
            ...(image && {
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 600,
                        alt: 'url_preview',
                    },
                ]
            }),
        },
    };
}