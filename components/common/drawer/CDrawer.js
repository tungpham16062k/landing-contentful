import React, { Component } from 'react';
import classNames from 'classnames';

// styles 
import { withStyles } from '@mui/styles';
import { styles } from './styles';

// utils
import { getClassName, getColor } from '@utils/StyleUtils';
import { debounce } from '@utils/WebUtils';

// @mui
import Drawer from '@mui/material/Drawer';

import ImageViewer from '@components/common/image-viewer';

const icons = {
    close: require('@assets/icons/common/ic_delete.svg'),
};

class CDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageId: props?.pageId || 'detail',
        }
    }

    render() {
        const { classes, open, children, customWidth, onClose, onAccept, title, acceptOpts, closeOpts } = this.props;
        const cStyle = {
            maxWidth: customWidth || 1100,
            width: '80% !important',
        }
        const dProps = {
            open,
            anchor: 'right',
            classes: { paper: classNames(classes.paper, getClassName(cStyle)) },
            style: { zIndex: 1100 },
            disableEnforceFocus: true,
            onClose: onClose,
        };
        return (
            <Drawer {...dProps}>
                <div className={classes.boxDraw}>
                    <div className={classes.boxHeader}>
                        <span>{title}</span>
                        <div
                            className={classes.closeIcon}
                            onClick={onClose}>
                            <ImageViewer size={20} src={icons.close} svg={{ color: 'primary' }} />
                        </div>
                    </div>
                    <div className={classes.boxContent}>
                        {children}
                    </div>
                    <div className={classes.boxAction}>
                        <div className={classNames(classes.btn, classes.primaryBtn, { [classes.hide]: !!acceptOpts.hide })} style={{ backgroundColor: getColor(acceptOpts.color) }} onClick={() => debounce(200, onAccept)}>
                            {acceptOpts.label ? acceptOpts.label : 'Lưu lại'}
                        </div>
                        <div className={classNames(classes.btn, { [classes.hide]: !!closeOpts.hide })} onClick={onClose}>{closeOpts.label ? closeOpts.label : 'Đóng'}</div>
                    </div>
                </div>
            </Drawer>
        );
    }
}

CDrawer.defaultProps = {
    title: 'Title',
    acceptOpts: {},
    closeOpts: {},
    onClose: () => null,
    onAccept: () => null,
};

export default withStyles(styles)(CDrawer);