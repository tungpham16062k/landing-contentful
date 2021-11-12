import { cStyles } from '@styles/theme';

export const styles = ({ palette }) => ({
    text: {
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        ...cStyles.noneUserSelect,
        color: palette.text.primary,
        '&.disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    },
});