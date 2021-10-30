import axios from 'axios';
import { getI18nLng } from '@libs/i18n';

import { getNewAccessToken, getAccessToken } from '@utils/WebUtils';
import { getTimestamp } from '@utils/DateUtils';
import { decryptAES, jwtDecode } from '@utils/EncryptUtils';
import { isJson, isString } from '@utils/Utils';
import { getCookieName, getCookie } from '@utils/CookieUtils';

import { domains } from '@constants/index';
import { requestApiTimeout } from '@constants/Configs';

export default class ApiMgr {

    static instance = null;
    static createInstance() { return new ApiMgr(); }
    static getInstance() {
        if (!ApiMgr.instance) { ApiMgr.instance = ApiMgr.createInstance(); }
        return ApiMgr.instance;
    }

    static reqSources = {};
    static isRedirectToLoginPage = false;

    async doRequest(method, url, { cancelId, body, header, noAuth, timeout, noTimeout, accessToken, isUpload } = {}) {
        try {
            let reqHeader = { 'Content-Type': isUpload ? 'multipart/form-data' : 'application/json', ...header };
            let validAccessToken, reqUrl = String(url) || '', defaultParam = `lng=${getI18nLng() || 'vi'}`;
            reqUrl += `${reqUrl.includes('?') ? reqUrl.endsWith('&') ? '' : '&' : '?'}${defaultParam}`;
            if (!noAuth || accessToken) {
                validAccessToken = await this.validateAccessToken(accessToken);
                if (validAccessToken) {
                    reqHeader.Authorization = `Bearer ${validAccessToken.token}`;
                }
            }
            const reqConfig = {
                method,
                url: reqUrl,
                headers: reqHeader,
                timeout: isUpload || noTimeout ? 0 : (timeout ?? requestApiTimeout),
                data: !isUpload && isJson(body) ? JSON.stringify(body) : (body || '{}'),
                maxContentLength: 100000000,
            }
            if (cancelId) {
                const reqSrc = axios.CancelToken.source();
                ApiMgr.reqSources[cancelId] = reqSrc;
                reqConfig.cancelToken = reqSrc.token;
            }
            const apiResp = await axios.request(reqConfig);
            const result = this.validateResponseData(apiResp.data, validAccessToken);
            this.clearCancelSource(cancelId);
            return result;
        } catch (error) {
            this.clearCancelSource(cancelId);
            if (error?.code === 'ECONNABORTED') {
                error.message = 'timeout_exceeded';
            }
            throw error;
        }
    }

    async simpleRequest(method, url, options) {
        const { body } = options || {};
        return new Promise(resolve => {
            try {
                const reqConfigs = {
                    url, method, timeout: 0,
                    headers: this.getRequestHeader(options),
                    data: body || {},
                };
                axios.request(reqConfigs)
                    .then((res) => {
                        const { status, data } = res;
                        resolve({ status, data });
                    })
                    .catch((error) => {
                        if (error.response) {
                            const { status, data } = error.response;
                            resolve({ status, error: data });
                        } else {
                            resolve({ error: error.message });
                        }
                    });
            } catch (error) {
                resolve({ error });
            }
        });
    }

    async fetchRequest(method, url, options) {
        const { respType = 'json', body, headers, token, isAuth, ...opts } = options || {};
        return new Promise(resolve => {
            try {
                let requestOptions = {
                    method, redirect: 'follow',
                    ...((headers || method === 'post') && { headers: this.getRequestHeader(options) }),
                    ...(body && { body: JSON.stringify(body) }),
                    ...opts,
                };
                fetch(url, requestOptions)
                    .then(resp => resp[respType]().then(data => resolve({ status: resp.status, data })))
                    .catch(error => resolve({ error }));
            } catch (error) {
                resolve({ error });
            }
        });
    }

    cancelRequest(cancelId) {
        if (cancelId) ApiMgr.reqSources[cancelId]?.cancel();
    }

    // START: api handler
    validateAccessToken(accessToken) {
        return new Promise(resolve => {
            let cookieName = getCookieName(), subDomain = cookieName.split('_')[0];
            if (!accessToken && subDomain === domains.defaultSubDomain) { return resolve(); }
            let webCookie = getCookie(cookieName);
            if (!accessToken) accessToken = webCookie?.access_token;
            if (!accessToken) { return resolve(); }
            let decoded = jwtDecode(accessToken), curTime = getTimestamp();
            switch (true) {
                case decoded.exp * 1000 < curTime:
                    if (!ApiMgr.isRedirectToLoginPage) {
                        ApiMgr.isRedirectToLoginPage = true;
                        console.log(`[DEBUG] forceLogout ~ Expired!`);
                        forceLogout();
                    }
                    break;
                case decoded.exp * 1000 - curTime <= 30 * 60 * 1000:
                    getNewAccessToken(webCookie, cookieName, (newAccessToken) => resolve({ decoded, token: newAccessToken }));
                    break;
                default:
                    resolve({ decoded, token: accessToken });
                    break;
            }
        });
    }

    validateResponseData(data, token) {
        try {
            if (isJson(data)) {
                let jsonData = isString(data) ? JSON.parse(data) : data;
                if (jsonData.key_enabled && jsonData.payload) {
                    let decryptPayload = decryptAES(token?.decoded?.soft_key || '', jsonData.payload);
                    if (decryptPayload) {
                        switch (decryptPayload) {
                            case null: case 'null': decryptPayload = null; break;
                            case undefined: case 'undefined': decryptPayload = undefined; break;
                            case 'NaN': decryptPayload = 'NaN'; break;
                            case true: case 'true': decryptPayload = true; break;
                            case false: case 'false': decryptPayload = true; break;
                            default: if (isJson(decryptPayload)) { decryptPayload = JSON.parse(decryptPayload); } break;
                        }
                    }
                    jsonData.payload = decryptPayload;
                }
                return jsonData;
            } else {
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    clearCancelSource(cancelId) {
        if (cancelId) { delete ApiMgr.reqSources[cancelId]; }
    }

    getRequestHeader({ token, isAuth, headers } = {}) {
        return {
            'Content-Type': 'application/json',
            ...((token || isAuth) && { 'Authorization': `Bearer ${token || getAccessToken()}` }),
            ...headers,
        }
    }
    // END: api handler

}