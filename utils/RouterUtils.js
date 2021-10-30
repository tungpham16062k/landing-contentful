import { Router } from '../routes';
import RouterMgr from '@cores/RouterMgr';

import { i18nText } from '@libs/i18n';

import { removeProps, isArray, isHaveProp, isString, isNumeric } from './Utils';
import { getConfig, getWebDomain, setConfig } from './WebUtils';
import { encodeBase64URI } from './StringUtils';
import { validateApiResp } from './ApiUtils';
import { getCookieName, setCookie } from './CookieUtils';

import { PaginationEnum } from '@variables/index';

const ScreenInstance = RouterMgr.getInstance();

function getRouterParamPath(path, { e, a, force, redirect, keep } = {}) { // e: exclude, a: addition;
    if (!keep && !e && !a && !redirect) { return ''; }
    let paramPath = '', params = {
        ...(!force && getRouterQuery({ noDynamic: true })), ...a,
        ...(redirect && { redirect: isString(redirect) ? encodeURIComp(window.location[redirect] || redirect) : encodeBase64URI(getRouterAsPath()) }),
    };
    let keys = Object.keys(removeProps(params, e)), hadParam = path && path.indexOf('?') > -1;
    if (keys.length > 0) {
        keys.forEach((key, index) => {
            paramPath += (index == 0 ? (hadParam ? '&' : '?') : '&') + `${key}=${params[key]}`;
        });
    }
    return paramPath;
}

function handleChangeRoute(type, path, { hash, params, event, validate } = {}) {
    if (!path) return;
    if (path === 'current') { path = window.location.pathname; }
    event?.preventDefault();
    if (validate) {
        if (window.location.search.includes('changed')) {
            let resp = window.confirm(`${i18nText('change_data')}, ${i18nText('leave_this_page', { type: 'l' })}?`);
            if (!resp) return;
        }
    }
    return new Promise(resolve => {
        let url = path + getRouterParamPath(path, params);
        if (hash) { url += `#${hash}`; }
        Router[`${type}Route`](url).then(() => {
            resolve();
        });
    });
}

export const encodeURIComp = (str) => { str = String(str || ''); try { return encodeURIComponent(str); } catch (error) { return str; } }

export const decodeURIComp = (str = '') => { str = String(str || ''); if (!str) { return str; } try { return decodeURIComponent(str); } catch (error) { return str; } }

export const routerPush = (path) => { if (!path) { return; } Router.push(path); }

export const routerBack = (redirect) => {
    if (redirect) {
        let havePrevPage = document && document.referrer && document.referrer.indexOf(getWebDomain()) || getCurrentRouter(2);
        if (havePrevPage) {
            Router.back();
        } else {
            Router.replaceRoute(redirect);
        }
    } else {
        Router.back();
    }
}
export const pushRoute = (...args) => handleChangeRoute('push', ...args);

export const replaceRoute = (...args) => handleChangeRoute('replace', ...args);

export const prefetchRoute = (path, params, options) => path && new Promise(resolve => Router.prefetchRoute(path, params, options).then(resolve));

export const openRoute = (path, ...args) => {
    if (!path && !path.url) return;
    window.open(`${path?.crossSite ? '' : window.location.origin}${path.url || path}`, ...args);
}

export const changeHref = (url) => window.location.href = url || window.location.origin;

export const changeHash = (hash) => window.location.hash = hash;

export const redirectPage = ({ subDomain, pathUrl = '' } = {}) => {
    const { protocol, port } = window.location;
    let targetSubDomain = subDomain || 'sso', baseAddress = `.${getWebDomain()}`;
    if (port) { baseAddress += `:${port}` }
    window.location.href = `${protocol}//${targetSubDomain}${baseAddress}/${pathUrl}`;
}

export const getRouter = () => Router.router;

export const getRouterQuery = ({ multi, decode, noDynamic } = {}) => {
    return {
        ...(!noDynamic && Router.router.query),
        ...Object.fromEntries(window.location.search.substring(1).split('&').map(param => {
            let parts = param.split('=');
            parts[0] = decodeURIComp(parts[0]);
            if (multi) {
                parts[1] = parts?.[1]?.split(',').map(i => decode ? decodeURIComp(i) : i);
            } else {
                parts[1] = decode ? decodeURIComp(parts[1]) : parts[1];
            }
            return parts;
        }).filter(i => i[0])),
    };
} // query: { sourceId: '5d19b76e4e940b0007d02b27' }

export const getRouterPathname = () => window.location.pathname; // pathname: '/customer/list'

export const getRouterRoute = () => Router.router.route; // route: '/customer-list'

export const getRouterAsPath = () => Router.asPath; // asPath: '/customer/5d19b76e4e940b0007d02b27/list'


export const setCurrentRouter = (page, param) => ScreenInstance.setCurrentRouter(page, param);

export const getCurrentRouter = (index, all) => ScreenInstance.getCurrentRouter(index, all);

export const isNotRefreshPage = (notRefreshPages = []) => notRefreshPages.includes(getCurrentRouter(1));

export const getValidTabIndex = (tabs, path, fallback) => {
    if (!isArray(tabs, true)) return;
    let tabId = getRouterQuery().tabId;
    const curTab = tabs.findIndex(i => i.id === tabId && !i.hidden);
    let tabIndex = 0;
    if (curTab > -1) {
        tabIndex = curTab;
    } else {
        const validTabIndex = tabs.findIndex(i => !i.hidden);
        let validTab = tabs[validTabIndex];
        tabId = validTab.id;
        fallback?.({ tab: validTab });
        if (path) { replaceRoute(path.replace(':tabId', validTab.id)); }
    }
    return { tabIndex, tabId };
}

export const getRouterMenuId = () => {
    const pathParts = getRouterAsPath().split('/');
    return pathParts[1] || '';
}

export const getRouterSubMenu = (subMenus) => {
    const menuRoute = getRouterRoute().replace('/', '');
    return subMenus.find(i => i.id === menuRoute || i.child?.some(j => `${i.id.split('-').slice(0, -1).join('-')}-${j}` === menuRoute));
}

export const validateRouteRequest = (id, params, callback) => {
    return new Promise(async (resolve) => {
        try {
            let resp;
            switch (id) {
                case 'customer-filter-list':
                    resp = await FilterAPIs.getFilterListClassify('hopper', { timeout: 10000 }, true);
                    break;
                case 'ticket-topic':
                    resp = await FilterAPIs.getFilterListTopic();
                    break;
                case 'ticket-status':
                    resp = await TicketAPIs.getTicketConfigList('status_set', params);
                    break;
                default: break;
            }
            if (validateApiResp(resp)) {
                if (id === 'customer-filter-list') setConfig(id, resp.payload);
                const item = id === 'ticket-status' ? resp.payload?.items?.[0] : resp.payload;
                if (!item) throw resp;
                callback?.(true, item);
                resolve(item);
            } else throw resp;
        } catch (error) {
            if (callback) { callback(false, null) }
            resolve(getErrorMsg(error));
        }
    });
}

export const handleValidateRoute = (id, cb) => {
    let params = PaginationEnum.BASE;
    switch (id) {
        // case 'abc':
        //     someValidateFunc((isValid) => {
        //         if (isValid) {
        //             this.handleChangeMenu(type, data);
        //         } else {
        //             // show dialog confirm;
        //             // this.toggleConfirmDialog(true, { msg: 'Some custom message', onAccept: () => someFunction() });
        //         }
        //     });
        //     break;
        case 'customer-filter-list': {
            params = PaginationEnum.BASE;
            validateRouteRequest(id, params, (status, hoppers) => {
                if (status && isArray(hoppers?.items, true)) {
                    const agentConfig = getConfig('agent', 'obj_config');
                    const hopper = hoppers?.items?.find(x => x._id === agentConfig?.last_viewed_hopper) || hoppers?.items[0];
                    const redirectPath = `/customer/filter/${hopper?._id || 'empty'}/list?page=&hopper=${hopper?._id}`;
                    cb(true, [redirectPath]);
                } else {
                    cb(false, { confirmFilterContact: true });
                }
            });
        } break;
        case 'ticket-topic': {
            validateRouteRequest(id, params, (status, topics) => {
                if (status) {
                    const lastViewedTopicId = getConfig('ticket', 'last_viewed_topic_id');
                    const topic = topics?.find(i => i._id === lastViewedTopicId) || topics[0];
                    let filter = {};
                    if (topic) {
                        filter = {
                            category_id: topic?._id,
                            index: topic?.ticketStatusSet?.status?.map(i => i.index),
                            types: [],
                        };
                        setConfig('topicFilters', {
                            category_id: topic?._id,
                            status: topic?.ticketStatusSet?.status,
                            types: [],
                            field_code: 'topic',
                        });
                    }
                    const redirectPath = `/ticket/topic?page=1&category_filters=${topic?._id}`;
                    cb(true, [redirectPath, filter]);
                } else {
                    cb(false, { confirmTicketList: true });
                }
            });
        } break;
        default: break;
    }
}
// START: sidebar menu

// START: filter path
export const changeFilterRoute = (baseUrl, data) => {
    let paramUrl = '', _data = data || {}, { page, size, keyword, filterUrl, searchType } = _data;
    if (isHaveProp(_data, 'page')) paramUrl += `page=${page}`;
    if (isHaveProp(_data, 'size')) paramUrl += `&size=${size}`;
    if (keyword) paramUrl += `&keyword=${encodeURIComp(keyword)}`;
    if (searchType) paramUrl += `&searchtype=${searchType}`;
    if (filterUrl) paramUrl += filterUrl;
    if (paramUrl.startsWith('&')) { paramUrl = paramUrl.substr(1); }
    if (paramUrl) { paramUrl = '?' + paramUrl; }
    return replaceRoute(baseUrl + paramUrl);
}
// END: filter path

export const iniFrame = () => window.location !== window.parent.location;

export const extractDomainInfo = (origin) => {
    if (!origin) return {};
    let host = origin.split('//').pop(),
        [hostname, port] = host.split(':'),
        domainParts = hostname.split(':')[0].split('.'),
        ipSubDomain = domainParts.slice(0, 4).every(isNumeric),
        subDomain = domainParts.slice(0, ipSubDomain ? 4 : 1).join('.');
    domainParts = domainParts.slice(ipSubDomain ? 4 : -(domainParts.length - 1));
    let env = 'stg', id = domainParts.join('_'), domain = domainParts.join('.');
    switch (domainParts.slice(-1)[0]) { case 'localhost': env = 'local'; break; case 'dev': env = 'dev'; break; default: break; }
    return { isLocal: env === 'local', env, id, subDomain, domain, port: port ? `${parseInt(port)}` : '' };
}

export const redirectToLoginPage = ({ subDomain, loginDomain, clearCookie, alertMsg, noAlert, subPath = '/' } = {}) => {
    const { protocol, port } = window.location;
    let targetSubDomain = (['sso', 'login'].includes(loginDomain) && loginDomain) || subDomain || domains.defaultSubDomain, baseAddress = `.${getWebDomain()}`;
    if (port) { baseAddress += `:${port}` }
    if (clearCookie) {
        setCookie(getCookieName());
        if (!noAlert) window.alert(alertMsg || i18nText('loginSessionExpired'));
    }
    window.location.href = `${protocol}//${targetSubDomain}${baseAddress}${subPath}`;
}