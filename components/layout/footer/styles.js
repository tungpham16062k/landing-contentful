import { borderRadiuses, fontWeights } from "@styles/theme";

export const styles = ({ palette, breakpoints }) => {
    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: palette.common.white,
            boxSizing: 'border-box',
        },
        container: {
            width: 1166,
            display: 'flex',
            flexDirection: 'column',
            height: 470,
            boxSizing: 'border-box',
            padding: '48px 0 16px',
            borderTop: `1px solid ${palette.info[100]}`,
            margin: '0 24px',
            justifyContent: 'space-between',
            [breakpoints.down('lg')]: {
                height: 'fit-content',
            },
        },
        copyright: {
            fontSize: 12,
            display: 'flex',
            alignItems: 'flex-end',
        },
        boxLogo: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            '&>:last-child': {
                height: 40,
                marginLeft: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&>:first-child': {
                    position: 'relative',
                    left: -2,
                },
                '&>:last-child': {
                    marginTop: 4,
                    opacity: 0.5,
                    fontSize: 12,
                },
            },
        },
        boxInfo: {
            margin: '32px 0 24px',
            '&>div': {
                display: 'flex',
                marginTop: 8,
                '&>:first-child': {
                    width: 46,
                    opacity: 0.5,
                    marginRight: 16,
                },
                '&.marT0': {
                    marginTop: 0,
                },
            },
        },
        boxCircle: {
            display: 'flex',
            '&>div': {
                width: 36,
                height: 36,
                borderRadius: borderRadiuses.big,
                backgroundColor: palette.primary[100],
                marginRight: 8,
            },
        },
        boxLeft: {
            '&.MuiGrid-root': {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 32,
            },
        },
        boxRight: {
            [breakpoints.down('lg')]: {
                paddingBottom: 32,
            },
        },
        boxItem: {
            '&>div': {
                marginBottom: 16,
                cursor: 'pointer',
                '&.firstItem': {
                    opacity: 0.5,
                    marginBottom: 24,
                    fontWeight: fontWeights.bold,
                },
            },
        },
        bold: {
            fontWeight: fontWeights.bold,
        },

    };
};