export const WEB_PORT = 3000;
export const requestApiTimeout = 60000;
export const sourceVersion = 31;
export const defaultCallHistoryCreator = 'create_default_by_tenant';
export const minimumCallOutBalance = { 'VND': 1000, 'USD': 0.045 };
export const randomSipNumber = '1100039';
export const omiHotline = '0844441909';
export const tinyMCEApiKey = 'wdmfl1ceihw9lm06k7wins38khbii8ldtarit2bx44ptvjnd';
export const maxPhoneNumberLength = 24;

export const whiteListTenantIds = [
    '5d43bcd7f2706f00070d6b10', // viethq@vihat.vn
    '5d5df9d34e3ac700070ed510', // admin@spam4.me
    '5da687c8d8a69400080322c5', // dinhthaiha@vihat.vn
    '5da7e816fd09d40007e96b47', // khoanna@vihat.vn
    '5dfc302823866e0007e59c4e', // viethq@vihatgroup.com
    '5db7f1e6540c4400070af5e1', // a.Trung
    '5e32379135650e000778a1cf', // buianhthu130197@gmail.com
    '5d8ae7f110cf480007ba8709', // truongnt7@viettel.com.vn
    '5d941609dac068000758bcd3', // hanhttm@vihat.vn
    '5e6b44356ff46300074af94e', // ducnt3@apaxleaders.edu.vn
    '5e60b673aa8f1e000762de3f', // support@omicrm.com
    '5d390e202f50150007cbc40a', // trungnt@vihatgroup.com
    // '5da960e3f15b360007a1e7e6', // anhkhoa19091995@gmail.com // tạm bỏ qua
    '5cbfc17a580dd80007ffc32a', // dinhthaiha@vihat.vn
    '5fd71fae1edb1f1e5d250374', // testquyen12
    '5d5519d7a868f60007c0b5cf', // tanmyblog@gmail.com
];

export const cookieProps = {
    get: {
        '0': 'sourceVersion',
        '1': 'curLng',
        '2': 'access_token',
        '3': 'refresh_token',
        '5': 'login_email',
        '6': 'is_recent_login',
        '7': 'is_force_change_password',
        '8': 'created_date',
        '9': 'origin',
        '10': 'sid',
        '11': 'domain',
        '12': 'roll2Text',
    },
    set: {
        'sourceVersion': '0',
        'curLng': '1',
        'access_token': '2',
        'refresh_token': '3',
        'login_email': '5',
        'is_recent_login': '6',
        'is_force_change_password': '7',
        'created_date': '8',
        'origin': '9',
        'sid': '10',
        'domain': '11',
        'roll2Text': '12',
    },
};

export const socketConfig = {
    thirdParty: 'https://third-party-socket-v1-stg.omicrm.com/',
    meeting: 'https://meeting-socket-v1-stg.omicrm.com/',
    option: { transports: ['websocket'] },
};

export const defaultCallConfigs = [
    { is_common: false, id: 'call_out_by_network', },
    { is_common: false, id: 'random_number_call_out' },
    { is_common: true, id: 'auto_play_lzc_inbound', },
    { is_common: true, id: 'auto_play_lzc_outbound' },
    { is_common: true, id: 'click2call' },
];

export const socialConfig = {
    widget: {
        script: 'https://cdn.omicrm.com/widget/main.js',
    },
    facebook: {
        version: '11.0',
        appId: '343658810263925',
        appSecret: 'ce03b90547e9d2aa270ddee0b2795cc0',
        fields: 'name,email,picture',
        scope: 'pages_manage_ads,pages_manage_metadata,pages_read_engagement,pages_read_user_content,pages_manage_posts,pages_manage_engagement,pages_messaging',
    },
    zalo: {
        appId: '3360369942593087475',
    },
};

export const omiDocUrls = {
    hubspot: 'https://docs.omicrm.com/khac/partner/hubspot',
    kiot_viet: 'https://docs.omicrm.com/khac/partner/kiotviet',
    one_office: 'https://docs.omicrm.com/khac/partner/1office',
    nhanh_vn: 'https://docs.omicrm.com/khac/partner',
    getfly_crm: 'https://docs.omicrm.com/khac/partner/getfly',
    hqrentals: 'https://docs.omicrm.com/khac/partner',
    tutorialIntegrated: 'https://docs.omicrm.com/khac/partner',
    poorCallConnection: 'https://docs.omicrm.com/tro-giup/cac-loi-tong-dai-thuong-gap-va-cach-khac-phuc/chat-luong-cuoc-goi-cua-toi-khong-tot',
    omicallApi: 'https://api.omicall.com/omicall-api/overview',
    webSdk: 'https://api.omicall.com/web-sdk/overview',
    webhooks: 'https://api.omicall.com/webhooks/overview',
    ipphoneGuide: 'https://docs.omicrm.com/huong-dan/huong-dan-dang-nhap-ip-phone',
    softphoneGuide: 'https://docs.omicrm.com/huong-dan/huong-dan-dang-nhap-softphone',
    widgetGuide: 'https://docs.omicrm.com/huong-dan/tich-hop-live-talk',
    partnerIntegrateGuide: 'https://vihatcrm.gitbook.io/omicall-',
};

export const validAudioCodecs = {
    default: ['g711', 'pcma', 'pcmu', 'transport-cc', 'telephone-event'],
    // default: { payload: 9, codec: 'G722', rate: 8000 },
    // slow: ['g729', 'g7221', 'g722', 'pcma', 'pcmu', 'gsm', 'transport-cc', 'telephone-event'],
    // hight: ['pcma', 'pcmu', 'g729', 'g7221', 'g722', 'gsm', 'transport-cc', 'telephone-event'],
};

export const popperModifiers = { // fix blurry text in popper
    computeStyle: {
        inner: { enabled: true },
        gpuAcceleration: false,
    },
    preventOverflow: {
        enabled: false,
        padding: 0
    },
    hide: {
        enabled: false
    },
};

export const iceServers = [
    { urls: 'stun:vn.omicrm.com:3478' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
        urls: 'turn:125.212.248.52:2222?transport=tcp',
        username: 'vihat', credential: '834610100',
    },
    {
        urls: 'turn:27.71.233.169:2222?transport=tcp',
        username: 'vihat', credential: '834610100',
    },
];

export const domainConfigs = [
    {
        id: 'omi',
        domains: ['omicall.com', 'omicrm.com', 'omicrm.dev'],
    },
    {
        id: 'izzi',
        domains: ['izzicrm.com'],
    },
    {
        id: 'fcalls',
        domains: ['fcalls.net'],
        config: {
            hideFooterInfo: true,
        },
    },
    {
        id: 'viettelcorp',
        domains: ['ipcc.viettelcorp.net'],
    },
    {
        id: 'tmscall',
        domains: ['tmscall.com'],
    },
    {
        id: 'fpt',
        domains: ['billing-mobilesip.com'],
    },
    // {
    //     id: 'moticall',
    //     domains: ['moticall.vn'],
    // },
    {
        id: 'omnicloud',
        domains: ['omnicloud.vn'],
    },
    {
        id: 'metfone',
        domains: ['metfone.com.kh'], // crm
    },
    {
        id: 'senbac',
        domains: ['senbac.com'], // vpbx
    },
];

export const omiStgDomain = ['omicrm.com', 'omicall.com', 'omicrm.dev'];

export const mobileAppStores = {
    android: 'https://play.google.com/store/apps/details?id=',
    ios: 'https://apps.apple.com/us/app/',
};

export const thirdPartyApps = Object.fromEntries([
    ['zoiper', 'Zoiper', 'com.zoiper.android.zoiperbeta.app', 'zoiper-lite-voip-soft-phone/id438949960'],
    ['grandstream', 'Grandstream Wave', 'com.grandstream.wave', 'grandstream-wave/id1029274043'],
].map(infos => [infos[0], {
    name: infos[1],
    android: `https://play.google.com/store/apps/details?id=${infos[2]}`,
    ios: `https://apps.apple.com/us/app/${infos[3]}`,
}]));