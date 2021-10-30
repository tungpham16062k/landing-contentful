const unicodeRegLow = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
const unicodeRegUp = 'ÀÁẠẢÃÂẦẤẬẨẪĂẮẰẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊẺĨÒÓỌỎẼÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ';

export const RegexOptions = [
    {
        value: '',
        label: 'not_use',
        regex: `[^A-Za-z0-9${unicodeRegUp + unicodeRegLow} ]`
    },
    {
        value: '[0-9]',
        label: '[0-9]',
        regex: '[^0-9]'
    },
    {
        value: '[a-z]',
        label: '[a-z]',
        regex: `[^a-z${unicodeRegLow} ]`
    },
    {
        value: '[A-Z]',
        label: '[A-Z]',
        regex: `[^A-Z${unicodeRegUp} ]`
    },
    {
        value: '[A-Za-z]',
        label: '[A-Z a-z]',
        regex: `[^A-Za-z${unicodeRegUp + unicodeRegLow} ]`
    },
    {
        value: '[A-Za-z0-9]',
        label: '[A-Z a-z 0-9]',
        regex: `[^A-Za-z0-9${unicodeRegUp + unicodeRegLow} ]`
    },
    {
        value: '[A-Za-z0-9]',
        label: '[A-Z a-z 0-9]',
        regex: `[^A-Za-z0-9${unicodeRegUp + unicodeRegLow}\, ]`
    }
];

export const regexs = {
    '[0-9]': '[^0-9]',
    '[a-z]': `[^a-z${unicodeRegLow} ]`,
    '[A-Z]': `[^A-Z${unicodeRegUp} ]`,
    '[A-Za-z]': `[^A-Za-z${unicodeRegUp + unicodeRegLow} ]`,
    '[A-Za-z0-9]': `[^A-Za-z0-9${unicodeRegUp + unicodeRegLow} ]`
};

export const exactlyRegexs = {
    '[0-9]': '[0-9]',
    '[a-z]': `[a-z${unicodeRegLow} ]`,
    '[A-Z]': `[A-Z${unicodeRegUp} ]`,
    '[A-Za-z]': `[A-Za-z${unicodeRegUp + unicodeRegLow} ]`,
    '[A-Za-z0-9]': `[A-Za-z0-9${unicodeRegUp + unicodeRegLow} ]`
};