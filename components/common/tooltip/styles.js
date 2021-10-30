import { cStyles } from '@styles/theme';

export const styles = theme => ({
    popper: {
        zIndex: 99999,
        '&.hidden': {
            display: 'none',
        },
    },
    center: {
        textAlign: 'center',
    },
    tooltip: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...cStyles.noneUserSelect,
    },
    noMaxWidth: {
        wordBreak: 'unset',
        maxWidth: 'none',
    },
});