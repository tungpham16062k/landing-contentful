import { cStyles, borderRadiuses, fontWeights, linearGradients } from '@styles/theme';

export const styles = theme => {
    const { primary, background, info, success, common } = theme.palette;
    return {
        wrapper: {
            width: '100%',
            height: 'auto',
        },

        container: {
            maxWidth: 1166,
            width: '-webkit-fill-available',
            height: 'auto',
            margin: '0 auto',
            boxSizing: 'border-box',
            [theme.breakpoints.down('lg')]: {
                margin: '0 24px',
            },
        },

        //One
        boxSecOne: {
            width: '100%',
            height: 'auto',
            paddingTop: 176,
            marginTop: -80,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            background: linearGradients.main,
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
            objectFit: 'contain',
            maxWidth: 400,
        },
        boxCustomImg: {
            backgroundColor: common.white,
            border: `8px solid ${common.white}`,
            borderRadius: '16px 16px 0 0',
            '& img': {
                borderRadius: '6px 6px 0 0',
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
        boxRightThree: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            width: '100%',
            height: '100%',
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
            marginRight: 38,
            cursor: 'pointer',
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
                [theme.breakpoints.down(1200)]: {
                    left: 0,
                },
            },
            '&:hover': {
                backgroundColor: primary.main,
                color: common.white,
            },
            [theme.breakpoints.down('md')]: {
                marginRight: 0,
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
            height: 671,
            boxSizing: 'border-box',
            backgroundColor: primary.main,
            overflow: 'hidden',
            [theme.breakpoints.down('md')]: {
                height: 'auto',
            },
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
            [theme.breakpoints.down('md')]: {
                height: 300,
            },
        },
        boxFiveImg: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            '& img': {
                width: '100%',
                maxWidth: 188,
                height: 56,
            },
        },
        boxRightFive: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 'auto',
            position: 'relative',
            top: -300,
            [theme.breakpoints.down('md')]: {
                marginBottom: 32,
                top: 0,
            },
            '& img': {
                maxWidth: 600,
                width: '100%',
                height: 'auto',
            },
        },

        // Six 
        boxSecSix: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: '96px 0',
            backgroundColor: common.white,
            overflow: 'hidden',
        },
        boxHeader: {
            display: 'flex',
            flexWrap: 'wrap',
            position: 'relative',
            margin: '32px 0',
            gap: 24,
        },
        headerItem: {
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            fontWeight: fontWeights.bold,
            opacity: 0.5,
            ...cStyles.noneUserSelect,
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
        boxRightSix: {
            width: 'auto !important',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 24,
        },
        boxItemSix: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 273,
            width: '100%',
            height: 120,
            borderRadius: borderRadiuses.big,
            border: `1px solid ${info[100]}`,
            backgroundColor: background.input,
            boxSizing: 'border-box',
            cursor: 'pointer',
            '&:hover': {
                border: `1px solid ${primary.main}`,
            },
            '& img': {
                width: '40%',
                height: 56,
                objectFit: 'contain',
            },
        },

        // Common
        caption: {
            fontSize: 24,
            fontWeight: fontWeights.bold,
            '&.opacity': {
                opacity: 0.5,
                fontWeight: 'unset',
            },
        },
        bigCaption: {
            fontSize: 32,
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