import { borderRadiuses, cStyles, fontWeights } from '@styles/theme';
import { toRgbA } from '@utils/StyleUtils';


export const styles = theme => {
    const { primary, text, background, info, success, common } = theme.palette;
    console.log("TCL: theme.palette", theme.palette)
    return {
        wrapper: {
            width: '100%',
            height: '100%',
        },

        container: {
            width: 1166,
            height: 'auto',
            boxSizing: 'border-box',
            margin: '0 auto',
            [theme.breakpoints.down('lg')]: {
                margin: '0 24px',
            },
        },

        //One
        boxSecOne: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 688,
            paddingTop: 96,
            backgroundColor: primary.main,
            overflow: 'hidden',
        },
        secOneContent: {
            color: common.white,
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights.bold,
                marginBottom: 8,
            },
            '&>:nth-child(2)': {
                fontSize: 18,
                opacity: 0.5,
                marginBottom: 48,
            },
            '&>:last-child': {
                '&>img': {
                    width: '100%',
                    height: '100%',
                },
            },
        },
        dlImg: {
            width: 'calc(100% - 100px)',
            height: '100%',
            [theme.breakpoints.down('md')]: {
                width: 400,
            },
        },
        boxCustomImg: {
            border: `8px solid ${common.white}`,
            borderRadius: 16,
            '& img': {
                borderRadius: 12,
            },
        },
        boxRightFive: {
            display: 'flex',
            width: '100%',
        },
        flexColumn: {
            display: 'flex',
            flexDirection: 'column',
            width: 204,
            '& img': {
                width: '100%',
                height: 400,
            },
            position: 'relative',
            '&.columTwo': {
                top: -265,
            },
            '&.columThree': {
                top: -12,
            },
        },

        // Two
        boxSecTwo: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '78px 0',
            backgroundColor: background.input,
            overflow: 'hidden',
        },
        secTwoContent: {
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights.bold,
                marginBottom: 8,
            },
            '&>:nth-child(2)': {
                fontSize: 24,
                opacity: 0.5,
                marginBottom: 48,
            },
        },
        secTwoItem: {
            display: 'flex',
            flexDirection: 'column',
            '&>:first-child': {
                display: 'flex',
                alignItems: 'center',
                marginBottom: 8,
                '&>:first-child': {
                    width: 8,
                    height: 8,
                    backgroundColor: success.main,
                    borderRadius: '50%',
                    marginRight: 8,
                },
                '&>:last-child': {
                    fontWeight: fontWeights.bold,
                },
            },
        },

        // Three
        boxSecThree: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '72px 0 137px',
            backgroundColor: background.input,
            overflow: 'hidden',
        },
        secThreeContent: {
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights.bold,
                marginBottom: 48,
            },
            '&>:nth-child(2)': {
                // fontSize: 24,
                // opacity: 0.5,
                // marginBottom: 48,
            },
        },
        secThreeItem: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 32,
            '&>:first-child': {
                display: 'flex',
                alignItems: 'center',
                marginBottom: 8,
                fontSize: 18,
                '&>:first-child': {
                    width: 6,
                    height: 24,
                    backgroundColor: success.main,
                    borderRadius: 20,
                    marginRight: 8,
                },
                '&>:last-child': {
                    fontWeight: fontWeights.bold,
                },
            },
            '&>:last-child': {
                whiteSpace: 'pre-line',
            },
            '&.marT0': {
                marginTop: 0,
            },
        },
        secThreeItemR: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 24,
            width: 217,
            height: 119,
            backgroundColor: common.white,
            borderRadius: borderRadiuses.big,
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights.bold,
                marginBottom: 8,
            },
            '&>:last-child': {
                opacity: 0.5,
            },
            '&.custom': {
                position: 'relative',
                left: -39,
                [theme.breakpoints.down('lg')]: {
                    left: -26,
                },
                [theme.breakpoints.down('md')]: {
                    left: 0,
                },
            },
            '&.active': {
                backgroundColor: primary.main,
                color: common.white,
            },
        },

        // Four
        boxSecFour: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingTop: 72,
            backgroundColor: common.white,
            overflow: 'hidden',
        },
        secFourContent: {
            color: primary.main,
            height: 'auto',
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights.bold,
                marginBottom: 48,
            },
            '&>:nth-child(2)': {
                borderBottom: `1px solid ${info[100]}`,
                paddingBottom: 24,
                marginBottom: 48,
                '&>img': {
                    width: '100%',
                    maxWidth: 405,
                    height: 36,
                },
            },
            [theme.breakpoints.down('md')]: {
                paddingBottom: 32,
            },
        },
        boxDlImg: {
            position: 'relative',
            left: -10,
        },

        // Five
        boxSecFive: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 671,
            boxSizing: 'border-box',
            backgroundColor: primary.main,
            overflow: 'hidden',
        },
        boxFiveInfo: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 671,
            color: common.white,
            '&>:first-child': {
                fontSize: 24,
                fontWeight: fontWeights.bold,
                marginBottom: 8,
            },
            '&>:nth-child(2)': {
                fontSize: 18,
                opacity: 0.5,
                marginBottom: 24,
            },
        },
        boxFiveImg: {
            display: 'flex',
            '& img': {
                width: '100%',
                maxWidth: 188,
                height: 56,
            },
            '&>:first-child': {
                marginRight: 16,
            },
        },

        // Six 
        boxSecSix: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            boxSizing: 'border-box',
            padding: '96px 0',
            borderBottom: `1px solid ${info[900]}`,
            backgroundColor: common.white,
            overflow: 'hidden',
        },
        boxHeader: {
            display: 'flex',
            position: 'relative',
        },
        headerItem: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: 24,
            cursor: 'pointer',
            fontWeight: fontWeights.bold,
            opacity: 0.5,
            '&>:first-child': {
                paddingBottom: 12,
            },
            '&>:last-child': {
                width: 'auto',
                height: '4px',
                backgroundColor: primary.main,
                borderRadius: 20,
                display: 'none',
                '&.active': {
                    display: 'inline-block',
                },
            },
            '&.active': {
                opacity: 1,
            },
        },

        // Common
        caption: {
            fontSize: 24,
            fontWeight: fontWeights.bold,
        },
        btn: {
            display: 'flex',
            alignItems: 'center',
            height: 48,
            marginTop: 16,
            padding: '0 24px',
            boxSizing: 'border-box',
            borderRadius: borderRadiuses.primary,
            cursor: 'pointer',
            border: `1px solid ${common.white}`,
            ...cStyles.noneUserSelect,
            backgroundColor: success.main,
            color: common.white,
            width: 'fit-content',
        },
        heightFit: {
            height: 'fit-content',
            [theme.breakpoints.down('md')]: {
                marginTop: '16px !important',
            },
        },

        // container: {
        //     width: 1166,
        //     height: '100%',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'space-between',
        //     borderBottom: `1px solid ${toRgbA(common.white, 0.1)}`
        // },
        // nav: {
        //     display: 'flex',
        //     alignItems: 'center',
        // },
        // menuItem: {
        //     marginLeft: 24,
        // },
        // boxLogo: {
        //     display: 'flex',
        //     alignItems: 'center',
        //     '&>:last-child': {
        //         marginLeft: 16,
        //         '&>:first-child': {
        //             fontWeight: fontWeights.bold,
        //             color: common.white,
        //         },
        //         '&>:last-child': {
        //             opacity: 0.5,
        //         },
        //     },
        // },
        // btn: {
        //     display: 'flex',
        //     alignItems: 'center',
        //     height: 48,
        //     padding: '0 24px',
        //     boxSizing: 'border-box',
        //     marginLeft: 24,
        //     borderRadius: borderRadiuses.primary,
        //     cursor: 'pointer',
        //     border: `1px solid ${common.white}`,
        //     ...cStyles.noneUserSelect,
        //     '&.bgGreen': {
        //         backgroundColor: success.main,
        //         border: `1px solid ${success.main}`,
        //     },
        // },
    };
};