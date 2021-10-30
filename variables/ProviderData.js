import { i18nText } from '@utils/StringUtils';

export const telephoneProviders = [
    // vn
    ['viettel', [['32|33|34|35|36|37|38|39|86|96|97|98', 7], ['162|163|164|165|166|167|168|169', 7]]],
    ['mobifone', [['70|76|77|78|79|89|90|93', 7], ['120|121|122|126|128', 7]]],
    ['vinaphone', [['81|82|83|84|85|88|91|94', 7], ['123|124|125|127|129', 7]]],
    ['vietnamobile', [['52|56|58|92', 7], ['186|188', 7]]],
    ['gmobile', [['59|99', 7], ['199', 7]]],
    ['reddi', [['55', 7]]],
    // kh
    ['cellcard', [['12|76', 7], ['11|12|14|17|235|61|77|78|79|85|89|92|95|99', 6]]],
    ['cootel', [['38', 7]]],
    ['emaxx', [['39', 7]]],
    ['seatel', [['18', 7]]],
    ['metfone', [['31|71|88|97', 7], ['236|60|66|67|68|90', 6]]],
    ['qb', [['13|80|83|84', 6]]],
    ['smart', [['96', 7], ['10|15|16|69|70|81|86|87|93|98', 6]]],
    // mm
    ['telenor', [['977|978|979', 7]]],
    ['ooredoo', [['996|997', 7]]],
    ['mytel', [['96', 9]]],
    ['mpt', [['92|94|95|96', 8], ['92|94|95|96', 7], ['92|94|95|96', 6], ['973|991', 7], ['973|991', 6], ['973|991', 5]]],
    // cn
    // ['chinamobile', [['135|136|137|138|139|147|148|150|151|152|157|158|159|182|183|184|187|188|198', 8], ['1340|1341|1342|1343|1344|1345|1346|1347|1348|1440|1703|1705|1706', 7]]],
    // ['chinatelecom', [['133|153|173|177|180|181|189|191|199', 8], ['1700|1701|1702', 7]]],
    // ['chinayietong', [['123', 8]]],
    // ['chinaunicom', [['130|131|132|145|155|156|166|167|171|176|185|186', 8], ['1704|1707|1708|1709', 7]]],
    // ['chinahongkongtelecom', [['6', 7], ['51|52|53|54|55|56|59|90|91|92|93|94|95|96|97|98', 6]]],
].map(i => [i[0], i[1].map(j => new RegExp(`^(${j[0].split('|').map(k => '0' + k).join('|')})+\\d{${j[1]}}$`))]);

export const vnTelProviders = ['viettel', 'mobifone', 'vinaphone', 'vietnamobile', 'gmobile', 'reddi'];

const provider_name = {
    // vn
    'vinaphone': 'Vinaphone',
    'viettel': 'Viettel',
    'vietnammobile': 'Vietnamobile',
    'mobifone': 'Mobifone',
    'cmc': 'CMC Telecom',
    'gmobile': 'Gmobile',
    'gfone': 'Gfone',
    'gvoice': 'Gvoice',
    'senbac': 'Senbac',
    'itel': 'Itelecom',
    'cgv': 'CGV Telecom',
    'vtc': 'VTC Telecom',
    'spt': 'SPT Telecom',
    'southtelecom': 'South Telecom',
    // kh
    'metfone': 'Metfone',
    'cellcard': 'Cellcard',
    'cootel': 'Cootel',
    'kingtel': 'Kingtel',
    'qb': 'Qb',
    'seatel': 'Seatel',
    'smart': 'Smart',
    'emaxx': 'Emaxx',
    'fixed': i18nText('sip_number_type.fixed'),
    // mm
    'mytel': 'Mytel',
};

const providerLogos = {
    // other
    'random': require('@assets/icons/call-provider/logo_random_number.png'),
    'zalo': require('@assets/images/common/logo_zalo.png'),
    'brandname': require('@assets/icons/common/ic_fluent_ok.svg'),
    // vn
    'vinaphone': require('@assets/icons/call-provider/vn/logo_vinaphone.png'),
    'viettel': require('@assets/icons/call-provider/vn/logo_viettel.png'),
    'vietnammobile': require('@assets/icons/call-provider/vn/logo_vietnamobile.png'),
    'mobifone': require('@assets/icons/call-provider/vn/logo_mobifone.png'),
    'cmc': require('@assets/icons/call-provider/vn/logo_cmc_telecom.png'),
    'cmctelecom': require('@assets/icons/call-provider/vn/logo_cmc_telecom.png'),
    'fpt': require('@assets/icons/call-provider/vn/logo_fpt_telecom.png'),
    'gconnect': require('@assets/icons/call-provider/vn/logo_gmobile.png'),
    'gmobile': require('@assets/icons/call-provider/vn/logo_gmobile.png'),
    'gfone': require('@assets/icons/call-provider/vn/logo_gmobile.png'),
    'gvoice': require('@assets/icons/call-provider/vn/logo_gmobile.png'),
    'senbac': require('@assets/icons/call-provider/vn/logo_senbac.png'),
    'itel': require('@assets/icons/call-provider/vn/logo_itel.png'),
    'cgv': require('@assets/icons/call-provider/vn/logo_cgv.png'),
    'vcc': require('@assets/icons/call-provider/vn/logo_vcc.png'),
    'vtc': require('@assets/icons/call-provider/vn/logo_vtctelecom.png'),
    'spt': require('@assets/icons/call-provider/vn/logo_spt.png'),
    'southtelecom': require('@assets/icons/call-provider/vn/logo_southtelecom.png'),
    // kh
    'metfone': require('@assets/icons/call-provider/kh/logo_metfone.png'),
    'cellcard': require('@assets/icons/call-provider/kh/logo_cellcard.png'),
    'cootel': require('@assets/icons/call-provider/kh/logo_cootel.png'),
    'kingtel': require('@assets/icons/call-provider/kh/logo_kingtel.png'),
    'qb': require('@assets/icons/call-provider/kh/logo_qb.png'),
    'seatel': require('@assets/icons/call-provider/kh/logo_seatel.png'),
    'smart': require('@assets/icons/call-provider/kh/logo_smart.png'),
    'vos': require('@assets/icons/call-provider/kh/logo_vos.png'),
    'tollfree': require('@assets/icons/call-provider/kh/logo_tollfree.png'),
    // mm
    'mytel': require('@assets/icons/call-provider/mm/logo_mytel.png'),
    'mpt': require('@assets/icons/call-provider/mm/logo_mpt.png'),
    'ord': require('@assets/icons/call-provider/mm/logo_ooredoo.png'),
    'tele': require('@assets/icons/call-provider/mm/logo_telenor.png'),
};

const defaultProviderLogo = require('@assets/icons/call-provider/logo_not_found.png');

const networkProviders = [
    // vn
    {
        value: 'fpt',
        label: 'FPT Telecom',
    },
    {
        value: 'cmc',
        label: 'CMC Telecom',
    },
    {
        value: 'viettel',
        label: 'Viettel',
    },
    {
        value: 'vinaphone',
        label: 'Vinaphone',
    },
    {
        value: 'mobifone',
        label: 'Mobifone',
    },
    {
        value: 'gvoice',
        label: 'GVoice',
    },
    {
        value: 'itel',
        label: 'Itelecom',
    },
    {
        value: 'cgv',
        label: 'CGV Telecom',
    },
    {
        value: 'vtc',
        label: 'VTC Telecom',
    },
    {
        value: 'spt',
        label: 'SPT Telecom',
    },
    {
        value: 'southtelecom',
        label: 'South Telecom',
    },
    // kh
    {
        value: 'gfone',
        label: 'GFone',
    },
    {
        value: 'metfone',
        label: 'Metfone',
    },
    // mm
    {
        value: 'mytel',
        label: 'Mytel',
    },
];

const filterProviderOptions = {
    vn: [
        {
            value: 'fpt',
            label: 'FPT Telecom',
        },
        {
            value: 'cmc',
            label: 'CMC Telecom',
        },
        {
            value: 'viettel',
            label: 'Viettel',
        },
        {
            value: 'vinaphone',
            label: 'Vinaphone',
        },
        {
            value: 'mobifone',
            label: 'Mobifone',
        },
        {
            value: 'gvoice',
            label: 'GVoice',
        },
        {
            value: 'itel',
            label: 'Itelecom',
        },
        {
            value: 'cgv',
            label: 'CGV Telecom',
        },
        {
            value: 'vtc',
            label: 'VTC Telecom',
        },
        {
            value: 'spt',
            label: 'SPT Telecom',
        },
        {
            value: 'southtelecom',
            label: 'South Telecom',
        },
    ],
    kh: [
        {
            value: 'gfone',
            label: 'GFone',
        },
        {
            value: 'metfone',
            label: 'Metfone',
        },
    ],
    mm: [
        {
            value: 'mytel',
            label: 'Mytel',
        },
    ],
};

const smsProviders = [
    {
        id: 'esms', key: 'ESMS', name: 'eSMS',
    },
    {
        id: 'vmg', key: 'VMG', name: 'VMG',
    },
    {
        id: 'mytel', key: 'MYTEL', name: 'Mytel',
    },
    {
        id: 'speedsms', key: 'SPEEDSMS', name: 'SpeedSMS',
    },
    {
        id: 'simo', key: 'SIMO', name: 'Simo',
    },
];

const providerInfos = [
    // vn
    {
        name: 'Vinaphone',
        logo: 'vinaphone',
        prefixs: ['vinaphone']
    },
    {
        name: 'Mobifone',
        logo: 'mobifone',
        prefixs: ['mobifone']
    },
    {
        name: 'Viettel',
        logo: 'viettel',
        prefixs: ['viettel']
    },
    {
        name: 'Gmobile',
        logo: 'gmobile',
        prefixs: ['gfone', 'gvoice', 'gconnect']
    },
    {
        name: i18nText('sip_1900'),
        logo: 'prefix_1900',
        prefixs: ['prefix_1900']
    },
    {
        name: i18nText('prefix_1800'),
        logo: 'prefix_1800',
        prefixs: ['prefix_1800']
    },
    {
        name: 'CMC Telecom',
        logo: 'cmc',
        prefixs: ['cmc'],
    },
    {
        name: 'VNPT Cloud Contact Center',
        logo: 'vcc',
        prefixs: ['vcc']
    },
    {
        name: 'FPT',
        logo: 'fpt',
        prefixs: ['fpt']
    },
    {
        name: 'SPT Telecom',
        logo: 'spt',
        prefixs: ['spt']
    },
    {
        name: 'South Telecom',
        logo: 'southtelecom',
        prefixs: ['southtelecom']
    },
    // kh
    {
        name: 'Smart',
        logo: 'smart',
        prefixs: ['smart']
    },
    {
        name: 'Cellcard',
        logo: 'cellcard',
        prefixs: ['cellcard']
    },
    {
        name: 'Cootel',
        logo: 'cootel',
        prefixs: ['cootel']
    },
    {
        name: 'Seatel',
        logo: 'seatel',
        prefixs: ['seatel']
    },
    {
        name: 'Metfone',
        logo: 'metfone',
        prefixs: ['metfone']
    },
    {
        name: 'Qb',
        logo: 'qb',
        prefixs: ['qb']
    },
    {
        name: 'Kingtel',
        logo: 'kingtel',
        prefixs: ['kingtel']
    },
    {
        name: 'VOS',
        logo: 'vos',
        prefixs: ['vos']
    },
    {
        name: 'TOLLFREE',
        logo: 'tollfree',
        prefixs: ['tollfree']
    },
    // mm
    {
        name: 'Mytel',
        logo: 'mytel',
        prefixs: ['mytel']
    },
    {
        name: 'Telenor',
        logo: 'telenor',
        prefixs: ['telenor']
    },
    {
        name: 'Ooredoo',
        logo: 'ooredoo',
        prefixs: ['ooredoo']
    },
    {
        name: 'MPT',
        logo: 'mpt',
        prefixs: ['mpt']
    },
    {
        name: 'Itelecom',
        logo: 'itel',
        prefixs: ['itel']
    },
    {
        name: 'Ezcall',
        logo: 'ezcall',
        prefixs: ['ezcall']
    },
];

export {
    provider_name,
    providerLogos,
    defaultProviderLogo,
    networkProviders,
    filterProviderOptions,
    smsProviders,
    providerInfos,
};