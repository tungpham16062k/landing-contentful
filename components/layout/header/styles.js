import { getShadowStyle, getTransitionStyle, toRgbA } from '@utils/StyleUtils';

import { cStyles, borderRadiuses } from '@styles/theme';

export const styles = ({ palette }) => {
    const { primary, success, common } = palette;
    return {
        wrapper: {
            width: '100%',
            height: 80,
            top: 0,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            color: common.white,
            ...getTransitionStyle('all .25s'),
            '&.overlay': {
                color: primary.main,
                background: common.white,
                ...getShadowStyle({ color: toRgbA(primary.main, 0.16) }),
            },
        },
        container: {
            width: 1166,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            margin: '0 24px',
        },
        navWrapper: {
            display: 'flex',
            alignItems: 'center',
            '& $navBtn:first-of-type': {
                marginLeft: 20,
            },
        },
        navLink: {
            padding: '8px 12px',
        },
        navBtn: {
            display: 'flex',
            alignItems: 'center',
            height: 48,
            padding: '0 24px',
            boxSizing: 'border-box',
            marginLeft: 16,
            cursor: 'pointer',
            color: common.white,
            borderRadius: borderRadiuses.primary,
            ...cStyles.noneUserSelect,
            borderWidth: 1,
            borderStyle: 'solid',
            ...getTransitionStyle('all .25s'),
            '&.bgGreen': {
                borderColor: palette.success.main,
                background: palette.success.main,
            },
            '&.bgPrimary': {
                background: palette.info.main,
                borderColor: palette.info.main,
            },
        },
        boxSubMenu: {
            display: 'flex',
            flexDirection: 'column',
            color: `${primary.main} !important`,
        },
        subMenuItem: {

            display: 'flex',
            alignItems: 'center',
            height: 48,
            paddingLeft: 24,
            boxSizing: 'border-box',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: primary[100],
                color: success.main,
            },
        },
        subMenuIc: {
            margin: '32px 0 24px 24px',
        },
        btnChangeLgn: {
            margin: '0 24px',
            objectFit: 'contain',
        },
    }
};