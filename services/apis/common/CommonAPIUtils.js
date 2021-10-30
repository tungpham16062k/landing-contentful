import CommonAPIs from './CommonAPIs';

import { apiCommonRequest } from '@utils/ApiUtils';

export const apiGetAgencyInfo = (...args) => apiCommonRequest(CommonAPIs.getAgencyInfo, ...args);
export const apiGetCompanyInfo = (...args) => apiCommonRequest(CommonAPIs.getCompanyInfo, ...args);