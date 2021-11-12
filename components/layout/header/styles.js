import { getShadowStyle, getTransitionStyle, toRgbA } from '@utils/StyleUtils';

import { borderRadiuses, cStyles, linearGradients } from '@styles/theme';

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
        boxLogo: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            left: 0,
            '&>:last-child': {
                height: 40,
                marginLeft: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&>:first-child': {
                    position: 'relative',
                    left: -2,
                },
                '&>:last-child': {
                    marginTop: 4,
                    opacity: 0.5,
                    fontSize: 12,
                },
            },
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
            '&.overlay': {
                borderColor: palette.white.main + '!important',
            },
            '&.bgGreen': {
                borderColor: palette.primary.main,
                background: linearGradients.green,
            },
            '&.bgPrimary': {
                background: linearGradients.main,
                borderColor: palette.info.main + '!important',
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