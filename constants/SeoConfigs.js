const webUrl = 'https://omicrm.vn/', previewUrl = `${webUrl}static/preview/`;

const defaultConfig = {
    title: `Giải pháp CRM toàn diện`,
    description: 'Tổng đài thông minh sử dụng trên điện toán đám mây(Cloudphone) nền tảng internet(VoIP) - nâng cao chất lượng cuộc gọi, quản lý khách hàng dễ dàng bằng CRM có sẵn',
    image: `${previewUrl}intro.png`,
    canonical: webUrl,
};

export default Object.freeze({
    'default': defaultConfig,
    '/': defaultConfig,
    '/introduce': {
        title: `Giới thiệu`,
        canonical: `${webUrl}introduce`,
    },
    '/omi-call': {
        title: `OMI Call`,
        canonical: `${webUrl}omi-call`,
    },
    '/pricing': {
        title: `Bảng giá`,
        canonical: `${webUrl}pricing`,
    },
});