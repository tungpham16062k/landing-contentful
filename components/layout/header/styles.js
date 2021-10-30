import { borderRadiuses, cStyles, fontWeights } from '@styles/theme';
import { toRgbA } from '@utils/StyleUtils';

export const styles = theme => {
    const { primary, success, common } = theme.palette;
    return {
        wrapper: {
            width: '100%',
            height: 80,
            color: common.white,
            backgroundColor: primary.main,
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
        },
        containers: {
            width: 1166,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            borderBottom: `1px solid ${toRgbA(common.white, 0.1)}`,
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
            '&>:last-child': {
                marginLeft: 16,
                '&>:first-child': {
                    fontWeight: fontWeights.bold,
                    color: common.white,
                },
                '&>:last-child': {
                    opacity: 0.5,
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
        },
    }
};