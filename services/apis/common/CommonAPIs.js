import { doRequest } from '@utils/CoreUtils';

import { domains } from '@constants/index';

export default Object.freeze({
    getAgencyInfo: (domain) => {
        let url = `${domains.tenant}agency_info/`;
        if (domain) url += `?domain=${domain}`;
        return doRequest('get', url);
    },
    getCompanyInfo: ({ domain, limit }) => {
        let url = `${domains.tenant}tenant/get_by_domain/${domain}`;
        if (limit) url = `${domains.tenant}tenant/get_public_data_by_domain/${domain}`;
        return doRequest('get', url);
    },
    getCompanyServicePackage: (options) => {
        let url = `${domains.tenant}service_package_tenant/get_by_tenant`;
        return doRequest('get', url, options);
    },
    getAllEmployee: (sourceEmployeeId) => {
        let url = `${domains.contactSearch}get_all_agent/no_role/${sourceEmployeeId}?has_sip_user=true`;
        return doRequest('get', url, { noTimeout: true });
    },
    getEmployeeViewableIds: (sourceEmployeeId) => {
        let url = `${domains.contact}list_viewable_true/${sourceEmployeeId}`;
        return doRequest('get', url, { noTimeout: true });
    },
    getAgentUiConfigs: (options) => {
        let url = `${domains.agent}agent/ui_config`;
        return doRequest('get', url, options);
    },
    getTenantConfig: () => {
        let url = `${domains.tenant}tenant_config/get_by_tenant`;
        return doRequest('get', url);
    },
    getNationConfig: () => {
        let url = `${domains.tenant}tenant/get_nation_config`;
        return doRequest('get', url);
    },
});