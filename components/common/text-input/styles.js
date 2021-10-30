import { getTransitionStyle } from '@utils/StyleUtils';

import { cStyles, fontWeights } from '@styles/theme';

export const styles = theme => ({
    wrapper: {
        padding: '12px 16px',
        borderRadius: '6px',
        background: theme.palette.background.input,
        border: `1px solid ${theme.palette.info[100]}`,
        ...getTransitionStyle('border .15s'),
        '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
        },
    },
    label: {
        display: 'flex',
        marginBottom: 8,
        fontSize: 12,
        color: theme.palette.text.primary,
        // '&>span': {
        //     ...cStyles.textEllipsis,
        // },
        '&.error': {
            color: theme.palette.error.main,
        },
        '&:not(.error)': {
            fontWeight: fontWeights.bold,
        },
        '& .required': {
            marginLeft: 4,
            color: theme.palette.error.main,
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
    },
    input: {
        flex: 1,
        padding: 0,
        border: 'none',
        outline: 'none',
        background: 'none',
        '&::placeholder': {
            color: theme.palette.text.plh,
        },
        '&::-webkit-input-placeholder': { /* Edge */
            color: theme.palette.text.plh,
        },
    },
});