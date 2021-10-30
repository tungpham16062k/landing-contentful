import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getClassName } from '@utils/StyleUtils';

import { withStyles } from '@mui/styles';
import { styles } from './styles';

import { Tooltip } from '@mui/material';

const availablePlacements = ['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'];

class CustomTooltip extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this._mounted = true;
    }

    componentWillUnmount() { this._mounted = false; }

    componentDidUpdate(prevProps) {
        const { title, delayAfterChange } = this.props;
        if (delayAfterChange && title !== prevProps.title) {
            clearInterval(this.delayAfterChangeTimer);
            this.setState({ forceHide: true });
            this.delayAfterChangeTimer = setTimeout(() => this._mounted && this.setState({ forceHide: false }), delayAfterChange);
        }
    }

    render() {
        const { forceHide } = this.state;
        const { classes, children, title, placement, noneWrap, center, className, Comp, style, hidden, arrow } = this.props;
        if (!children) { return null; }
        if (!title && !Comp) { return children; }
        const ttClass = classNames(classes.tooltip, {
            [classes.noMaxWidth]: !!Comp || noneWrap,
            [classes.center]: center,
        }, getClassName(style), className);
        const ttProps = {
            arrow,
            title: Comp || title,
            placement: placement || 'top',
            classes: { popper: classNames(classes.popper, { 'hidden': forceHide || hidden }), tooltip: ttClass },
        };
        return (<Tooltip {...ttProps}>{children}</Tooltip>);
    }

}

CustomTooltip.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placement: PropTypes.oneOf(availablePlacements),
    noneWrap: PropTypes.bool,
    center: PropTypes.bool,
    hidden: PropTypes.bool,
    className: PropTypes.any,
    delayAfterChange: PropTypes.number,
};

export default withStyles(styles)(CustomTooltip);