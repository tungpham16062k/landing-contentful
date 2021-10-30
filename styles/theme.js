// 4px, 8px, 12px, 16px, 24px, 32px, 48px, 56px,...

import { createTheme, alpha } from '@mui/material';

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 960px
// lg, large: 1280px
// xl, extra-large: 1920px

// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl

const isImportant = function (name) {
    return this[name] ? `${this[name]} !important` : '';
};

export const baseHeights = {
    base: '48px',
    baseNum: 48,
    primary: '41px',
    primaryNum: 41,
    avatar: '32px',
    avatarNum: 32,
};

export const colors = {

    isImportant,

    none: 'transparent',

    bgColor: '#fbfbfc',
    bgDefault: 'rgba(73, 73, 73, 0.08)',
    button: 'rgba(73, 73, 73, 0.1)',

    white: '#ffffff',
    black: '#000000',

    base: '#7d7d7d',

    primary: '#1e3150',
    primaryLight: '#666666',
    primaryDim: '#808080',



    gray: '#cccccc',
    grayLight: '#eaeaea',
    grayDark: '#585d71',
    grayDim: '#9C9C9C',

    blue: '#267aff',
    blueLight: '#57bfdb',
    blueLess: '#848c99',
    blueDim: '#616E82',
    blueGray: '#4a5b75',
    blueDark: '#404b5c',

    green: '#4ca750',
    greenLight: '#32c991',

    red: '#e94440',
    redLight: '#fb7b65',

    orange: '#ffa850',
    orangeLight: '#e9bc5a',
    orangeDark: '#fea220',

    purple: '#a540b8',

    call_in: '#267aff',
    call_out: '#4ca750',
    call_answer: '#fea220',
    call_no_answer: '#e94440',
    call_local: '#a540b8',
    call_unknow: '#7f8c8d',

};

export const textColors = {
    isImportant,
    white: '#ffffff',
    light: '#666666',
    primary: '#494949',
    info: '#267aff',
    success: '#4ca750',
    warn: '#fea220',
    error: '#e94440',
    danger: '#e94440',
    placeholder: 'rgba(73,73,73,0.5)',
    note: '#a540b8',
};

export const filterColors = {
    call: 'rgb(233, 233, 233,0.1)',
    tag: 'rgba(38, 122, 255, 0.1)',
    business: 'rgba(255, 168, 80, 0.1)',
    tag_contact_category: 'rgba(50, 177, 98, 0.1)',
    tag_employee_category: 'rgba(76, 167, 80, 0.05)',
    tag_sort: ' rgba(165, 64, 184, 0.1)',
    employee_list: 'rgba(165, 64, 184, 0.1)',
    employee: 'rgba(233, 188, 90, 0.3)',
    tag_gender: 'rgba(85, 89, 109, 0.1)',
    disposition: 'rgba(233,188,90, 0.1)',
    provider: 'rgba(38, 122, 255, 0.1)',
    number_type: 'rgba(38, 122, 255, 0.1)',
    filter_contact: 'rgba(85, 89, 109, 0.1)',
    tag_status: 'rgba(251, 123, 101, 0.05)',
    tag_manager: 'rgba(233, 188, 90, 0.1)',
    sip_number: 'rgba(38, 122, 255, 0.1)',
    direction: 'rgba(38,122,255, 0.1)',
    hopper: 'rgba(233, 68, 64, 0.1)',
}

export const boxShadows = {

    isImportant,

    base: 'rgba(125, 125, 125, 0.08)',
    baseHover: 'rgba(125, 125, 125, 0.2)',
    baseDark: 'rgba(125, 125, 125, 0.5)',
    baseBlack: 'rgba(125, 125, 125, 0.8)',
    baseLight: 'rgba(73, 73, 73, 0.16)',

    button: 'rgba(73, 73, 73, 0.08)',
    buttonHover: 'rgba(73, 73, 73, 0.2)',

    primary: 'rgba(73, 73, 73, 0.08)',
    primaryHover: 'rgba(73, 73, 73, 0.2)',
    primaryDark: 'rgba(73, 73, 73, 0.5)',
    primaryBlack: 'rgba(73, 73, 73, 0.8)',

    grayLight: 'rgb(233, 233, 233, 0.5)',
    grayLightHover: 'rgb(233, 233, 233,0.8)',
    grayDark: 'rgba(85, 89, 109, 0.5)',
    grayDarkHover: 'rgba(85, 89, 109, 0.8)',

    blue: 'rgba(38, 122, 255, 0.5)',
    blueHover: 'rgba(38, 122, 255, 0.8)',
    blueLight: 'rgba(87, 191, 219, 0.5)',
    blueLightHover: 'rgba(87, 191, 219, 0.8)',

    green: 'rgba(76, 167, 80, 0.5)',
    greenHover: 'rgba(76, 167, 80, 0.8)',

    orange: 'rgba(254, 162, 32, 0.5)',
    orangeHover: 'rgba(254, 162, 32, 0.8)',
    orangeLight: 'rgba(233, 188, 90, 0.5)',
    orangeLighthover: 'rgba(233, 188, 90, 0.8)',

    red: 'rgba(233, 68, 64, 0.5)',
    redHover: 'rgba(233, 68, 64, 0.8)',
    redLight: 'rgba(251, 123, 101, 0.5)',
    redLightHover: 'rgba(251, 123, 101, 0.8)',

    purple: 'rgba(165, 64, 184, 0.5)',
    purpleHover: 'rgba(165, 64, 184, 0.8)',

};

export const linearGradients = {

    tBlue: 'linear-gradient(to top, #01b8fa, #267aff)',
    bBlue: 'linear-gradient(to bottom, #01b8fa, #267aff)',
    rBlue: 'repeating-linear-gradient(rgba(38, 122, 255,0.95), rgba(1, 184, 250,0.95) 70%, rgba(1, 184, 250, 0.95) 30%, rgba(1, 184, 250,0.95) 100%)',

    green: 'linear-gradient(to bottom, #32c991, #4ca750)',
    white: 'linear-gradient(to bottom, #ffffff, #ffffff)',

};

export const borderLines = {
    white: '1px solid #ffffff',
    bgColor: '1px solid #f5f6fa',
    primary: '1px solid rgba(73, 73, 73, 0.08)',
    custom: ({ size = 3, color = '#494949', opacity = 50 } = {}) => `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23${color.replace('#', '')}${opacity}' stroke-width='${size}' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
};

export const imgSizes = {
    icon: '20px',
    avatar: '32px',
    avatarLarge: '48px',
    button: '48px',
};

export const fontFamilys = {
    primary: 'Roboto',
    HelveticaLight: 'HelveticaNeue Light',
    HelveticaBold: 'HelveticaNeue CondensedBold',
    HelveticaCondensedBlack: 'HelveticaNeue CondensedBlack',
};

export const fontWeights = {
    primary: '400',
    bold: '500',
};

export const borderRadiuses = {
    primary: 6,
    big: 12,
}

export const avatarColors = {
    A: 'rgb(45,69,99,0.5)',
    B: 'rgb(165,64,184,0.5)',
    C: 'rgb(233,68,64,0.5)',
    D: 'rgb(254,162,32,0.5)',
    E: 'rgb(76,167,80,0.5)',
    F: 'rgb(38,122,255,0.5)',
    G: 'rgb(73,73,73,0.5)',
    H: 'rgb(88,93,113,0.5)',
    I: 'rgb(251,123,101,0.8)',
    J: 'rgb(255,168,80,0.8)',
    K: 'rgb(233,188,90,0.8)',
    L: 'rgb(88,144,220,0.8)',
    M: 'rgb(87,191,219,0.8)',
    N: 'rgb(45,69,99,0.5)',
    O: 'rgb(165,64,184,0.5)',
    P: 'rgb(233,68,64,0.5)',
    Q: 'rgb(254,162,32,0.5)',
    R: 'rgb(76,167,80,0.5)',
    S: 'rgb(38,122,255,0.5)',
    T: 'rgb(73,73,73,0.5)',
    U: 'rgb(88,93,113,0.5)',
    V: 'rgb(251,123,101,0.8)',
    W: 'rgb(255,168,80,0.8)',
    X: 'rgb(233,188,90,0.8)',
    Y: 'rgb(88,144,220,0.8)',
    Z: 'rgb(87,191,219,0.8)',
    '+': 'rgb(189,189,189)',
};

export const roleColors = [
    '#2d4563', '#a540b8', '#e94440', '#fea220', '#4ca750',
    '#267aff', '#494949', '#585d71', '#fb7b65', '#ffa850',
    '#e9bc5a', '#5890dc', '#57bfdb',
];

export const pkgColors = {
    trial: colors.grayDim,
    save1: colors.red,
    normal: colors.blue,
    pro: colors.blueLight,
    super: colors.purple,
    customize: colors.blue,
    omi_start: colors.green,
    omi_lite: colors.blueDim,
    omi_pro: colors.purple,
    omi_business: colors.orange,
    omi_advance: colors.red,
};

export const cStyles = {
    textEllipsis: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexColCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPrimary: {
        fontFamily: fontFamilys.primary,
        color: textColors.primary,
    },
    noneUserSelect: {
        WebkitTouchCallout: 'none !important', /* iOS Safari */
        WebkitUserSelect: 'none !important', /* Safari */
        KhtmlUserSelect: 'none !important', /* Konqueror HTML */
        MozUserSelect: 'none !important', /* Firefox */
        MsUserSelect: 'none !important', /* Internet Explorer/Edge */
        userSelect: 'none !important', /* Non-prefixed version, currently supported by Chrome and Opera */
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    noClickOutlineHighlight: {
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        MsTouchAction: 'manipulation',
        touchAction: 'manipulation',
    },
    overlayAbsolute: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
};

const theme = createTheme({
    palette: {
        background: {
            default: '#fbfbfc',
            input: '#f5f6fa',
        },
        ...Object.fromEntries([
            ['#1e3150', 'primary'],
            ['#ff5955', 'error'],
            ['#fea220', 'warning'],
            ['#267aff', 'info'],
            ['#32b366', 'success'],
        ].map(([colorValue, colorName]) => [colorName, {
            main: colorValue,
            ...Object.fromEntries(Array.from({ length: 9 }).map((_, index) => [
                `${index + 1}00`, alpha(colorValue, (index + 1) / 10)
            ])),
        }])),
        text: {
            primary: '#1e3150',
            plh: 'rgba(39, 49, 80, 0.5)',
        },
    },
});

export default theme;