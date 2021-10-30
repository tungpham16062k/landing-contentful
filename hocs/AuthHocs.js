import React from 'react';

import { getComponentDisplayName } from '@utils/CoreUtils';
import { encodeURIComp, replaceRoute, isCommonRoute } from '@utils/RouterUtils';
import { isValidAuth } from '@utils/CookieUtils';

const withAuth = (forceCheck) => WrappedComponent => {
    class AuthHocs extends React.Component {
        constructor(props) {
            super(props);
            this.state = { finishValidate: forceCheck ? false : isCommonRoute() };
            this._mounted = true;
        }
        componentDidMount() {
            const { finishValidate } = this.state;
            if (!finishValidate) {
                if (isValidAuth()) {
                    if (this._mounted) this.setState({ finishValidate: true });
                } else {
                    let { pathname, search } = window.location;
                    if (pathname !== '/') { pathname = `/?redirect=${encodeURIComp(pathname + search)}`; }
                    replaceRoute(pathname);
                }
            }
        }
        componentWillUnmount() { this._mounted = false; }
        render() {
            const { finishValidate } = this.state;
            if (!finishValidate) return null;
            return <WrappedComponent {...this.props} />;
        }
    }
    AuthHocs.displayName = `WithI18n(${getComponentDisplayName(WrappedComponent)})`;
    return AuthHocs;
}

export default withAuth;