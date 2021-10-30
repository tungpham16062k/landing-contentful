export const styles = theme => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontSize: 15,
        color: theme.palette.text.primary,
        background: theme.palette.background.input,
        '&.center': {
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    container: {
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
    },
});