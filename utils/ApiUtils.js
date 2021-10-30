import { i18nText } from '@libs/i18n';

import { miniTimer } from './Utils';
import { getTimestamp, getDelayTime } from './DateUtils';

import { RespCode } from '@constants/index';

export const apiCommonRequest = (api, params, { delay, debug } = {}) => new Promise(async (resolve) => {
    try {
        let reqAt = getTimestamp(), data = await api(params);
        if (delay) await miniTimer(getDelayTime(reqAt, 'ms', delay));
        if (validateApiResp(data)) {
            resolve({ data: data.payload });
        } else throw data;
    } catch (error) {
        if (debug) console.log(`🚀 : apiCommonRequest -> error`, error);
        resolve({ error });
    }
});

export const validateApiResp = (resp, skipPayload) => resp?.status_code === RespCode.SUCCESS && (skipPayload ? true : resp.payload);

export function getApiErrorMsg(error) {
    let errCode = 'errorOccurred', errMsg = error?.message;
    if (errMsg) {
        let pbxErrmsg = RespCode.PBX.find(i => i.msg === errMsg);
        if (pbxErrmsg) {
            errCode = 'pbx.' + pbxErrmsg.code;
        } else {
            switch (errMsg) {
                case 'No value present':
                    errCode = 'noValuePresent';
                    break;
                case 'Unauthorized':
                    errCode = 'unauthorized';
                    break;
                case 'Forbidden':
                    errCode = 'forbidden';
                    break;
                case 'Network Error':
                    errCode = 'network';
                    break;
                default:
                    if (errMsg.indexOf(' ') > -1) {
                        return errMsg;
                    } else {
                        errCode = errMsg;
                    }
                    break;
            }
        }
    }
    return i18nText('apiErr.' + errCode);
}