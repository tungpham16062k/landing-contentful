import Cookies from 'js-cookie';

import { getI18nLng } from '@libs/i18n';

import { getWebDomain } from './WebUtils';
import { isJwtToken, jwtDecode } from './EncryptUtils';
import { isJson, toJson } from './Utils';

import { sourceVersion, cookieProps } from '@constants/Configs';

export const isValidAuth = (accessToken) => {
    let _accessToken;
    if (accessToken) {
        _accessToken = jwtDecode(accessToken);
    } else {
        let cookieName = getCookieName(), webCookie = getCookie(cookieName);
        _accessToken = jwtDecode(webCookie?.access_token);
    }
    return _accessToken && _accessToken.exp * 1000 > (+new Date()) + 60000;
}

export const getCookieName = (hostname) => {
    let key = hostname || window.location.hostname;
    return String(key).split('.').join('_');
}

export const getCookie = (hostname) => {
    let cookie = toJson(Cookies.get(hostname));
    if (!cookie) return;
    let _cookie = {};
    Object.keys(cookie).forEach(prop => {
        if (cookieProps.get.hasOwnProperty(prop)) {
            _cookie[cookieProps.get[prop]] = cookie[prop];
        }
    });
    return _cookie;
}

export const setCookie = (hostname, content, options) => {
    if (!hostname) { return; }
    let cookie = {}, _content = { sourceVersion, curLng: getI18nLng(), origin: 'client', ...content };
    if (_content) {
        Object.keys(_content).forEach(prop => {
            if (cookieProps.set.hasOwnProperty(prop)) {
                cookie[cookieProps.set[prop]] = _content[prop];
            }
        });
    }
    Cookies.set(hostname, JSON.stringify(cookie), { domain: `.${getWebDomain()}`, sameSite: 'lax', ...options });
}

export const removeCookie = (name, options) => {
    Cookies.remove(name || '', { ...options });
    Cookies.remove(name || '', { domain: `.${getWebDomain()}`, ...options });
}

export const validateCookie = (hostname) => {
    let allCookie = Cookies.get(), cookieKeys = Object.keys(allCookie), domainKey = getWebDomain('key');
    let otherCookies = cookieKeys.filter(i => ![`admin_${domainKey}`, `sso_${domainKey}`, `login_${domainKey}`, hostname].includes(i));
    if (otherCookies.length > 2) {
        let removeCookies = [], oldLoginSession = [];
        otherCookies.forEach(item => {
            let cookie = allCookie[item];
            if (isJson(cookie)) {
                cookie = toJson(cookie);
                let accessToken = cookie['2'];
                if (accessToken && isJwtToken(accessToken)) {
                    oldLoginSession.push({ key: item, cookie });
                }
            }
        });
        if (oldLoginSession.length > 0) {
            oldLoginSession.sort((a, b) => b.cookie['8'] - a.cookie['8']);
            oldLoginSession.forEach((item, index) => { if (index > 1) { removeCookies.push(item.key); } });
        }
        if (removeCookies.length > 0) {
            removeCookies.forEach(item => { removeCookie(item); });
        }
    }
}

export const resetCookie = (hadSourceVersion, cb = () => null) => {
    if (!hadSourceVersion) return cb();
    let allCookie = Cookies.get(), cookieKeys = Object.keys(allCookie), domainKey = getWebDomain('key');
    let otherCookies = cookieKeys.filter(i => i !== `admin_${domainKey}`);
    otherCookies.forEach((item, index) => {
        removeCookie(item);
        if (index === otherCookies.length - 1) cb();
    });
}