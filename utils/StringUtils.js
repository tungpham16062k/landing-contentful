import { Base64 } from 'js-base64';
import numeral from 'numeral';
import anchorme from 'anchorme';

import { i18nText } from '@libs/i18n';

import { isString, isUndefined, isJson, isNumeric, removeUnicode, isCharacter, isLocalhostUrl, isEmail } from './Utils';
import { getFormatDate } from './DateUtils';

import { domains } from '@constants/index';

import { regexs } from '@variables/Regexs';

export const replaceAllStr = (str, search, rep) => {
    // new RegExp('[^0-9\,]', 'g') = /[^0-9\,]/g => remove all non-numeric, except char ",";
    // /[^A-Za-z0-9]/ => remove all non-alphanumeric
    return (!str || !search) ? '' : String(str).replace(new RegExp(search, 'g'), rep || '');
}

export const getLastName = (fullName, firstChar, noNumberChar = '') => {
    fullName = String(fullName);
    if (!fullName) return noNumberChar;
    fullName = isEmail(fullName) ? fullName.split('@')[0] : removeUnicode(fullName);
    let lastName = '';
    if (fullName) {
        let nameParts = fullName.split(' ').reverse();
        lastName = nameParts.find(i => isCharacter(i)) || nameParts[0];
    }
    if (firstChar && lastName) {
        firstChar = (lastName.split('').find(i => isCharacter(i)) || lastName[0]).toUpperCase();
        return noNumberChar && !isCharacter(firstChar) ? noNumberChar : firstChar;
    }
    return lastName || noNumberChar;
}

export const getEmailName = (email) => email ? String(email).split('@')[0] : '';

export const capitalizeStr = (str, all) => {
    str = String(str || '').trim();
    if (!str) return '';
    let capitalize = text => text[0].toUpperCase() + text.slice(1);
    return all ? str.split(' ').map(capitalize).join(' ') : capitalize(str);
}

export const toNumeric = (str) => str ? String(str).replace(/[^0-9\,]/g, '') : str;

export const toNumber = (number) => {
    // 974              974
    // 0.12345          0.12345
    // '10,000.12'      10000.12
    // '23rd'           23
    // '$10,000.00'     10000
    // '100B'           100
    // '3.467TB'        3467000000000
    // '-76%'           0.76
    // '2:23:57'        NaN
    return numeral(number);
}

export const formatNumber = (number, format) => {
    // Numbers
    // 10000            '0,0.0000'          10,000.0000
    // 10000.23         '0,0'               10,000
    // 10000.23         '+0,0'              +10,000
    // -10000           '0,0.0'             -10,000.0
    // 10000.1234       '0.000'             10000.123
    // 100.1234         '00000'             00100
    // 1000.1234        '000000,0'          001,000
    // 10               '000.00'            010.00
    // 10000.1234       '0[.]00000'         10000.12340
    // -10000           '(0,0.0000)'        (10,000.0000)
    // -0.23            '.00'               -.23
    // -0.23            '(.00)'             (.23)
    // 0.23             '0.00000'           0.23000
    // 0.23             '0.0[0000]'         0.23
    // 1230974          '0.0a'              1.2m
    // 1460             '0 a'               1 k
    // -104000          '0a'                -104k
    // 1                '0o'                1st
    // 100              '0o'                100th

    // Currency
    // 1000.234         '$0,0.00'           $1,000.23
    // 1000.2           '0,0[.]00 $'        1,000.20 $
    // 1001             '$ 0,0[.]00'        $ 1,001
    // -1000.234        '($0,0)'            ($1,000)
    // -1000.234        '$0.00'             -$1000.23
    // 1230974          '($ 0.00 a)'        $ 1.23 m

    // Bytes
    // 100              '0b'                100B
    // 1024             '0b'                1KB
    // 2048             '0 ib'              2 KiB
    // 3072             '0.0 b'             3.1 KB
    // 7884486213       '0.00b'             7.88GB
    // 3467479682787    '0.000 ib'          3.154 TiB

    // Percentages
    // 1                '0%'                100%
    // 0.974878234      '0.000%'            97.488%
    // -0.43            '0 %'               -43 %
    // 0.43             '(0.000 %)'         43.000 %

    // Time
    // 25               '00:00:00'          0:00:25
    // 238              '00:00:00'          0:03:58
    // 63846            '00:00:00'          17:44:06

    // Exponential
    // 1123456789       '0,0e+0'            1e+9
    // 12398734.202     '0.00e+0'           1.24e+7
    // 0.000123987      '0.000e+0'          1.240e-4
    let formated = numeral(number).format(format && format !== '0.0' ? format : '0,0');
    if (format === '0.0') return replaceAllStr(formated, ',', '.');
    return formated;
}

export const getShortyLastName = (str) => {
    if (!str || str.length <= 20) return str;
    let sub = str.slice(str.length - 20);
    return sub.substr(sub.indexOf(' ') + 1);
}

export const getShortyEmail = (string = '') => {
    if (string === '' || string === null || string?.length <= 21) {
        return string;
    } else {
        let posAt = string.lastIndexOf('@');
        let length = 22 - string.slice(posAt).length;
        let lastStr = string.slice(0, length).length;
        return string.slice(0, lastStr - 1) + '...' + string.slice(posAt);
    }
}

export const convertStringToNumber = (string) => {
    if (string === i18nText('free')) return 0;
    string = String(string || '').replace(/[^0-9.]/g, '');
    return string ? +string : 0;
}

export const encodeBase64 = (str, skipsPadding) => str ? Base64.encode(isString(str) ? str : (isJson(str) ? JSON.stringify(str) : String(str)), skipsPadding) : '';

export const encodeBase64URI = (str, skipsPadding) => str ? Base64.encodeURI(isString(str) ? str : (isJson(str) ? JSON.stringify(str) : String(str)), skipsPadding) : '';

export const decodeBase64 = (base64) => {
    try { return Base64.decode(base64); } catch (error) { return ''; }
}

export const toBase64 = (data) => Base64.toBase64(data);

export const isBase64 = (str) => Buffer.from(str, 'base64').toString('base64') === str;

export const textTransform = (type, str = '') => {
    str = String(str || '');
    switch (type) {
        case 'l': return str.toLowerCase();
        case 'u': return str.toUpperCase();
        case 'c': return capitalizeStr(str);
        case 'ca': return capitalizeStr(str, true);
        default: return str;
    }
}

export const trimStr = (str, { type, full, validate } = {}) => {
    if (!str) { return ''; }
    str = String(str).trim(); // trim text; 
    str = str.replace(full ? / /g : /  +/g, full ? '' : ' '); // full ? replace all space to none : replace 2 space to 1 space;
    str = textTransform(type, str);
    return validate ? !!str : str;
}

export const securityText = (str, target) => str ? String(str).split('').map(i => { return target || '*'; }).join('') : '';

export const securityCustomerData = (str) => {
    if (!str) return '';
    let displayTxt = '', securityTxt = '',
        securityEmailLength = (email) => {
            let visableLength = 3;
            if (email.length <= 6) {
                visableLength = Math.round(email.length / 2);
                if (visableLength > 0) visableLength -= 1;
            }
            return visableLength;
        };
    if (str.indexOf('@') > -1) {
        if (str.indexOf(',') > -1) {
            let emailParts = str.split(',');
            emailParts = emailParts.filter(item => item);
            if (emailParts.length === 0) return '';
            return emailParts.map(emailPart => {
                let emailDomain = emailPart.split('@');
                let emailPartDisplayTxt = '', emailParthSecurityTxt = '';
                if (emailDomain[0]) {
                    let visableLength = securityEmailLength(emailDomain[0]);
                    emailPartDisplayTxt = emailDomain[0].substring(0, visableLength);
                    emailParthSecurityTxt = emailDomain[0].substring(visableLength, emailDomain[0].length);
                }
                return `${emailPartDisplayTxt}${securityText(emailParthSecurityTxt)}@${emailDomain[1]}`;
            }).join(', ');
        } else {
            let email = str.split('@');
            if (email[0]) {
                let visableLength = securityEmailLength(email[0]);
                displayTxt = email[0].substring(0, visableLength);
                securityTxt = email[0].substring(visableLength, email[0].length);
            }
            return `${displayTxt}${securityText(securityTxt)}@${email[1]}`;
        }
    } else {
        if (str.indexOf(',') > -1) {
            let strParths = str.split(',');
            strParths = strParths.filter(item => item);
            if (strParths.length === 0) return '';
            return strParths.map(strParth => {
                let strPartDisplayTxt = strParth.substring(0, 3);
                let strPartSecurityTxt = strParth.substring(3, str.length);
                return strPartDisplayTxt + securityText(strPartSecurityTxt);
            }).join(', ');
        } else {
            displayTxt = str.substring(0, 3);
            securityTxt = str.substring(3, str.length);
            return displayTxt + securityText(securityTxt);
        }
    }
}

export const webLog = (content, { type, color, tColor, data } = {}) => {
    if (content) {
        let args = [], sub_content = `%c${`[${getLogDate()}]`}${type ? `[${String(type).toUpperCase()}] ` : ''}`;
        if (color) {
            args.push(`${sub_content}%c${content}`, `color: ${tColor || 'unset'}`, `color: ${color}`);
        } else {
            args.push(`${sub_content}${content}`, `color: ${tColor || 'unset'}`);
        }
        if (data) { args.push(data); }
        console.log(...args);
    }
}

export const getLogDate = (date) => getFormatDate('yyyy-MM-dd HH:mm:ss:ms', date).substring(0, 22);

export const isInternalNumber = (number) => {
    number = String(number);
    if (!number) return false;
    let strNumber = String(number);
    let numberLength = strNumber.length;
    return numberLength >= 2 && numberLength <= 4;
}

export const convertStringToListPhone = (string) => {
    if (!string) { return 0; }
    string = string.split('.').join('');
    return (string.replace(/[^0-9.|^,]/g, ''));
}

export const randomId = () => Math.random().toString(36).substring(10);

export const ellipsisStr = (str, options) => {
    if (!str) { return ''; }
    let strOffset = 32;
    if (options) {
        const { offset, width, size, margin } = options;
        if (offset) { strOffset = offset; }
        if (width && size) {
            strOffset = parseInt((width - (margin || 0) - (3 * size)) / size) + 1;
        }
    }
    let subStr = str.length > strOffset && '...' || ''
    return String(str).substring(0, strOffset) + subStr;
}

export const isValidString = (str, regex) => {
    let testRegx = regex ? new RegExp(regex) : null;
    if (testRegx && !testRegx.test(str) || str === '') return true;
    return false;
}

export const getValidString = (str, regex) => {
    switch (regex) {
        case '[0-9]': return str.replace(/[^\d]/gi, '');
        case '[a-z]': return str.toLowerCase().replace(/[^\w\s]/gi, '');
        case '[A-Z]': return str.toUpperCase().replace(/[^\w\s]/gi, '');
        case '[A-Za-z]': return str.replace(/\d/g, '');
        case '[A-Za-z0-9]': return str.replace(/[^\w\s]/gi, '');
        default: return str;
    }
}

export const getRegexText = (str, regex) => {
    switch (regex) {
        case '[a-z]': if (isValidString(str, regexs['[A-Za-z]'])) { return str.toLowerCase(); } return false;
        case '[A-Z]': if (isValidString(str, regexs['[A-Za-z]'])) { return str.toUpperCase(); } return false;
        case '[A-Za-z]': case '[A-Za-z0-9]': case '[0-9]': if (isValidString(str, regexs[regex])) { return str; } return false;
        default: return str;
    }
}

export const convertHtmlToText = (text) => {
    if (isUndefined(text)) return '';
    return text.replace(/<\/?.+?>/ig, ' ').replace(/&nbsp;/gi, ' ');
}

export const isLowerCase = (str) => {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

export const toCaseStyle = (toCase, variable) => {
    // camel, pascal, snake, kebab;
    if (!variable) return '';
    let strs = [], splitSingleStr = (input) => {
        let strTemp = '';
        [...input.split(''), ''].forEach((char, idx) => {
            let isLowerChar = isLowerCase(char), isNumber = isNumeric(char);
            if (idx !== 0 && !isLowerChar && !isNumber) {
                strs.push(strTemp);
                strTemp = '';
            }
            strTemp += char;
        });
    };
    switch (true) {
        case variable.indexOf('_') > -1:
            variable.split('_').forEach(splitSingleStr);
            break;
        case variable.indexOf('-') > -1:
            variable.split('-').forEach(splitSingleStr);
            break;
        default:
            splitSingleStr(variable);
            break;
    }
    switch (toCase) {
        case 'c': // camel
            return strs.map((str, idx) => textTransform(idx === 0 ? 'l' : 'c', str)).join('');
        case 'p': // pascal
            return strs.map(str => textTransform('c', str)).join('');
        case 's': case 'su': // snake
            return strs.map(str => textTransform(toCase === 's' ? 'l' : 'u', str)).join('_');
        case 'k': // kebab
            return strs.map(str => textTransform('l', str)).join('-');
        default: return '';
    }
}

export const converToBoolean = (str) => {
    return textTransform('l', str) === 'false' ? false : !!str;
}

export const escapeHtml = (str) => {
    return String(str || '').replace(/[&<>"'`=\/]/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' })[s]);
}

export const detectLink = (input, { decode, getLink, escape, formater } = {}) => {
    input = String(input || '');
    if (decode) input = decodeURIComponent(input);
    let result = [],
        links = anchorme.list(input),
        getNoneLinkStr = (str) => {
            if (escape) str = escapeHtml(str);
            if (formater) str = formater(str);
            return str;
        };
    if (links.length) {
        links.forEach((item, index) => {
            const { end } = item;
            let anchor = { ...item };
            if (['?', '='].includes(input[end])) {
                let nextSpaceIdx = input.indexOf(' ', end),
                    nextLineDownIdx = input.indexOf('\n', end),
                    nextBreakIdx = nextSpaceIdx > nextLineDownIdx ? nextLineDownIdx : nextSpaceIdx,
                    haveBreak = nextBreakIdx > 0;
                anchor.end = haveBreak ? nextBreakIdx : input.length;
                anchor.string += input.slice(end, anchor.end);
                anchor.query = anchor.string.split('?')[1];
                links[index].end = anchor.end;
            }
            const { isURL, isEmail: _isEmail, protocol, string, start, end: newEnd } = anchor;
            let isLocalhost = isLocalhostUrl(string);
            if (isLocalhost) links[index].isLocalhost = true;
            result.push(getNoneLinkStr(input.slice(index ? links[index - 1].end : 0, start)));
            let attrs = {
                href: protocol && string || `${_isEmail ? 'mailto:' : 'http://'}${string}`,
                onclick: `event.stopPropagation();`,
                ...(isURL && { target: '_blank', rel: 'noopener noreferrer' }),
            };
            let attrsStr = Object.keys(attrs).map(i => `${i}="${attrs[i]}"`).join(' ');
            result.push(`<a ${attrsStr}>${string}</a>`);
            if (index === links.length - 1) {

                result.push(getNoneLinkStr(input.slice(newEnd)));
            }
        });
        if (getLink) links = links.filter(i => i.isURL && !i.isLocalhost);
    }
    if (input && !result.length) {
        result = [getNoneLinkStr(input)];
    }
    result = result.join('');
    return getLink ? { result, links } : result;
}

export const truncateStr = (str, num) => str.length <= num ? str : `${str.slice(0, num)}...`;

export const getCountdownPercent = (value, max) => (value ? Math.round(value / max * 100) : 0) + '%';

export function splitRefreshToken(url) {
    return url ? String(url).split('&refresh_token=')[1] : '';
}

export function getRefreshTokenUrl(accessToken, refreshToken) {
    return `${domains.auth}auth/refresh_token?access_token=${accessToken}&refresh_token=${refreshToken}`;
}

export const getErrorMsg = (error) => {
    return i18nText(error.message);
}