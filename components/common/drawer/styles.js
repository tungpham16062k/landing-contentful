import { colors, cStyles, fontSizes, fontWeights, borderRadiuses } from '@styles/theme';
import { toRgbA } from '@utils/StyleUtils';

export const styles = theme => {
    const { primary, text, background, info, success, common } = theme.palette || {};
    return ({
        paper: {
            backgroundColor: colors.white,
            height: '100vh !important',
            color: colors.primary,
        },
        btn: {
            height: 48,
            padding: '14px 24px',
            boxSizing: 'border-box',
            fontSize: 15,
            color: colors.primary,
            borderRadius: borderRadiuses.primary,
            border: `solid 1px ${primary[100]}`,
            backgroundColor: colors.bgColor,
            cursor: 'pointer',
            marginLeft: 16,
            '&:hover': {
                border: `1px solid ${colors.primary} !important`,
            },
            '&.marL0': {
                marginLeft: 0,
            },
        },
        primaryBtn: {
            color: colors.white,
            backgroundColor: success.main,
        },
        boxDraw: {
            width: '100%',
            height: '100vh',
            boxSizing: 'border-box',
            overflow: 'hidden',
        },
        boxHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: 68,
            fontSize: 18,
            fontWeight: fontWeights.bold,
            color: colors.primary,
            boxSizing: 'border-box',
            boxShadow: '0 4px 16px 0 rgba(29, 48, 80, 0.04)',
            // border: `1px solid ${toRgbA(colors.blue, 0.1)}`,
            '&.normalDrawer': {
                boxShadow: 'unset',
            },
        },
        boxContent: {
            flexGrow: 1,
            height: 'calc(100% - 148px)',
            overflowY: 'auto !important',
            '&.normalDrawer': {
                height: 'calc(100% - 68px)',
            },
        },
        boxAction: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            height: 80,
            boxSizing: 'border-box',
            border: `1px solid ${toRgbA(colors.blue, 0.1)}`,
            ...cStyles.noneUserSelect,
            '&>:first-child': {
                display: 'flex',
            },
            '&>:last-child': {
                display: 'flex',
            },
        },
        closeIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: toRgbA(primary.main, 0.05),
            cursor: 'pointer',
            border: `1px solid ${colors.bgColor}`,
            boxSizing: 'border-box',
            '&:hover': {
                border: `1px solid ${colors.primary}`
            },
            '&.normalDrawer': {
                top: 18,
                right: 0,
                position: 'fixed',
                backgroundColor: common.black,
                border: `1px solid ${common.black}`,
            },
        },
        hide: {
            display: 'none !important',
        },
    })
};