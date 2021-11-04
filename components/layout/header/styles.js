import { getShadowStyle, getTransitionStyle, toRgbA } from '@utils/StyleUtils';

import { borderRadiuses, cStyles } from '@styles/theme';

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
        nav: {
            display: 'flex',
            alignItems: 'center',
        },
        menuItem: {
            marginLeft: 24,
        },
        boxLogo: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            left: -14,
            '&>:last-child': {
                '&>:first-child': {
                    position: 'relative',
                    left: -2,
                },
                marginLeft: 7,
                '&>:last-child': {
                    marginTop: 4,
                    opacity: 0.5,
                    fontSize: 12,
                },
            },
            '&.overlay': {
                left: 0,
                '&>:last-child': {
                    marginLeft: 16,
                },
            },
        },
        btn: {
            display: 'flex',
            alignItems: 'center',
            height: 48,
            padding: '0 24px',
            boxSizing: 'border-box',
            marginLeft: 24,
            borderRadius: borderRadiuses.primary,
            cursor: 'pointer',
            border: `1px solid ${common.white}`,
            ...cStyles.noneUserSelect,
            '&.bgGreen': {
                backgroundColor: success.main,
                border: `1px solid ${success.main}`,
            },
            '&.bgPrimary': {
                backgroundColor: primary.main,
                border: `1px solid ${primary.main}`,
            },
            '&.colorW': {
                color: common.white,
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
        marLR24: {
            margin: '0 24px',
        },
    }
};