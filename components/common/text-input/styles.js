import { getTransitionStyle } from '@utils/StyleUtils';

import { fontWeights } from '@styles/theme';

export const styles = ({ palette }) => ({
    wrapper: {
        padding: '12px 16px',
        borderRadius: '6px',
        background: palette.background.input,
        border: `1px solid ${palette.info[100]}`,
        ...getTransitionStyle('border .15s'),
        '&:hover': {
            border: `1px solid ${palette.primary.main}`,
        },
    },
    label: {
        display: 'flex',
        marginBottom: 8,
        fontSize: 12,
        color: palette.text.primary,
        '&.error': {
            color: palette.error.main,
        },
        '&:not(.error)': {
            fontWeight: fontWeights.bold,
        },
        '& .required': {
            marginLeft: 4,
            color: palette.error.main,
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
            color: palette.text.plh,
        },
        '&::-webkit-input-placeholder': { /* Edge */
            color: palette.text.plh,
        },
    },
});