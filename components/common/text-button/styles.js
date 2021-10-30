import { cStyles } from '@styles/theme';

export const styles = theme => ({
    text: {
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ...cStyles.noneUserSelect,
        color: theme.palette.text.primary,
        '&.disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
});