import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';

import { i18nText } from '@libs/i18n';

import { isArray, isBoolean, isNumber } from '@utils/Utils';
import { getClassName, getTextLineStyle } from '@utils/StyleUtils';

import { textColors, colors } from '@styles/theme';

const positionMapping = {
    tl: 'TOP_LEFT',
    tc: 'TOP_CENTER',
    tr: 'TOP_RIGHT',
    bl: 'BOTTOM_LEFT',
    bc: 'BOTTOM_CENTER',
    br: 'BOTTOM_RIGHT',
};
const transitionMapping = {
    'slide': Slide,
    'zoom': Zoom,
    'flip': Flip,
    'bounce': Bounce,
};

const CloseButton = ({ color, closeToast }) => (<CloseIcon onClick={closeToast} style={{ marginLeft: 16, fontSize: 20, color }} />);
const notifyColors = {
    success: colors.green,
    error: colors.red,
    warn: colors.orange,
    info: colors.blue
};

export default class NotifyMgr {

    static instance = null;
    static createInstance() { return new NotifyMgr(); }
    static getInstance() {
        if (!NotifyMgr.instance) { NotifyMgr.instance = NotifyMgr.createInstance(); }
        return NotifyMgr.instance;
    }

    static notifySocket = null;
    static connParams = null;
    static isResetSocket = false;
    static resetCb = {};
    static queueCb = {};

    showToast(content, options) {
        if (content) {
            let { join, type, noPadding, rtl = false, toastId, newestOnTop = true, pauseOnHover = true, closeOnClick = false, hideProgressBar = false, pauseOnFocusLoss = false, draggablePercent = 80, draggable = true, transition = 'slide', position = 'br', closeButton, autoClose } = options || {};
            if (isArray(content, true)) content = content.map(i => i18nText(...(isArray(i) ? i : [i]))).join(join || '');
            switch (String(type)) { case '0': case 'failure': type = 'error'; break; case '1': type = 'success'; break; default: break; }
            const containerStyle = { borderRadius: 6, padding: '8px 16px 8px 24px', minHeight: 48, width: 320, alignItems: 'center', margin: '16px 0 0' };
            const bodyStyle = { ...getTextLineStyle(5) };
            const progressStyle = { marginBottom: 5, height: '2px', opacity: 0.69 };
            if (type) {
                containerStyle.backgroundColor = `${notifyColors[type]} !important`;
                bodyStyle.color = `${textColors.white} !important`;
                progressStyle.backgroundColor = `${colors.white} !important`;
            }
            if (noPadding) containerStyle.padding = 0;
            if (options?.containerPadding) containerStyle.padding = options.containerPadding; // TODO: delete this line later, after release social
            const toastOptions = {
                rtl,
                toastId,
                newestOnTop,
                pauseOnHover,
                closeOnClick,
                hideProgressBar,
                pauseOnFocusLoss,
                draggablePercent,
                draggable: closeButton === false ? false : draggable,
                transition: transitionMapping[transition],
                position: toast.POSITION[positionMapping[position]],
                closeButton,
                // closeButton: isBoolean(closeButton) ? closeButton : (closeButton || <CloseButton color={type ? 'white' : 'gray'} />),
                autoClose: isBoolean(autoClose) ? autoClose : (isNumber(autoClose) ? autoClose * 1000 : 3000),
                className: getClassName(containerStyle),
                bodyClassName: getClassName(bodyStyle),
                progressClassName: getClassName(progressStyle),
            };
            (type ? toast[type] : toast)(content, toastOptions);
        }
    }

    closeToast(id) {
        if (id) toast.dismiss(id);  // dismiss by id
        else toast.dismiss();       // dismiss all
    }
}