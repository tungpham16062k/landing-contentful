import React, { Component } from 'react';

import { getI18n, getI18nLng, onI18nChangeLng, rmI18nChangeLng, getI18nLeadedLng, setI18nLeadedLng } from '@libs/i18n';

import { getComponentDisplayName } from '@utils/CoreUtils';

const withI18n = (inputLng) => WrappedComponent => {
    const WrappedComponentName = getComponentDisplayName(WrappedComponent);
    class I18nHocs extends Component {
        constructor(props) {
            super(props);
            this.sessionId = WrappedComponentName + '-' + (+new Date() + Math.random());
            this.lngs = getI18nLeadedLng(inputLng);
            this._mounted = true;
            this.state = { lng: getI18nLng(), lngReady: !inputLng || (!!inputLng && !!this.lngs) };
        }
        componentDidMount() {
            const { lngReady } = this.state;
            if (!lngReady) {
                import(`@libs/i18n/lngs/${inputLng}`).then(imported => {
                    if (!this._mounted) return;
                    this.lngs = imported.default;
                    this.setState({ lngReady: true });
                    setI18nLeadedLng(inputLng, this.lngs);
                });
            }
            onI18nChangeLng(this.sessionId, lng => this.setState({ lng }));
        }
        componentWillUnmount() {
            this._mounted = false;
            rmI18nChangeLng(this.sessionId);
        }
        render() {
            const { lngReady } = this.state;
            if (!lngReady) return null;
            return <WrappedComponent {...this.props} i18n={getI18n(this.lngs)} />;
        }
    }
    I18nHocs.displayName = `WithI18n(${WrappedComponentName})`;
    return I18nHocs;
}

export default withI18n;