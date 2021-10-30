import { useMemo, useEffect } from 'react';

import ApiMgr from '@cores/ApiMgr';

const apiInstance = ApiMgr.getInstance();

export const doRequest = (...args) => apiInstance.doRequest(...args);
export const simpleRequest = (...args) => apiInstance.simpleRequest(...args);
export const fetchRequest = (...args) => apiInstance.fetchRequest(...args);
export const cancelRequest = (...args) => apiInstance.cancelRequest(...args);

export const parsePagination = (payload) => {
    const { page, has_next, hasNext, has_previous, hasPrevious, next_page, nextPage, page_number, pageNumber, page_size, pageSize, previous_page, previousPage, total_items, totalItems, total_pages, totalPages } = payload || {};
    return {
        page: page || 1,
        has_next: !!(has_next || hasNext),
        has_previous: !!(has_previous || hasPrevious),
        next_page: next_page || nextPage || 0,
        page_number: page_number || pageNumber || 0,
        page_size: page_size || pageSize || 15,
        previous_page: previous_page || previousPage || 0,
        total_items: total_items || totalItems || 0,
        total_pages: total_pages || totalPages || 1,
    };
};

export const asyncSetState = (_this, state) => new Promise((resolve) => _this.setState(state, () => resolve()));

export const getComponentDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const useMounted = () => {
    const mounted = useMemo(() => ({ current: true }), []);
    useEffect(() => {
        return () => { mounted.current = false }
    }, [mounted]);
    return mounted;
};