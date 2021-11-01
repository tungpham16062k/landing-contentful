import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

import { isNumber } from '@utils/Utils';
import { getSvgStyle, getClassName, getColor } from '@utils/StyleUtils';

import { cStyles, imgSizes } from '@styles/theme';

import defaultSrc from '@assets/images/common/img_error.png';

class ImageViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            src: props.src?.default,
            isError: false,
        };
        this._mounted = true;
    }

    componentDidUpdate(prevProps) {
        const { src } = this.props;
        if (src !== prevProps.src) {
            this.injectFailed = false;
            this.setState({ src: src?.default, isError: false });
        }
    }

    componentWillUnmount() { this._mounted = false; }

    handleError = () => {
        const { isError } = this.state;
        const { fallbackSrc } = this.props;
        if (!isError) {
            this.props.onError?.();
            this._mounted && this.setState({
                src: fallbackSrc || defaultSrc,
                [!!fallbackSrc ? 'isError' : 'errored']: true,
            });
        }
    };

    render() {
        const { src, isError } = this.state;
        const {
            id, svg, type, size, width, height, bgImg, color, style, circle, minimum, disable, overflow, lazyload, fallbackSrc,
            draggable, clickable, className, selectable, resizeMode, attributes, rotate,
            onClick, onError, onMouseOver, onMouseLeave, onMouseDown,
        } = this.props;
        const isFunc = typeof onClick === 'function';
        const isHandleError = lazyload || fallbackSrc || onError;
        const imgSize = size ? (isNumber(size) ? size + 'px' : size) : imgSizes[type || 'icon'];
        const imgCursor = disable ? 'not-allowed' : ((clickable || isFunc) ? 'pointer' : (draggable ? 'grab' : 'default'));
        const imgConstraint = { width: width || imgSize, height: height || imgSize };
        const baseClass = getClassName({
            borderRadius: circle || type === 'avatar' ? '50%' : 'unset',
            objectFit: resizeMode,
            '&>div': { display: 'flex', height: '100%' },
            ...imgConstraint,
            ...(!selectable && cStyles.noneUserSelect),
            ...(imgCursor !== 'default' && { cursor: imgCursor }),
            ...(disable && { opacity: 0.5 }),
            ...(minimum && { minWidth: width || imgSize }),
            ...(overflow && { position: 'absolute' }),
            ...(isNumber(rotate) && { transform: `rotate(${rotate}deg)` }),
        });
        const imgProps = {
            alt: '', draggable, onMouseOver, onMouseLeave, onMouseDown,
            className: classNames(baseClass, className),
            onClick: (e) => !disable && isFunc && onClick(e),
            ref: ref => this.props.onRef(ref),
            ...(isError && isHandleError && { 'origin-src': src }),
            ...(id && { id }),
            ...imgConstraint,
        };
        if (bgImg) {
            imgProps.style = {
                backgroundImage: 'url(' + src + ')',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: resizeMode,
                ...style,
            };
            return <div {...imgProps}>{this.props.children}</div>;
        }
        if (svg) {
            if (color || svg.color) {
                imgProps.className = classNames(baseClass, className, getClassName(getSvgStyle({ ...svg, color: getColor(color || svg.color) })));
                imgProps.afterInjection = err => { if (err && this._mounted && !this.injectFailed) { this.injectFailed = true; this.setState({ reRender: true }); } };
            }
            return <ReactSVG {...{ ...imgProps, ...svg, src, style }} />;
        }
        if (isHandleError) { imgProps.onError = this.handleError; }
        return <img {...{ ...imgProps, src, style, ...attributes }} />;
    }

}

ImageViewer.propTypes = {
    id: PropTypes.any,
    src: PropTypes.any,
    fallbackSrc: PropTypes.any,
    className: PropTypes.any,
    style: PropTypes.object,
    size: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any,
    clickable: PropTypes.bool,
    draggable: PropTypes.bool,
    disable: PropTypes.bool,
    circle: PropTypes.bool,
    lazyload: PropTypes.bool,
    bgImg: PropTypes.bool,
    minimum: PropTypes.bool,
    type: PropTypes.string, // imgSizes;
    selectable: PropTypes.bool, // not disbale userSelect css;
    svg: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]), // https://github.com/tanem/react-svg/tree/master/examples/external-stylesheet
    attributes: PropTypes.any,
    rotate: PropTypes.number,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

ImageViewer.defaultProps = {
    onRef: () => null,
    resizeMode: 'cover',
};

export default ImageViewer;