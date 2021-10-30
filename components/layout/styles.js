export const styles = theme => {
    const { primary } = theme.palette;
    return {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
        },
        boxContent: {
            marginTop: 80,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            // backgroundColor: primary.main,
        },
    }
};