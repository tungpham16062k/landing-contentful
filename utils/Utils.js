import _uniq from 'lodash/uniq';
import _uniqBy from 'lodash/uniqBy';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import fastCompare from 'react-fast-compare'; // This is a fork of the brilliant fast-deep-equal with some extra handling for React.
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export const isUndefined = value => ['undefined', 'NaN', undefined, '', null, 'null', false, 'false', 'Invalid date'].includes(value);

export const isEmail = value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());

export const isCharacter = value => /[a-zA-z]/.test(value);

export const isString = value => typeof value === 'string';

export const isNumber = value => typeof value === 'number' || (String(value).split('.').length === 2 && typeof parseFloat(value) === 'number') || isNumeric(value);

export const isNumeric = value => /^[\d]+$/.test(value);

export const isBoolean = value => typeof value === 'boolean';

export const isObject = (value, isNotEmpty) => {
    let isObj = typeof value === 'object' && !isUndefined(value);
    return isObj && isNotEmpty ? !isEmpty(value) : isObj;
}

export const isEmpty = obj => _isEmpty(obj);

export const isFile = file => `${file}` === '[object File]';

export const isArray = (value, minLength) => Array.isArray(value) && (minLength ? (value.length >= (typeof minLength === 'number' ? minLength : 1)) : true);

export const toArray = value => Array.isArray(value) ? value : [];

export const isHaveValue = (data, value, isArr) => {
    if (!data || (isArr && !isArray(data))) { return false; }
    if (isArr) { return data.findIndex(i => isEqual(i, value)) > -1; }
    for (const key in data) { if (isEqual(data[key], value)) { return true; } }
    return false;
}

export const isHaveString = (arr, str) => {
    str = String(str || '');
    return isArray(arr) && arr.some(i => str.includes(String(i)));
}

export const isHaveProp = (obj, prop) => obj.hasOwnProperty(prop);

export const isHaveProps = (obj, propTxts) => String(propTxts).split(' ').every(i => obj.hasOwnProperty(i));

export const isUrl = (str, type) => {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    switch (type) {
        case 'facebook':
            regex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
            break;
        case '': break;
        default: break;
    }
    return regex.test(str);
}

export const isFileUrl = url => {
    url = url.split('/');
    if (url.length > 3) {
        let fileName = url.pop();
        return !['?', '#'].includes(fileName[0]) && fileName.includes('.');
    }
    return false;
}

export const isLocalhostUrl = url => url.split(/[/:]/)?.[3]?.split('.')?.pop() === 'localhost';

export const isJson = data => {
    try {
        if (!data) return false;
        if (isString(data)) {
            JSON.parse(data);
        } else {
            JSON.parse(JSON.stringify(data));
        }
    } catch (e) { return false; }
    return true;
}

export const toJson = (data) => {
    try {
        if (isObject(data) || isArray(data)) return data;
        let json = null;
        if (isString(data)) {
            json = JSON.parse(data);
            if (isString(json)) {
                json = JSON.parse(json);
            }
        } else {
            json = JSON.parse(JSON.stringify(data));
        }
        return json;
    } catch (e) { return null; }
}

export const isFunction = value => typeof value === 'function';

export const isEqual = (...args) => fastCompare(...args);

export const isEmoji = str => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/.test(str);

export const removeViChar = (str) => {
    if (!str) return '';
    return String(str).toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd');
}

export const removeUnicode = (str, { type, middle } = {}) => {
    if (!str || !isString(str)) { return ''; }
    str = removeViChar(str);
    if (type === 'email') {
        str = str.replace(/[^_@.a-z0-9]/g, '-');
    } else {
        str = str.replace(/[^a-z0-9]/g, '-')
            .replace(/-/g, middle || ' ')  // replace - to \s
            .replace(/^\-+|\-+$/g, '');
    }
    return str.replace(/-+-/g, '-');
}

export const randomColor = () => {
    let letters = '0123456789abcdef', color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const randomString = (type, length) => {
    let types = { num: '0123456789', char: 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', mix: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', charLow: 'abcdefghiklmnopqrstuvwxyz', charUp: 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', numLow: '0123456789abcdefghiklmnopqrstuvwxyz', numUp: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ', };
    return Array.from({ length }).map(() => {
        let rnum = Math.floor(Math.random() * types[type].length);
        return types[type].substring(rnum, rnum + 1);
    }).join('');
}

export const reverseStr = str => String(str).split('').reverse().join('');

export const randomValue = (inputValue, isInt) => {
    if (!inputValue || !isString(inputValue)) return null;
    let rnum = Math.floor(Math.random() * inputValue.length), rvalue = inputValue.substring(rnum, rnum + 1);
    return isInt ? parseInt(rvalue) : rvalue;
}

export const calcCrowDistance = (lat1, lon1, lat2, lon2, unit) => {
    let R = 6371 * (unit === 'm' ? 1000 : 1); // default km;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let dlat1 = lat1 * Math.PI / 180;
    let dlat2 = lat2 * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const cloneObj = (obj, props, isRemove) => {
    let _obj = {}, _props = String(props || '').split(' ');
    if (obj && _props.length) {
        obj = cloneDeep(obj);
        if (isRemove) {
            Object.keys(obj).forEach(key => {
                if (!_props.includes(key)) {
                    _obj[key] = obj[key];
                }
            });
        } else {
            _props.forEach(i => _obj[i] = obj[i]);
        }
    }
    return _obj;
}

export const cloneObjProps = (datas, targetPropTxt, valueTxt, isNewValue) => {
    function cloneProp(obj, targetProps, values, isNew) {
        let clonedObj = obj;
        for (let i = 0; i < targetProps.length; i++) {
            clonedObj[targetProps[i]] = getCloneData(obj, i, values, isNew);
        }
        return clonedObj;
    }
    function getCloneData(obj, index, values, isNew) {
        return isNew ? values[index] : obj[values[index]];
    }
    let clonedData = null;
    if (datas && isString(targetPropTxt) && isString(valueTxt)) {
        let targetProps = targetPropTxt.split(' '), values = valueTxt.split(' ');
        if (values.length >= targetProps.length) {
            if (isArray(datas)) {
                let cloned = [];
                for (let data of datas) {
                    cloned.push(cloneProp(data, targetProps, values, isNewValue));
                }
                clonedData = cloned;
            } else {
                clonedData = cloneProp(datas, targetProps, values, isNewValue);
            }
        }
    }
    return clonedData;
}

export const mergeObj = (obj1, obj2, isSort) => {
    let mergedObj = {};
    if (isArray(obj1)) {
        obj1.forEach(obj => {
            mergedObj = { ...mergedObj, ...obj };
        });
        if (obj2) { return sortProp(mergedObj); } // now use as isSort params;
    } else {
        mergedObj = { ...obj1, ...obj2 };
        if (isSort) { return sortProp(mergedObj); }
    }
    return mergedObj;
}

export const mergeArray = (datas, isUnique) => {
    if (!isArray(datas) || datas.length === 0) return null;
    let finalArray = [];
    for (let data of datas) {
        let array = data;
        if (isArray(array) && array.length > 0) {
            finalArray = [...finalArray, ...array];
        }
    }
    if (isUnique) { finalArray = _uniq(finalArray); }
    return finalArray;
}

export const sortProp = obj => {
    if (!isObject(obj)) return null;
    let sortedObj = {};
    Object.keys(obj).sort().forEach(prop => { sortedObj[prop] = obj[prop]; });
    return sortedObj;
}

export const json2String = json => JSON.stringify(json).replace(/"/g, `'`);

export const string2Json = (txt) => {
    try {
        if (!txt || !isString(txt)) return null;
        return JSON.parse(txt.replace(/'/g, '"'));
    } catch (error) {
        return null;
    }
}

export const indexText = (index, max, isSkipZero) => {
    if (!index && !max) return null;
    let indexTxt = isSkipZero ? String(index + 1) : String(index), maxTxt = String(max), indexL = indexTxt.length, maxL = maxTxt.length, subTxt = '';
    if (maxL > indexL) { for (let i = 0; i < maxL - indexL; i++) { subTxt += '0'; } }
    return subTxt + indexTxt;
}

export const miniTimer = time => new Promise(resolve => isNumber(time) ? setTimeout(resolve, time) : resolve());

export const getProps = (data, field, isConcatArray, isUnique) => {
    if (!isArray(data) || data.length == 0 || !field) { return []; }
    let props = [];
    data.forEach(item => {
        if (isConcatArray) {
            props = props.concat(item[field]);
        } else {
            props.push(item[field]);
        }
    });
    if (isUnique) { props = _uniq(props); }
    return props;
}

export const getSmsAmount = (smsTxt) => {
    if (!smsTxt || !isString(smsTxt)) { return 0; }
    let textSize = smsTxt.length;
    if (textSize <= 160) { return 1; }
    if (textSize % 155 === 0) { return textSize / 155; }
    return (textSize - (textSize % 155)) / 155 + 1;
}

export const removeProps = (obj, propTxt) => {
    if (!obj) return null;
    if (!propTxt || !isString(propTxt)) { return obj; }
    let props = propTxt.split(' ');
    if (props.length === 0) { return obj; }
    let newObj = _cloneDeep(obj);
    props.forEach(prop => delete newObj[prop]);
    return newObj;
}

export const uniqArray = arr => isArray(arr) ? _uniq(arr) : arr;

export const formatBytes = (a, b, space) => {
    if (0 == a) return '0 Bytes';
    let c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + (space ? ' ' : '') + e[f];
}

export const roundNumber = (type, number) => {
    if (!type || !isNumber(number)) return null;
    let roundedNumber = 0;
    switch (type) {
        case 'f':
            roundedNumber = Math.round(parseFloat(number));
            break;
        case 'i':
            roundedNumber = parseInt(number);
            let divided = roundedNumber / 10, surplus = String(divided).split('.');
            if (surplus.length > 1) {
                roundedNumber = parseInt(surplus[0]) * 10 + 10;
            }
            break;
        default:
            break;
    }
    return roundedNumber;
}

export const getDateTxt = (date, isFormat = true) => `${isFormat && date < 10 ? '0' : ''}${date}`;

export const getMediaTimer = (t, { middle = ':', hUnit, minUnit, secUnit, minStr } = {}) => {
    t = parseInt(isUndefined(t) ? 0 : t);
    if (!t) return `00${middle}00`;
    let isH = t > 3600,
        h = isH ? Math.trunc(t / 3600) : 0,
        min = Math.trunc((isH ? t % 3600 : t) / 60),
        sec = Math.trunc((isH ? t % 3600 : t) % 60),
        hTxt = h ? `${getDateTxt(h, !minStr)}${hUnit || ''}${middle}` : '',
        minTxt = `${getDateTxt(min, !minStr)}${minUnit || ''}${middle}`,
        secTxt = `${getDateTxt(sec, !minStr)}${secUnit || ''}`;
    return `${hTxt}${(minStr && min > 0) || !minStr ? minTxt : ''}${secTxt}`;
}

export const getPagingData = (datas, page, size) => {
    if (!isArray(datas) || isUndefined(page) || isUndefined(size) || !isNumber(page) || !isNumber(size)) { return []; }
    let from = page * size;
    return datas.slice(from, from + size);
}

export const genUuid = (version = '1', options = {}) => {
    let custom_namespace;
    version = String(version);
    if (version === '3' || version === '5') {
        if (!isArray(options, true)) { return; }
        switch (options[1]) {
            case 'DNS': custom_namespace = uuidv5.DNS; break;
            case 'URL': custom_namespace = uuidv5.URL; break;
            default: custom_namespace = options[1]; break;
        }
    }
    switch (version) {
        case '0': return `${randomString('char', 11)}${+new Date()}`.shuffle();
        case '1': // timestamp => '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d';
            return uuidv1();
        case '3': // namespace
            // using predefined DNS namespace (for domain names) => '9125a8dc-52ee-365b-a5aa-81b0b3681cf6';
            // using predefined URL namespace (for, well, URLs) => 'c6235813-3ba4-3801-ae84-e0a6ebb7d138';
            // using a custom namespace;
            // => Note: Custom namespaces should be a UUID string specific to your application!
            // => E.g. the one here was generated using this modules `uuid` CLI.
            // => const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            // => 'e8b5a51d-11c8-3310-a6ab-367563f20686';
            return uuidv3(options[0], custom_namespace);
        case '4': return uuidv4(); // random => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
        case '5': return uuidv5(options[0], custom_namespace); // namespace, same input type as v3;
        default: return;
    }
}

export const cloneDeep = obj => obj ? _cloneDeep(obj) : obj;

export const timerFunc = (timeout, cb = () => null) => {
    let _timeout = String(timeout).trim();
    if (_timeout) {
        let sortType = [['s', 1], ['m', 60], ['h', 3600], ['d', 86400]].find(i => i[0] === _timeout.slice(-1));
        _timeout = parseInt(parseFloat(_timeout) * (sortType ? (sortType[1] * 1000) : 1));
    }
    _timeout ? setTimeout(cb, _timeout) : cb();
}

export const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); // min and max included

export const filterArray = (keysearch, propKeyTxt, arr, arrTxt) => {
    if (!keysearch || !propKeyTxt || !isArray(arr, true)) { return []; }
    let result = [], searchReg = getEscapesRegex(removeUnicode(keysearch), 'i');
    let propSearchs = String(propKeyTxt).split(' ');
    propSearchs.forEach((prop) => {
        let searchData = arr.filter((item, index) => {
            let value = removeUnicode(arrTxt && arrTxt[prop] && arrTxt[prop][index] || item[prop]);
            return searchReg.test(value) || value.indexOf(keysearch) > -1;
        });
        result = _uniq([...result, ...searchData]);
    });
    return result;
}

export const isValidPhone = (phone, { max, min, isSpec, skipPrefix } = {}) => {
    phone = String(phone);
    const prefix = !skipPrefix ? (['855', '84', '0'].some(i => phone.startsWith(i)) || isSpec && ['1900', '1800'].some(i => phone.startsWith(i))) : true;
    return phone.length >= (min || 8) && phone.length <= (max || 12) && prefix;
}

export const isOdd = number => number % 2;

export const compareJson = (obj1, obj2) => {
    try {
        return JSON.stringify(obj1).split('"').sort().join('') === JSON.stringify(obj2).split('"').sort().join('');
    } catch (error) {
        return obj1 === obj2;
    }
}

export const extractHostname = (url = '') => {
    url = String(url);
    if (!url) return '';
    return url.replace(/(https|http)+:|\/\//g, '').split(/\/\/|\/|\?|#|:/g)[0];
}

export const uniqBy = (...args) => _uniqBy(...args);

export const loadScript = (src, { id } = {}) => {
    let s, t;
    s = document.createElement('script');
    if (id) s.id = id;
    s.src = src;
    s.type = 'text/javascript';
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

export const triggerEvent = (el, event, fn, isRemove) => {
    let listEvent = isArray(event) ? event : [event];
    if (!el) { console.log('missing triggerEvent el:', el, event); return; }
    listEvent.forEach(e => { el[`${isRemove ? 'remove' : 'add'}EventListener`](e, fn, false); });
}

export const addEvent = (el, event, fn) => {
    let listEvent = isArray(event) ? event : [event];
    if (!el) { console.log("missing addEvent el:", el, event); return; }
    let isOld = !el.addEventListener, addMethod = isOld ? 'attachEvent' : 'addEventListener';
    listEvent.forEach(e => {
        let eventArgs = [`${isOld ? 'on' : ''}${e}`, fn];
        !isOld && eventArgs.push(false);
        el[addMethod](...eventArgs);
    });
}

export const scrollHorizontally = (el, e, step) => {
    if (!el) return;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    el.scrollLeft -= (delta * (step || 40));
    e.preventDefault();
}

export const getEscapesRegex = (keyword, options) => new RegExp(keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), options);