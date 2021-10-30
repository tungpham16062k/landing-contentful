import { getSvgStyle } from '@utils/StyleUtils';

import { cStyles, fontWeights } from '@styles/theme';

export const styles = theme => ({
    link: {
        width: 'fit-content',
        color: 'unset !important',
        textDecoration: 'unset !important',
    },
    button: {
        boxShadow: 'none !important',
        lineHeight: 'normal !important',
        borderRadius: '6px !important',
        textTransform: 'none !important',
        letterSpacing: 'normal !important',
        fontSize: '15px !important',
        fontWeight: fontWeights.primary + '!important',
        color: theme.palette.text.primary,
        '& .text': {
            ...cStyles.textEllipsis,
        },
        '&.disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
        '&.contained': {
            color: theme.palette.common.white,
            ...getSvgStyle({ color: theme.palette.common.white }),
        },
        '&.outlined:not(.colorful)': {
            border: `1px solid ${theme.palette.info[100]} !important`,
            '&:hover': {
                border: `1px solid ${theme.palette.primary.main} !important`,
            },
        },
        '&.circle': {
            padding: '0 !important',
            borderRadius: '50% !important',
            '&.small': {
                width: 32,
                minWidth: 32,
            },
            '&.medium': {
                width: 36,
                minWidth: 36,
            },
            '&.large': {
                width: 48,
                minWidth: 48,
            },
        },
        '&.small': {
            height: 32,
            '&:not(.circle)': {
                padding: '0 8px !important',
            },
            '& .left': {
                marginRight: 8,
            },
            '& .right': {
                marginLeft: 8,
            },
        },
        '&.medium': {
            height: 36,
            '&:not(.circle)': {
                padding: '0 16px !important',
            },
            '& .left': {
                marginRight: 16,
            },
            '& .right': {
                marginLeft: 16,
            },
        },
        '&.large': {
            height: 48,
            '&:not(.circle)': {
                padding: '0 24px !important',
            },
            '& .left': {
                marginRight: 24,
            },
            '& .right': {
                marginLeft: 24,
            },
        },
    },
});