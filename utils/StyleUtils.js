import React from 'react';
import { css } from 'glamor';

import { colors } from '@styles/theme';

import { isArray, isFunction, isNumber } from './Utils';

export const getClassName = (style) => style ? `${css(style)}` : '';
export const getColor = (id) => colors[id] || id;
export const handleScroll2Top = (ref, options) => ref && ref.scrollTo({ top: 0, left: 0, behavior: 'smooth', ...options });
export const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

export const isBrowserPortrait = () => {
    let screenAngle = ((screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation)?.angle;
    return isNumber(screenAngle) ? screenAngle === 0 : window.matchMedia('(orientation: portrait)').matches;
}

export const getTextLineStyle = (number, lineHeight, textOverflow) => {
    return {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: number || 1,
        WebkitBoxOrient: 'vertical',
        textOverflow: textOverflow || 'ellipsis',
        ...(lineHeight && { lineHeight }),
    }
}

export const toRgbA = (color, opacity, isImportant) => {
    let rgba = getColor(color) || color;
    if (rgba) {
        switch (true) {
            case /^#([A-Fa-f0-9]{3}){1,2}$/.test(rgba): {
                let c = rgba.substring(1).split('');
                if (c.length == 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                c = '0x' + c.join('');
                rgba = `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity || 1})`;
            } break;
            case rgba.indexOf('rgb') > -1:
                let rgbParts = rgba.split(/[(|)|\s|,]/).filter((i, idx) => i && idx);
                if (rgbParts.length === 3 || rgbParts.length === 4) {
                    let [r, g, b, o] = rgbParts;
                    rgba = `rgba(${r},${g},${b},${opacity !== undefined ? opacity : (o || 1)})`;
                }
                break;
            default: break;
        }
        if (isImportant) rgba += ' !important';
    }
    return rgba;
}

export const isShowTableAction = ({ columns, actions, resizeable } = {}) => {
    const lastColumn = columns[columns.length - 1];
    return isArray(actions, true) && lastColumn && lastColumn.type === 'action' && (resizeable || lastColumn.col);
}

const isReactComponent = (component) => isClassComponent(component) || typeof component === 'function' || isExoticComponent(component)
const isClassComponent = (component) => typeof component === 'function' && (() => { const proto = Object.getPrototypeOf(component); return proto.prototype && proto.prototype.isReactComponent })();
const isExoticComponent = (component) => typeof component === 'object' && typeof component.$$typeof === 'symbol' && ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description);

export const normalizeComponent = (input, props, fallback = null) => {
    if (!input) return fallback;
    const [Comp, options] = isArray(input) ? input : [input];
    const { asFunc } = options || {};
    if (asFunc) return Comp(props);
    return isReactComponent(Comp) ? <Comp {...props} /> : Comp;
}

export const getPopperMenuPlacement = (e, popperWidth) => {
    let pageX = parseInt(e.pageX),
        windowWidth = parseInt(window.innerWidth),
        marginLeft = pageX - popperWidth,
        marginRight = windowWidth - pageX;
    return (marginRight < popperWidth && marginLeft > 0) ? 'bottom-end' : 'bottom-start';
}

export const getSvgStyle = (option, callback) => {
    const isFunc = isFunction(option);
    const { color, style } = option && !isFunc ? option : {};
    const selector = '& path[fill]';
    const cb = isFunc ? option : callback, fill = getColor(color);
    return cb ? cb(selector) : { [selector]: { fill, ...style } };
}

export const getShadowStyle = ({ color, bgColor, gradient, disable, size, custom } = {}) => {
    if (!color && !custom) return;
    const boxShadow = custom || `${size || '0px 4px 16px 0px'} ${color}`;
    const style = { boxShadow: boxShadow, WebkitBoxShadow: boxShadow, MozBoxShadow: boxShadow };
    if (bgColor) {
        if (gradient) {
            let gradientDirection = gradient.direction || 'to bottom';
            style.backgroundImage = `linear-gradient(${gradientDirection}, ${bgColor})`;
        } else {
            style.backgroundColor = bgColor;
        }
    }
    if (disable) { style.opacity = 0.6; }
    return style;
}

export function getTransitionStyle(transition) {
    // ease - specifies a transition effect with a slow start, then fast, then end slowly (this is default)
    // linear - specifies a transition effect with the same speed from start to end
    // ease-in - specifies a transition effect with a slow start
    // ease-out - specifies a transition effect with a slow end
    // ease-in-out - specifies a transition effect with a slow start and end
    // cubic-bezier(n,n,n,n) - lets you define your own values in a cubic-bezier function
    return {
        MozTransition: transition,
        WebkitTransition: transition,
        OTransition: transition,
        transition: transition,
    };
}

export function getTransformStyle(transform) {
    return {
        WebkitTransform: transform,
        MsTransform: transform,
        transform: transform,
    };
}