import commonLngs from './lngs/common';
import errorLngs from './lngs/error';

export const availableLngs = ['vi', 'en', 'km'], lngMappings = { vi: 0, en: 1, km: 2 };

class I18nMgr {

    static instance = null;
    static createInstance() { return new I18nMgr(); }
    static getInstance() {
        if (!I18nMgr.instance) { I18nMgr.instance = I18nMgr.createInstance(); }
        return I18nMgr.instance;
    }

    static lng = 'vi';
    static cbs = {};
    static leadedLngs = { ...commonLngs, ...errorLngs };

    setLng(lng) {
        if (availableLngs.includes(lng)) {
            I18nMgr.lng = lng;
            Object.values(I18nMgr.cbs).forEach(cb => cb(lng));
        }
    }
    getLng() { return I18nMgr.lng; }
    getLngIdx() { return lngMappings[I18nMgr.lng]; }

    onChangeLng(id, cb) {
        if (id && typeof cb === 'function') {
            I18nMgr.cbs[id] = cb;
        }
    }
    rmChangeLng(id) {
        delete I18nMgr.cbs[id];
    }

    getLeadedLng = id => I18nMgr.leadedLngs[id];
    setLeadedLng = (id, data) => I18nMgr.leadedLngs[id] = data;

    getText = (id, opts) => textHandler(id, opts, I18nMgr.leadedLngs);

}

const i18nInstance = I18nMgr.getInstance();

const textTransform = (type, str = '') => { str = String(str); switch (type) { case 'l': return str.toLowerCase(); case 'u': return str.toUpperCase(); case 'c': return str.capitalize(); case 'ca': return str.capitalize(true); default: return str; } };

const textHandler = function (id, opts, datas) {
    let { t, n, f, ...keys } = opts || {};
    let text, _id = String(id).split('.');
    _id.forEach((i, _idx) => {
        if (typeof text === 'undefined') {
            text = (datas || this.data)[i];
        } else {
            if (typeof text === 'object') {
                text = text[i];
            }
        }
        if (text && _idx === _id.length - 1) {
            text = text[i18nInstance.getLngIdx()];
        }
    });
    if (Array.isArray(text)) {
        text = text[+(!!(typeof n === 'number' ? n : 0))];
    }
    if (typeof text === 'string') {
        if (text && keys) {
            Object.entries(keys).forEach(([key, value]) => {
                let keyValue = Array.isArray(value) ? this.t(value[0], value[1], datas) : value;
                text = text.replace(new RegExp(`{{${key}}}`, 'g'), keyValue);
            });
        }
    } else {
        text = '';
    }
    return (t ? textTransform(t, text) : text) || (f ? '' : id);
};

export const i18nText = (id, opts) => i18nInstance.getText(id, opts);
export const getI18n = (lngs) => { return { data: { ...commonLngs, ...errorLngs, ...lngs }, t: textHandler }; }

export const setI18nLng = (lng) => i18nInstance.setLng(lng);
export const getI18nLng = () => i18nInstance.getLng();
export const onI18nChangeLng = (id, cb) => i18nInstance.onChangeLng(id, cb);
export const rmI18nChangeLng = (id) => i18nInstance.rmChangeLng(id);
export const getI18nLeadedLng = (id) => i18nInstance.getLeadedLng(id);
export const setI18nLeadedLng = (id, data) => i18nInstance.setLeadedLng(id, data);