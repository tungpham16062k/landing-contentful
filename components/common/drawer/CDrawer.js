import React, { useMemo, useState, Fragment } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//hocs
import withI18n from '@hocs/I18nHocs';

// utils
import { getClassName, getColor } from '@utils/StyleUtils';
import { debounce } from '@utils/WebUtils';
import { isArray } from '@utils/Utils';

// styles 
import { withStyles } from '@mui/styles';
import { styles } from './styles';

// @mui
import Drawer from '@mui/material/Drawer';

// comps
import ImageViewer from '@components/common/image-viewer';

const icons = {
    // close: require('@assets/icons/common/ic_delete.svg'),
};

const CDrawer = ({ classes, i18n, onAccept, onClose, open, normalDrawer, btnOpts, title, customWidth, children, hideTitle }) => {

    const btnNormals = useMemo(() => {
        return [
            { id: 'acceptDraw', label: i18n.t('Lưu lại'), bgColor: 'green', color: 'white' },
            { id: 'closeDraw', label: i18n.t('Đóng') },
        ];
    }, []);

    const [btnOptions,] = useState([...(isArray(btnOpts, true) ? btnOpts : btnNormals)]);

    const _renderBtn = (isRight = false) => {
        return (
            <Fragment>
                {
                    btnOptions.map((item, idx) => {
                        const { id, label, bgColor, color, right } = item;
                        if ((isRight && !right) || (!isRight && right)) return;
                        const btnProps = {
                            key: idx,
                            className: classNames(classes.btn, { 'marL0': !right && idx === 0 }),
                            style: {
                                ...(bgColor && {
                                    backgroundColor: getColor(bgColor),
                                    border: `1px solid ${getColor(bgColor)}`,
                                }),
                                ...(color && { color: getColor(color) }),
                            },
                            onClick: () => debounce(100, () => id === 'closeDraw' ? onClose() : onAccept(id)),
                        }
                        return (
                            <div {...btnProps}>{label}</div>
                        );
                    })
                }
            </Fragment>
        );
    }

    return (
        <Drawer
            open={open}
            anchor={'right'}
            classes={{
                paper: classNames(classes.paper, getClassName({
                    maxWidth: customWidth,
                    width: '80% !important',
                }))
            }}
            style={{ zIndex: 1100 }}
            disableEnforceFocus={true}
            onClose={onClose}
        >
            <div className={classes.boxDraw}>
                <div className={classNames(classes.boxHeader, { 'normalDrawer': normalDrawer, [classes.hide]: hideTitle })}>
                    <span>{title}</span>
                    <div
                        className={classNames(classes.closeIcon, { 'normalDrawer': normalDrawer })}
                        style={{ ...(normalDrawer && { right: `${customWidth + 24}px` }) }}
                        onClick={onClose}>
                        {/* <ImageViewer size={20} src={icons.close} svg={{ color: normalDrawer ? 'white' : 'primary' }} /> */}
                    </div>
                </div>
                <div className={classNames(classes.boxContent, { 'normalDrawer': normalDrawer })}>
                    {children}
                </div>
                {
                    !normalDrawer &&
                    <div className={classes.boxAction}>
                        <div>{_renderBtn()}</div>
                        <div>{_renderBtn(true)}</div>
                    </div>
                }
            </div>
        </Drawer>
    );
}

CDrawer.propTypes = {
    normalDrawer: PropTypes.bool,
    open: PropTypes.bool,
    btnOpts: PropTypes.array, // { id: 'accept', label: 'Làm mới', bgColor: 'red', color: 'white', right: true } // right = true => if position btn is right
    title: PropTypes.string,
    customWidth: PropTypes.number,
    children: PropTypes.any,
    onAccept: PropTypes.func,
    onClose: PropTypes.func,
};

CDrawer.defaultProps = {
    normalDrawer: false,
    hideTitle: false,
    open: false,
    btnOpts: [], // { id: 'accept', label: 'Làm mới', bgColor: 'red', color: 'white', right: true } // right = true => if position btn is right
    title: '',
    customWidth: 550,
    children: null,
    onClose: () => null,
    onAccept: () => null,
};

export default compose(withI18n(), withStyles(styles))(CDrawer);