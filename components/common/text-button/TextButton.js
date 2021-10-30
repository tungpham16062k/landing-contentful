import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getColor } from '@utils/StyleUtils';
import { replaceRoute, pushRoute } from '@utils/RouterUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import Tooltip from '../tooltip/Tooltip';

class TextButton extends Component {

    handleClick = (event) => {
        const { disabled, href, target } = this.props;
        if (!disabled) {
            if (href) {
                switch (target) {
                    case 'replace': replaceRoute(href, { event }); break;
                    case 'push': pushRoute(href, { event }); break;
                    default: window.open(href, target); break;
                }
            } else {
                this.props.onClick(event);
            }
        }
    }

    render() {
        const { classes, className, style, text, color, tooltip, disabled, href, target, noUnderline } = this.props;
        if (!text) return null;
        let isLinkBtn = href && !disabled, btnClassName = classNames(classes.text, className, { ['disabled']: disabled });
        let txtProps = {
            style: { ...(color && { color: getColor(color) }), ...style },
            className: !isLinkBtn && btnClassName || '',
            ...(!href && { onClick: this.handleClick }),
        };
        let btnNode = <span {...txtProps}>{text}</span>;
        if (isLinkBtn) {
            let linkProps = {
                href,
                className: btnClassName,
                ...(target === 'new' && { target: '_blank' }),
                ...(noUnderline && { style: { textDecoration: 'none' } }),
                onClick: this.handleClick,
            };
            btnNode = <a {...linkProps}>{btnNode}</a>;
        }
        if (tooltip) { return <Tooltip {...tooltip}>{btnNode}</Tooltip>; }
        return btnNode;
    }
}

TextButton.defaultProps = {
    target: 'new',
    onClick: () => null,
};

TextButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    tooltip: PropTypes.any,
    disabled: PropTypes.bool,
    className: PropTypes.any,
    style: PropTypes.any,
    href: PropTypes.string,
    target: PropTypes.oneOf(['new', 'replace', 'push']),
    onClick: PropTypes.func,
    noUnderline: PropTypes.bool,
};

export default withStyles(styles)(TextButton);