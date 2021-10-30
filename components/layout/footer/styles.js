import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        height: '100%',
        width: 1166,
        paddingTop: 48,
        borderTop: `1px solid ${theme.palette.primary[100]}`,
    },
    copyright: {
        height: 48,
        display: 'flex',
        alignItems: 'center',
    },
}));