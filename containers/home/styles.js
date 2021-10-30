import { borderRadiuses, cStyles, fontWeights } from '@styles/theme';
import { toRgbA } from '@utils/StyleUtils';


export const styles = theme => {
    const { primary, text, background, info, success, common } = theme.palette;
    console.log("TCL: theme.palette", theme.palette)
    return {
        wrapper: {
            width: '100%',
            height: '100%',
            // backgroundColor: primary.main,
            // height: 80,
            // color: common.white,
            // backgroundColor: primary.main,
            // display: 'flex',
            // justifyContent: 'center',
            // position: 'fixed',
            // top: 0,
            // left: 0,
        },



        container: {
            width: 1166,
            height: 'auto',
            boxSizing: 'border-box',
            margin: '0 24px',
        },


        boxSecOne: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 688,
            marginTop: 96,
            backgroundColor: primary.main,
            overflow: 'hidden',
        },
        secOneContent: {
            color: common.white,
            '&>:first-child': {
                fontSize: 32,
                fontWeight: fontWeights,
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
                fontWeight: fontWeights,
                marginBottom: 8,
            },
            '&>:nth-child(2)': {
                fontSize: 24,
                opacity: 0.5,
                marginBottom: 48,
            },
        },
        secTwoDes: {
            height: 'fit-content',
        },
        secTwoItem: {
            display: 'flex',
            flexDirection: 'column',
            '&>:first-child': {
                display: 'flex',
                alignItems: 'center',
                marginBottom: 6,
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
                fontWeight: fontWeights,
                marginBottom: 48,
            },
            '&>:nth-child(2)': {
                // fontSize: 24,
                // opacity: 0.5,
                // marginBottom: 48,
            },
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