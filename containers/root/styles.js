export const styles = ({ palette }) => ({
    wrapper: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontSize: 15,
        color: palette.text.primary,
        background: palette.background.input,
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