// libraries
import { format as dateFnsFormat } from 'date-fns';
import { getI18nLng } from '@libs/i18n';

// utils
import { isUndefined, isNumber, isNumeric, isObject, isBoolean, getDateTxt } from './Utils';
import { getCompanyInfo } from './WebUtils';

export const isDate = (d) => {
    if (!d) return false;
    if (!isNumeric(parseFloat(d)) && new Date(d).getTime() > 0) return true;
    if (new Date(parseFloat(d)).getTime() > 0) return true;
    return false;
}

export const getDateObj = (d, format) => {
    if (format) return new Date(dateFnsFormat(d, format).toString());
    if (d && !isDate(d)) return null;
    if (d && isNumber(d)) { let ts = parseInt(d); return new Date(`${ts}`.length === 10 ? ts * 1000 : ts); }
    if (d) return new Date(d);
    return new Date();
}

export const getTimestamp = (d, format) => {
    let dateObj = getDateObj(d, format);
    return dateObj ? dateObj.getTime() : null;
}

export const isTimestamp = (timestamp) => {
    if (!timestamp) return false;
    if (new Date(parseFloat(timestamp)).getTime() > 0) return true;
    return false;
}

export const getDateOffset = (offset, d) => {
    let curDate = getDateObj(d);
    let utcDate = curDate.getTime() + (curDate.getTimezoneOffset() * 60000);
    let newDateWithOffset = new Date(utcDate + (3600000 * parseInt(offset)));
    return newDateWithOffset.getTime();
}

export const dateDiff = (type, past, present) => {
    let t1 = getTimestamp(past), t2 = getTimestamp(present), d1 = getDateObj(past), d2 = getDateObj(present);
    if (!t2 || !t1 || t2 < t1) return null;
    switch (type) {
        case 'ms':
            return parseInt(t2 - t1);
        case 's':
            return parseInt((t2 - t1) / (1000));
        case 'min':
            return parseInt((t2 - t1) / (60 * 1000));
        case 'h':
            return parseInt((t2 - t1) / (3600 * 1000));
        case 'd':
            return parseInt((t2 - t1) / (24 * 3600 * 1000));
        case 'w':
            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        case 'm':
            let d1Y = d1.getFullYear(), d2Y = d2.getFullYear();
            let d1M = d1.getMonth(), d2M = d2.getMonth();
            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        case 'y': return d2.getFullYear() - d1.getFullYear();
        default: return null;
    }
}

export const getFormatDate = (format, d, { type, is12h, reverse, showSecond, strict } = {}) => {
    let finalFormat = format;
    if (['default', 'nation', 'lng'].includes(format)) {
        let timeFormat = '', dateFormat = '';
        if (type !== 'd_m') {
            timeFormat += is12h ? 'hh' : 'HH';
            timeFormat += ':mm';
            if (showSecond) timeFormat += ':ss';
        }
        switch (format) {
            case 'default':
                dateFormat = 'dd/MM/yyyy';
                break;
            case 'nation': case 'lng':
                let isVn = format === 'lng' ? getI18nLng() === 'vi' : (getCompanyInfo('nation') || 'vn') === 'vn';
                dateFormat = `${isVn ? 'dd/MM' : 'MM/dd'}${type === 'd_m' ? '' : '/yyyy'}`;
                break;
            default: break;
        }
        if (['d_m', 'short'].includes(type)) {
            finalFormat = dateFormat;
        } else {
            if (type === 'time') {
                finalFormat = timeFormat;
            } else {
                finalFormat = reverse ? (dateFormat + ' ' + timeFormat) : (timeFormat + ' ' + dateFormat);
            }
        }
    }
    return strict && !d ? '' : dateFnsFormat(getTimestamp(d), finalFormat);
}

export const diffDateTime = (type, diff, cur, toDate) => {
    if (!type || !isNumber(diff)) return null;
    let now = cur || null, dateObj = getDateObj(now);
    if (!dateObj) return null;
    switch (type) {
        case 'ms':
            dateObj.setMilliseconds(dateObj.getMilliseconds() + diff);
            break;
        case 's':
            dateObj.setSeconds(dateObj.getSeconds() + diff);
            break;
        case 'min':
            dateObj.setMinutes(dateObj.getMinutes() + diff);
            break;
        case 'h':
            dateObj.setHours(dateObj.getHours() + diff);
            break;
        case 'd':
            dateObj.setDate(dateObj.getDate() + diff);
            break;
        case 'm':
            dateObj.setMonth(dateObj.getMonth() + diff);
            break;
        case 'y':
            dateObj.setFullYear(dateObj.getFullYear() + diff);
            break;
        default: break;
    }
    return toDate ? dateObj : dateObj.getTime();
}

export const getMonthDate = (inputDate) => {
    if (inputDate && !isDate(inputDate)) return null;
    let date = getDateObj(inputDate);
    let y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1), lastDay = new Date(y, m + 1, 1);
    lastDay.setMilliseconds(lastDay.getMilliseconds() - 1);
    let day_till_now = dateDiff('d', firstDay.getTime(), date.getTime()) + 1;
    return {
        firstDay: firstDay,
        lastDay: lastDay,
        day_till_now: day_till_now,
        current_date: date,
        current_date_ts: date.getTime(),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        firstDay_ts: firstDay.getTime(),
        lastDay_ts: lastDay.getTime(),
        month_total_day: lastDay.getDate(),
    }
}

export const getYearDate = () => {
    let date = new Date(), y = date.getFullYear(), firstDay = new Date(y, 0, 1), lastDay = new Date(y, 12, 0);
    return { firstDay: firstDay.getTime(), lastDay: lastDay.getTime() }
}

export const getBEOfDate = (type, kind, date, keepHM, isSunStartWeek) => {
    if (!['d', 'm', 'w', 'y'].includes(type) || !['b', 'e'].includes(kind)) return null;
    const { toDate, keepHM: _keepHM } = isObject(keepHM) ? keepHM : {};
    let formatDate, isEnd = kind === 'e', _date = getDateObj(date), y = _date.getFullYear(), m = _date.getMonth(), d = _date.getDate();
    switch (type) {
        case 'd':
            formatDate = new Date(y, m, d + isEnd);
            break;
        case 'w':
            let day = _date.getDay(), startWeek = !!isSunStartWeek;
            day = day + startWeek - 1;
            formatDate = new Date(y, m, d + (isEnd ? 7 - day : -day));
            break;
        case 'm':
            formatDate = new Date(y, m + isEnd, 1);
            break;
        case 'y':
            formatDate = new Date(y + isEnd, 0, 1);
            break;
        default: break;
    }
    if (isEnd) { formatDate.setMilliseconds(formatDate.getMilliseconds() - 1); }
    if (_keepHM || (isBoolean(keepHM) && keepHM)) {
        formatDate.setHours(date.getHours());
        formatDate.setMinutes(date.getMinutes());
    }
    return toDate ? formatDate : formatDate.getTime();
}

export const isLeapYear = (year) => {
    if (!year) return false;
    let yearInt = parseInt(year);
    return (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
}

export const getTotalDayOfYear = (date) => {
    if (!date) return null;
    let year = String(date).length !== 4 && isDate(date) ? getDateObj(date).getFullYear() : parseInt(date);
    if (!year || year <= 0) return null;
    if (isLeapYear(year)) return 366;
    return 365;
}

export const getTotalDayOfMonth = (month, year) => {
    let curDate = new Date();
    if (month && isDate(month) && parseInt(month) > 31) {
        curDate = getDateObj(month);
        curDate.setMonth(curDate.getMonth() + 1);
        curDate.setDate(0);
    } else if (month && year) {
        curDate = new Date(year, month, 0);
    } else {
        curDate.setMonth(curDate.getMonth() + 1);
        curDate.setDate(0);
    }
    return curDate.getDate();
}

export const isSameDayDate = (date1, date2) => {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) return false;
    return getFormatDate('dd/MM/yyyy', date1) === getFormatDate('dd/MM/yyyy', date2);
}

export const isSameMonthDate = (date1, date2) => {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) return false;
    return getMonthDate(date1).firstDay_ts === getMonthDate(date2).firstDay_ts;
}

export const isSameYearDate = (date1, date2) => {
    if (!date1 || !date2 || !isDate(date1) || !isDate(date2)) return false;
    return getDateObj(date1).getFullYear() === getDateObj(date2).getFullYear();
}

export const getDateInRange = (type, dateFrom, dateTo, format) => {
    if (!type || !dateFrom || !dateTo || !isDate(dateFrom) || !isDate(dateTo) || getTimestamp(dateFrom) > getTimestamp(dateTo)) return null;
    let dateFormat = format || '';
    if (!format) {
        switch (type) {
            case 'd': dateFormat = 'yyyy-MM-dd'; break;
            case 'm': dateFormat = 'yyyy-MM'; break;
            case 'y': dateFormat = 'yyyy'; break;
            default: break;
        }
    }
    let dateRange = dateDiff(type, dateFrom, dateTo) + 1, dateInRanges = [];
    let beginDate = getBEOfDate(type, 'b', dateFrom), endDate = getTimestamp(dateTo);
    for (let i = 0; i < dateRange; i++) {
        let curDate = diffDateTime(type, i, beginDate);
        if (curDate <= endDate) {
            dateInRanges.push({
                date: getFormatDate(dateFormat, curDate),
                beginDate: getBEOfDate(type, 'b', curDate),
                endDate: getBEOfDate(type, 'e', curDate),
            });
        }
    }
    return dateInRanges;
}

export const getDateRange = (type, dateFrom, dateTo) => {
    if (!type || !dateFrom || !isDate(dateFrom) || (dateTo && !isDate(dateTo))) return null;
    switch (type) {
        case 'd': break; case 'm': break; case 'y': break;
        default: return null;
    }
    return dateDiff(type, getTimestamp(dateFrom), getTimestamp(dateTo)) + 1;
}

export const convertTime = (time, from, to, fixed) => {
    if (!isNumber(time) || !from || !to || (!isUndefined(fixed) && !isNumber(fixed))) return null;
    let timeValue = parseFloat(time), fixedValue = fixed ? parseInt(fixed) : 2, convertedTime;
    switch (from) {
        case 'ms':
            switch (to) {
                case 'ms': convertedTime = timeValue; break;
                case 's': convertedTime = timeValue / 1000; break;
                case 'm': convertedTime = timeValue / 1000 / 60; break;
                case 'h': convertedTime = timeValue / 1000 / 60 / 60; break;
                default: return null;
            }
            break;
        case 's':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000; break;
                case 's': convertedTime = timeValue; break;
                case 'm': convertedTime = timeValue / 60; break;
                case 'h': convertedTime = timeValue / 60 / 60; break;
                default: return null;
            }
            break;
        case 'm':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000 * 60; break;
                case 's': convertedTime = timeValue * 60; break;
                case 'm': convertedTime = timeValue; break;
                case 'h': convertedTime = timeValue / 60; break;
                case 'd': convertedTime = timeValue / 60 / 24; break;
                default: return null;
            }
            break;
        case 'h':
            switch (to) {
                case 'ms': convertedTime = timeValue * 1000 * 60 * 60; break;
                case 's': convertedTime = timeValue * 60 * 60; break;
                case 'm': convertedTime = timeValue * 60; break;
                case 'h': convertedTime = timeValue; break;
                case 'd': convertedTime = timeValue / 24; break;
                default: return null;
            }
            break;
        case 'd':
            switch (to) {
                case 'ms': convertedTime = timeValue * 24 * 1000 * 60 * 60; break;
                case 's': convertedTime = timeValue * 24 * 60 * 60 * 60; break;
                case 'm': convertedTime = timeValue * 24 * 60; break;
                case 'h': convertedTime = timeValue * 24; break;
                case 'd': convertedTime = timeValue; break;
                default: return null;
            }
            break;
        default: return null;
    }
    return parseFloat((convertedTime).toFixed(fixedValue));
}

export const getWeeksInMonth = (m, y, isSunStartWeek) => {
    let weeks = [],
        now = new Date(),
        month = m || now.getMonth() + 1,
        year = y || now.getFullYear(),
        firstDate = new Date(year, month - 1, 1),
        lastDate = new Date(year, month, 0),
        numDays = lastDate.getDate(),
        firstDay = firstDate.getDay(),
        start = 1, end = 7 - firstDay;
    if (!isSunStartWeek) end = firstDay === 0 ? 1 : 7 - firstDay + 1;
    while (start <= numDays) {
        let mTxt = getDateTxt(month), startTxt = getDateTxt(start), endTxt = getDateTxt(end),
            startDate = mTxt + '/' + startTxt + '/' + year,
            endDate = mTxt + '/' + endTxt + '/' + year;
        weeks.push({
            dateFormat: 'dd/MM/yyyy',
            start,
            startTxt,
            startDate,
            startTs: getBEOfDate('d', 'b', startDate),
            end,
            endTxt,
            endDate,
            endDateTs: getBEOfDate('d', 'e', endDate),
        });
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) end = numDays;
    }
    return weeks;
}

export const getMondayInWeek = (d) => {
    d = new Date(d);
    let day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getDayOfNextWeek = (dayInWeek) => {
    /**
     * params
     * d [JS Date()]
     * dayInWeek [int] 1 (Mon) - 7 (Sun)
     */
    let ret = new Date();
    ret.setDate(ret.getDate() + (dayInWeek - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
}

export const dateToISO = (d) => getDateObj(d).toISOString();

export const convertDHM = (t) => {
    let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        day = Math.floor(t / cd),
        hour = Math.floor((t - day * cd) / ch),
        minute = Math.round((t - day * cd - hour * ch) / 60000);
    if (minute === 60) {
        hour++;
        minute = 0;
    }
    if (hour === 24) {
        day++;
        hour = 0;
    }
    return { day, hour, minute };
}

export const getDelayTime = (from, type, value) => {
    let time = 0, timeout = diffDateTime(type, value, from), now = getTimestamp();
    if (timeout > now) { time = dateDiff('ms', now, timeout); }
    return time;
}

export const convertDate = (formatType, d, is12h) => {
    let type = formatType || 'date', newDate = new Date(d),
        minute = newDate.getMinutes(),
        hour = newDate.getHours(),
        day = newDate.getDate(),
        month = newDate.getMonth(),
        year = newDate.getFullYear();
    if (is12h && hour > 12) hour = hour - 12;
    minute = ((minute > 9) ? minute : ('0' + minute));
    hour = ((hour > 9) ? hour : ('0' + hour));
    day = ((day > 9) ? day : ('0' + day));
    month = (month > 8) ? (month + 1) : ('0' + (month + 1));
    let date = getI18nLng() === 'vi' ? (`${day}/${month}/${year}`) : (`${month}/${day}/${year}`);
    let time = hour + ':' + minute;
    let datetime = time + ' ' + date;
    let dateresult = { time, date, datetime };
    return dateresult[type];
}

export const getDateTime = (d, isHardDate, toDate) => {
    // let defaultValue = new Date(d);
    if (!d) return null;
    let time = new Date('01/01/2020');
    if (isHardDate) {
        let h = d.getHours(), m = d.getMinutes();
        time.setSeconds(toDate ? 59 : 0);
        time.setMinutes(m);
        time.setHours(h);
        return time.getTime();
    }
    return d.getTime();
}

export const getDeviceTimeZone = () => {
    let offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2);
}

export const getDateFormatType = (type) => {
    let time = 'HH:mm', curLanguage = getI18nLng(),
        date = curLanguage === 'vi' ? 'dd/MM/yyyy' : 'MM/dd/yyyy',
        daymonth = curLanguage === 'vi' ? 'dd/MM' : 'MM/dd';
    return ({
        time, date,
        datetime: time + ' ' + date,
        daymonth,
        year: 'yyyy',
    })[type];
}

export const validateTime = (d) => {
    let min = getDateTime(new Date('00:00:00 01/01/1900'));
    let max = getDateTime(new Date('23:59:59 01/01/2070'));
    if (d > min && d < max) return false;   // valid
    return true;                            // invalid
}

export const getPackageExpiredDate = (curDate, curMonth) => {
    let date = new Date(curDate),
        y = date.getFullYear(),
        m = (date.getMonth() + curMonth),
        mod = (m / 12).toFixed(1).split('.');
    if (m > 12) {
        m = parseInt(mod[1]);
        y += parseInt(mod[0]);
    } else m += curMonth;
    date.setMonth(m);
    date.setFullYear(y);
    return getFormatDate('nation', date);
}

export const getCustomTime = (t, { middle = '', unit = {}, unitStr, minStr } = {}) => {
    // unit: d, h, m, s 
    t = parseInt(isUndefined(t) ? 0 : t);
    if (!unitStr && !middle) middle = ':';
    if (!t) return unitStr ? '0s' : `00${middle}00`;
    let isD = t > 86400, isH = t > 3600, d = isD ? Math.trunc(t / 86400) : 0, h = 0;
    if (isD || isH) h = Math.trunc((isD ? t % 86400 : t) / 3600);
    let min = Math.trunc((isD || isH ? t % 3600 : t) / 60),
        sec = Math.trunc((isD || isH ? t % 3600 : t) % 60),
        dTxt = '', hTxt = '',
        minTxt = `${minStr ? min : getDateTxt(min)}${unit.m || (unitStr ? 'm' : '')}${middle}`,
        secTxt = `${minStr ? sec : getDateTxt(sec)}${unit.s || (unitStr ? 's' : '')}`;
    if (d) dTxt = `${minStr ? d : getDateTxt(d)}${unit.d || (unitStr ? 'd' : '')}${middle}`;
    if (d || h) hTxt = `${minStr ? h : getDateTxt(h)}${unit.h || (unitStr ? 'h' : '')}${middle}`;
    return `${dTxt}${hTxt}${(minStr && min > 0) || !minStr ? minTxt : ''}${secTxt}`;
}

export const convertDate2Time = (time, type, isSec) => {
    let convertValue = 0;
    switch (type) {
        case 'minute':
            convertValue = 60;
            break;
        case 'hour':
            convertValue = 60 * 60;
            break;
        case 'day':
            convertValue = 60 * 60 * 24;
            break;
        case 'week':
            convertValue = 60 * 60 * 24 * 7;
            break;
        case 'month':
            convertValue = 60 * 60 * 24 * 30;
            break;
        case 'year':
            convertValue = 60 * 60 * 24 * 365;
            break;
        default: break;
    }
    return parseInt(time) * (isSec ? 1 : 1000) * convertValue;
}

export const getDateOfYear = (d) => {
    let now = getDateObj(d), start = new Date(now.getFullYear(), 0, 0), diff = now - start, oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

export const getTimePassed = (date) => {
    let curTime = getTimestamp(), beginTime = getTimestamp(date), timeDiff = (curTime - beginTime) / 1000;
    switch (true) {
        // < 1 hour
        case timeDiff < 60 * 60: return ['m', Math.round(timeDiff / 60) || 1];
        // < 1 day
        case timeDiff < 24 * 60 * 60: return ['h', Math.round(timeDiff / 60 / 60)];
        // < 1 week
        case timeDiff < 7 * 24 * 60 * 60: return ['d', Math.round(timeDiff / 24 / 60 / 60)];
        // < 1 year
        case timeDiff < 365 * 24 * 60 * 60: return ['w', Math.round(timeDiff / 7 / 24 / 60 / 60)];
        // > 1 year
        default: return ['y', Math.round(timeDiff / 365 / 24 / 60 / 60)];
    }
};