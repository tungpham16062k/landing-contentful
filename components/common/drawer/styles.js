import { getShadowStyle } from '@utils/StyleUtils';

import { cStyles, fontWeights, borderRadiuses } from '@styles/theme';

export const styles = ({ palette }) => {
    return ({
        paper: {
            backgroundColor: palette.white.main,
            height: '100vh !important',
            color: palette.primary.main,
        },
        btn: {
            height: 48,
            padding: '14px 24px',
            boxSizing: 'border-box',
            fontSize: 15,
            color: palette.primary.main,
            borderRadius: borderRadiuses.primary,
            border: `solid 1px ${palette.primary[100]}`,
            backgroundColor: palette.background.default,
            cursor: 'pointer',
            marginLeft: 16,
            '&:hover': {
                border: `1px solid ${palette.primary.main} !important`,
            },
            '&.marL0': {
                marginLeft: 0,
            },
        },
        primaryBtn: {
            color: palette.white.main,
            backgroundColor: palette.success.main,
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
            color: palette.primary.main,
            boxSizing: 'border-box',
            ...getShadowStyle({ color: palette.primary[50] }),
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
            border: `1px solid ${palette.success[100]}`,
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
            backgroundColor: palette.primary[50],
            cursor: 'pointer',
            border: `1px solid ${palette.background.default}`,
            boxSizing: 'border-box',
            '&:hover': {
                border: `1px solid ${palette.primary.main}`
            },
            '&.normalDrawer': {
                top: 18,
                right: 0,
                position: 'fixed',
                backgroundColor: palette.common.black,
                border: `1px solid ${palette.common.black}`,
            },
        },
        hide: {
            display: 'none !important',
        },
    })
};