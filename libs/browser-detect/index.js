export default {
    parse: () => {
        /* parse userAgent info */
        let ua = window.navigator.userAgent;
        let [isIOS, isAndroid] = [/iPhone|iPad|iPod/i, /Android/i].map(i => i.test(ua));
        let isMobile = isIOS || isAndroid || /Mobi/i.test(ua);
        let info = { name: 'Unknow', version: 'unknow', system: ua.split(/[()]/)[1], isAndroid, isIOS, ua };
        let browserMatchs = [
            /* other */
            ['Silk', 'Silk', { v: 0 }],
            ['Amigo', 'Amigo'],
            ['Brave', 'Brave', { o: 'Chrome' }],
            [['KaiOS'], 'KAIOS'],
            [['UC'], 'UCBrowser', { v: 0 }],
            [['QQ'], 'QQBrowser', { v: 0 }],
            ['Maxthon', 'Maxthon', { o: 'MSIE' }],
            ['Pale Moon', 'PaleMoon'],
            [['Yaani'], 'YaaniBrowser'],
            [['Yandex'], 'YaBrowser', { v: 0 }],
            [['WebOS'], 'wOSBrowser'],
            [['Vivo'], 'VivoBrowser'],
            [['Samsung'], 'SamsungBrowser'],
            [['Internet TV'], 'InettvBrowser'],
            [['Qwant'], 'QwantiOS|QwantMobile|QwantBrowser'],
            [['BlackBerry'], 'BlackBerry|BB10|BBB100-1'],
            /* opera */
            ['Vivaldi', 'Vivaldi'],
            ['Opera Touch', 'OPT'],
            ['Opera Mini', 'Opera Mini'],
            ['Opera GX', 'OPRGX'],
            ['Opera', 'OPR|Opera'],
            /* edge */
            ['Edge Client', 'EdgeClient'],
            ['Microsoft Edge', 'EdgA|Edge|Edg'],
            /* IE */
            ['IE 11', 'Trident', { p: 'MSIE' }], /* ưu tiên 'MSIE' */
            ['IE 10', 'MSIE'],
            /* firefox */
            ['Waterfox', 'Waterfox', { o: 'Firefox' }],
            ['SeaMonkey', 'SeaMonkey'],
            ['Firefox', 'Firefox'],
            /* vn */
            ['Coc Coc', 'coc_coc_browser'],
            ['SFive', 'SFive'],
            /* chrome */
            ['Chromium', 'Chromium'],
            ['Chrome', 'Chrome'],
            /* safari */
            ['Safari', ['Safari', isIOS || /Macintosh/i.test(ua)]],
            /* android */
            [['Android'], 'Safari|Android'],
        ];
        let [browserName = 'Unknown', browserMatch, browserVersion = {}] = browserMatchs.find(i => {
            let match = i[1], multi = Array.isArray(match), regx = (new RegExp(multi ? match[0] : match, 'i')).test(ua);
            return multi ? regx && match[1] : regx;
        }) || [];
        info.name = browserName;
        if (browserMatch) {
            if (Array.isArray(browserMatch)) browserMatch = browserMatch[0];
            let { v = 1, o, p } = browserVersion, versionIdx, versionFinds = browserMatch.split('|'), getVersionFindBreak = (findName) => findName === 'MSIE' ? ' ' : '/';
            if (p) versionFinds.unshift(p);
            if (o) versionFinds.push(o);
            if (v) versionFinds.unshift('Version');
            let versoionFind = versionFinds.find(i => { versionIdx = ua.indexOf(i + getVersionFindBreak(i)); return versionIdx > -1; });
            info.name = Array.isArray(browserName) ? browserName[0] + ' Browser' : browserName;
            info.version = ua.substring(versionIdx).split(new RegExp(versoionFind + getVersionFindBreak(versoionFind) + '|;|\\)| ', 'i'))[1];
        }
        let isFirefox = browserName === 'Firefox', isSafari = browserName === 'Safari';
        return {
            isMobile,
            isIOS,
            isSafari,
            isFirefox,
            device: isMobile ? 'mobile' : 'desktop',
            info,
            platform: ua.split(' (')[1].split(') ')[0],
        };
    }
}