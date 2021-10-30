import md5 from 'md5';

import BrowserDetect from '@libs/browser-detect';
import { getI18nLng } from '@libs/i18n';

import { apiGetAgencyInfo, apiGetCompanyInfo } from '@services/apis/common/CommonAPIUtils';

import CommonAPIs from '@services/apis/common/CommonAPIs';

import { setCookie, getCookie } from '@utils/CookieUtils';
import { isObject, isNumber, isArray, isFunction, isEmpty, genUuid, removeProps } from '@utils/Utils';
import { splitRefreshToken, getRefreshTokenUrl, webLog, getLogDate, textTransform, trimStr, toCaseStyle } from '@utils/StringUtils';
import { getUploadFileUrl } from '@utils/FileUtils';
import { extractDomainInfo, redirectToLoginPage } from '@utils/RouterUtils';
import { validateApiResp } from '@utils/ApiUtils';
import { jwtDecode } from '@utils/EncryptUtils';

import { domains } from '@constants/index';
import { domainConfigs } from '@constants/Configs';

export default class WebMgr {

    static instance = null;
    static createInstance = () => new WebMgr();
    static getInstance() {
        if (!WebMgr.instance) WebMgr.instance = WebMgr.createInstance();
        return WebMgr.instance;
    }

    // START: variables

    static isOwner = false;
    static accessToken = '';
    static accessTokenObj = null;

    static datas = {};
    static debounceTimer = {};
    static webVisibility = true;
    static scrollPositions = {};
    static keyboardEventListeners = {};

    static callbacks = {};
    static configs = {}; // ticket
    static allEmployee = {};

    static browserNotifyPermission = '';
    static userInfo = {};

    // END: variables

    getSubDomain = () => WebMgr.subDomain;
    getDisplaySubDomain = () => WebMgr.displayDomain;
    getWebDomain = type => {
        let getType = `domain_${type || 'web'}`;
        if (!WebMgr[getType]) {
            const { host } = window.location;
            if (host === domains.localPath) {
                window.location.href = domains.localRedirect;
                return;
            }
            let { env, subDomain, id, domain } = extractDomainInfo(host);
            let domainConfig = domainConfigs.find(i => i.domains.includes(domain)) || domainConfigs[0];
            WebMgr.displayDomain = subDomain;
            WebMgr.subDomain = getCookie(`${subDomain}_${id}`)?.domain || subDomain;
            WebMgr.domain_key = id;
            WebMgr.domain_web = domain;
            WebMgr.domainConfig = domainConfig;
            WebMgr.browserInfo = BrowserDetect.parse();
            WebMgr.WEB_ENV = env;
            WebMgr.WEB_AGENCY = !!domainConfig && domainConfig.id !== 'omi';
            setInterval(() => this.setWebVisibility(document.hasFocus()), 250);
            document.addEventListener('keydown', this.handleKeyboardEvent);
        }
        return WebMgr[getType];
    }

    isWebAgency = () => WebMgr.WEB_AGENCY;
    initAgencyInfo = domain => {
        return new Promise(async (resolve) => {
            let { error, data } = await apiGetAgencyInfo(domain);
            console.log(`🚀 : initAgencyInfo -> error, data:`, error, data);
            if (data) {
                const { email, acronym_name, email_template } = data;
                let agencyName = acronym_name || email_template?.name_sender?.[getI18nLng()] || '';
                WebMgr.agencyInfo = removeProps({
                    ...data,
                    nameShort: agencyName,
                    nameLong: agencyName,
                    email: email ? trimStr(email, { full: true }).split(',') : '',
                }, '_id is_deleted created_date last_updated_date create_by last_update_by tenant_id agency_display_name');
                console.log(`🚀 :  WebMgr.agencyInfo`, WebMgr.agencyInfo);
            }
            resolve();
        });
    }
    getAgencyInfo = (field, origin, type) => {
        if (!WebMgr.agencyInfo && origin) return origin;
        if (field) {
            if (WebMgr.agencyInfo) {
                let info = WebMgr.agencyInfo[field];
                if (field === 'email') {
                    switch (true) {
                        case isNumber(type): return info && info[type];
                        case type === 'join': return info ? info.join(', ') : '';
                        default: return info;
                    }
                }
                if (field === 'domain' && isArray(info, true)) info = info.join(', ');
                if (isObject(info)) info = info[getI18nLng()] ?? info['en'];
                return textTransform(type, info);
            } else {
                return field === 'nameShort' ? String(WebMgr.domainConfig.id).toUpperCase() : '';
            }
        }
        return WebMgr.agencyInfo || {};
    }

    setCompanyInfo = (info) => {
        if (info === true) {
            return new Promise(async (resolve) => {
                let { error, data } = await apiGetCompanyInfo({ domain: this.getSubDomain(), limit: true });
                console.log(`🚀 : setCompanyInfo -> error, data:`, error, data);
                WebMgr.companyInfo = data;
                resolve(data);
            });
        }
        if (isObject(info)) WebMgr.companyInfo = { ...WebMgr.companyInfo, ...info };
    }
    getCompanyInfo = field => {
        if (!WebMgr.companyInfo) return;
        if (field) {
            let filedData = WebMgr.companyInfo[field];
            return field === 'logo' ? getUploadFileUrl(filedData) : filedData;
        }
        return WebMgr.companyInfo;
    }

    setWebVisibility = status => WebMgr.webVisibility = status;
    getWebVisibility = () => WebMgr.webVisibility;

    subscribeKeyboardEvent = (isSubscribe, key, func, isDialog) => {
        let id = `${key}-${md5(func)}${isDialog ? 'dialog' : ''}`, listeners = WebMgr.keyboardEventListeners;
        if (isSubscribe) {
            if (isEmpty(listeners[key])) listeners[key] = {};
            listeners[key][id] = func;
        } else {
            if (listeners[key]) delete listeners[key][id];
        }
    }
    handleKeyboardEvent = e => {
        let listeners = WebMgr.keyboardEventListeners;
        let eventCode = e.key || e.keyCode;
        let activeEl = document.activeElement;
        let listClass = activeEl?.classList;
        let valid = !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && !['INPUT', 'TEXTAREA'].includes(activeEl.tagName) && listeners[eventCode];
        if (valid && listClass?.value?.indexOf('MuiDialog') === -1) {
            Object.values(listeners[eventCode]).forEach(func => func?.());
        } else if (valid && listClass?.value?.indexOf('MuiDialog') !== -1) {
            Object.entries(listeners[eventCode]).forEach(([key, func]) => key?.indexOf('dialog') !== -1 && func?.());
        }
    }

    setSessionData = data => Object.assign(WebMgr, data);

    setAccessToken = token => {
        WebMgr.accessToken = token;
        WebMgr.accessTokenObj = token ? jwtDecode(token) : null;
        return WebMgr.accessTokenObj;
    }
    getAccessToken = () => WebMgr.accessToken;
    getTokenContent = field => {
        if (!WebMgr.accessTokenObj) return;
        if (field) return WebMgr.accessTokenObj[field];
        return WebMgr.accessTokenObj;
    }

    setConfig = (id, config) => WebMgr.configs = { ...WebMgr.configs, [id]: { ...WebMgr.configs[id], ...config } };
    getConfig = (id, field) => {
        if (!id) return WebMgr.configs;
        if (field) return WebMgr.configs[id]?.[field];
        return WebMgr.configs[id];
    }

    setBrowserNotifyPermission = permission => WebMgr.browserNotifyPermission = permission; // default, granted, denied;
    getBrowserNotifyPermission = () => WebMgr.browserNotifyPermission;


    getBrowserInfo = type => type ? WebMgr.browserInfo?.[type] : WebMgr.browserInfo;
    isBrowser = list => [...(isArray(list) ? list : [list])].includes(WebMgr.browserInfo.name);

    getNewAccessToken = (oldCookie, hostname, callback) => {
        let intervalId = 'interval_' + genUuid();
        if (oldCookie.refresh_token === WebMgr.recentRefreshToken) {
            if (WebMgr.isGetNewToken) {
                this[intervalId] = setInterval(() => {
                    if (!WebMgr.isGetNewToken) {
                        clearInterval(this[intervalId]);
                        callback(WebMgr.recentNewToken);
                    }
                }, 10);
            } else {
                callback(WebMgr.recentNewToken);
            }
        } else {
            WebMgr.recentRefreshToken = oldCookie.refresh_token;
            if (WebMgr.isGetNewToken) {
                this[intervalId] = setInterval(() => {
                    if (!WebMgr.isGetNewToken) {
                        clearInterval(this[intervalId]);
                        callback(WebMgr.recentNewToken);
                    }
                }, 10);
            } else {
                WebMgr.isGetNewToken = true;
                webLog('handle get refresh_token', { type: 'TOKEN', color: 'darkviolet' });
                let reqUrl = getRefreshTokenUrl(oldCookie.access_token, oldCookie.refresh_token);
                fetch(reqUrl)
                    .then(res => res.json())
                    .then((resp) => {
                        webLog('get new access_token success', { type: 'TOKEN', color: 'green' });
                        if (validateApiResp(resp)) {
                            const { access_token, refresh_token } = resp.payload;
                            setCookie(hostname, { ...oldCookie, access_token, refresh_token: splitRefreshToken(refresh_token) });
                            const newAccessTokenObj = { ...jwtDecode(access_token), login_email: oldCookie.login_email };
                            WebMgr.accessToken = access_token;
                            WebMgr.recentNewToken = access_token;
                            WebMgr.recentRefreshToken = access_token;
                            WebMgr.accessTokenObj = newAccessTokenObj;
                            callback(access_token);
                        } else {
                            callback('');
                            webLog('failure to get new access_token', { type: 'TOKEN', color: 'red' });
                            redirectToLoginPage({ subDomain: WebMgr.agencyInfo?.using_single_domain, clearCookie: true });
                        }
                        WebMgr.isGetNewToken = false;
                    }, (error) => {
                        WebMgr.isGetNewToken = false;
                        webLog('failure to get new access_token', { type: 'TOKEN', color: 'red', data: error });
                        callback('');
                        redirectToLoginPage({ subDomain: WebMgr.agencyInfo?.using_single_domain, clearCookie: true });
                    });
            }
        }
    }

    logErrorEvent = (name, content, callback) => {
        return new Promise(async (resolve) => {
            const logParams = {
                environment: 'WEB',
                name,
                userAgent: window.navigator.userAgent,
                created_date: getLogDate(),
                content,
            };
            let logResp = await CommonAPIs.addSlackLogEvent(logParams);
            callback && callback(logResp);
            resolve(logResp);
        });
    }

    getWebEnv = () => WebMgr.WEB_ENV;
    isWebEnv = target => WebMgr.WEB_ENV === target;

    setRegistedInfo = (status, cb) => {
        WebMgr.registerSuccess = status;
        cb?.(WebMgr.registerSuccess);
    }

    getRegisteredInfo = () => WebMgr.registerSuccess;

    debounce = (timeout, func, skipFirstDebounce) => {
        if (isNumber(timeout) && isFunction(func)) {
            let id = md5(func), finalFunc = (notTrigger) => {
                !notTrigger && func();
                WebMgr.debounceTimer[id] = null;
            };
            if (skipFirstDebounce && !WebMgr.debounceTimer[id]) {
                WebMgr.debounceTimer[id] = setTimeout(() => finalFunc(true), timeout);
                return func();
            }
            clearTimeout(WebMgr.debounceTimer[id]);
            WebMgr.debounceTimer[id] = setTimeout(finalFunc, timeout);
        }
    }

    setWebCallback = cb => Object.assign(WebMgr.callbacks, cb); // updateReRenderPage | togglePopperAlert | toggleWebDialog | showBrowserNotification | onCallPress | canMakeCall | updateMenuCounter
    updateReRenderPage = (...args) => WebMgr.callbacks.updateReRenderPage?.(...args);
    togglePopperAlert = (...args) => WebMgr.callbacks.togglePopperAlert?.(...args);
    toggleWebDialog = (...args) => WebMgr.callbacks.toggleWebDialog?.(...args);
    showBrowserNotification = (...args) => WebMgr.callbacks.showBrowserNotification?.(...args);

    updateMenuCounter = (...args) => WebMgr.callbacks.updateMenuCounter?.(...args);

    setWebData = (id, data) => { Object.assign(WebMgr.datas, { [id]: data }); };
    getWebData = id => { return WebMgr.datas[id]; };

}