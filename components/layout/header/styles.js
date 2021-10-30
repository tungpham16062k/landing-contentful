const { makeStyles } = require('@mui/styles');

export const useStyle = makeStyles(theme => {
    return {
        wrapper: {
            height: 80,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'center'
        },
        container: {
            width: 1166,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        menuItem: {
            marginLeft: 32,
        },
    }
});