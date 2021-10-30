import { WEB_PORT } from './Configs';

const localPath = `localhost:${WEB_PORT}`, minio = 'https://cdn.omicrm.com/';

export default Object.freeze({
    // base
    defaultSubDomain: 'landing',
    localPath, localRedirect: `http://landing.app.${localPath}`,
    minio, uploadFile: `${minio}crm/`,
    // service api
    ai: 'https://ai-v1-stg.omicrm.com/',
    admin: 'https://admin-v1-stg.omicrm.com/',
    agent: 'https://agent-v1-stg.omicrm.com/',
    auth: 'https://auth-v1-stg.omicrm.com/',
    autocall: 'https://autocall-v1-stg.omicrm.com/',
    campaign: 'https://campaign-v1-stg.omicrm.com/',
    campaignForm: 'https://campaign-v1-stg.omicrm.com/form/',
    cdr: 'https://cdr-v1-stg.omicrm.com/',
    common: 'https://common-v1-stg.omicrm.com/',
    contact: 'https://contact-v1-stg.omicrm.com/',
    contactImport: 'https://contact-import-v1-stg.omicrm.com/',
    contactSearch: 'https://contact-search-v1-stg.omicrm.com/',
    contactInteractive: 'https://contact-v1-stg.omicrm.com/interactive/',
    email: 'https://email-v1-stg.omicrm.com/',
    facebook: 'https://graph.facebook.com/',
    filestore: 'https://filestore-v1-stg.omicrm.com/',
    internal: 'https://internal-v1-stg.omicrm.com/',
    meeting: 'https://meeting-v1-stg.omicrm.com/',
    pbx: 'https://pbx-v1-stg.omicrm.com/',
    public: 'https://public-v1-stg.omicrm.com/',
    push: 'https://push-v1-stg.omicrm.com/',
    report: 'https://report-v1-stg.omicrm.com/',
    searching: 'https://mbdata-v1-stg.omicrm.com/',
    sms: 'https://sms-v1-stg.omicrm.com/',
    socialNetwork: 'https://social-network-v1-stg.omicrm.com/',
    sourceContact: 'https://source-contact-v1-stg.omicrm.com/',
    sourceContactLayout: 'https://source-contact-v1-stg.omicrm.com/layout/',
    tenant: 'https://tenant-v1-stg.omicrm.com/',
    ticket: 'https://ticket-v1-stg.omicrm.com/',
    transaction: 'https://transaction-v1-stg.omicrm.com/',
    webhook: 'https://third-party-webhook-v1-stg.omicrm.com/',
    zaloOa: 'https://oauth.zaloapp.com/v3/oa/permission',
    zaloOpenAPI: 'https://openapi.zalo.me/v2.0/',
});