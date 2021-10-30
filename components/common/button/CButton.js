import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getColor } from '@utils/StyleUtils';
import { replaceRoute, pushRoute } from '@utils/RouterUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import { Button } from '@mui/material';

import { Tooltip, ImageViewer } from '..';

const Adornment = ({ align, icon }) => {
    if (!icon) return null;
    return (
        <span className={align}>
            <ImageViewer {...icon} />
        </span>
    )
};

class CButton extends Component {

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
        const {
            classes, className, style,
            text, icon, startIcon, endIcon, size, fullWidth, truncate,
            outlined, circle, color, tooltip, disabled, href, target,
            ...otherProps
        } = this.props;
        let isLinkBtn = href && !disabled;
        let btnProps = {
            color,
            ...otherProps,
            ...(startIcon && { startIcon: <ImageViewer {...startIcon} /> }),
            ...(endIcon && { endIcon: <ImageViewer {...endIcon} /> }),
            style: {
                minWidth: 'unset',
                width: !circle && (fullWidth || isLinkBtn ? '100%' : (!truncate && 'fit-content')),
                ...style,
            },
            classes: {
                root: classNames(classes.button, size, className, {
                    'colorful': !!color,
                    'contained': !!color && !outlined,
                    'disabled': disabled,
                    'outlined': outlined,
                    'circle': circle,
                }),
            },
            variant: outlined && 'outlined' || color && 'contained' || '',
            ...(!href && { onClick: this.handleClick }),
        };
        let btnNode = (
            <Button {...btnProps}>
                <Adornment align={'left'} {...startIcon} />
                {icon && <ImageViewer {...icon} /> || <span className={'text'}>{text}</span>}
                <Adornment align={'right'} {...endIcon} />
            </Button>
        );
        if (isLinkBtn) {
            let linkProps = {
                href,
                className: classes.link,
                ...(target === 'new' && { target: '_blank' }),
                onClick: this.handleClick,
            };
            btnNode = <a {...linkProps}>{btnNode}</a>;
        }
        return tooltip ? <Tooltip {...tooltip}>{btnNode}</Tooltip> : btnNode;
    }

}

CButton.defaultProps = {
    size: 'medium',
    target: 'new',
    onClick: () => null,
};

CButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    tooltip: PropTypes.any,
    disabled: PropTypes.bool,
    outlined: PropTypes.bool,
    circle: PropTypes.bool,
    fullWidth: PropTypes.bool,
    truncate: PropTypes.bool,
    className: PropTypes.any,
    style: PropTypes.any,
    href: PropTypes.string,
    icon: PropTypes.any,
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    target: PropTypes.oneOf(['new', 'replace', 'push']),
    onClick: PropTypes.func,
};

export default withStyles(styles)(CButton);