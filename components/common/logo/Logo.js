import React from 'react';

import { i18nText } from '@libs/i18n';

import ImageViewer from '../image-viewer';

const logos = {
    color: [
        // require('@assets/images/logo/logo_circle_main.svg'),
        // require('@assets/images/logo/logo_full_main.svg'),
    ],
    white: [
        // require('@assets/images/logo/logo_circle_white.svg'),
        // require('@assets/images/logo/logo_full_white.svg'),
    ],
};

const Logo = ({ className, onClick, color = 'color' }) => {
    return (
        <div style={styles.wrapper} {...{ className, onClick }}>
            {/* <ImageViewer src={logos[color][0]} size={40} svg /> */}
            <div style={styles.container}>
                {/* <ImageViewer src={logos[color][1]} style={{ height: 20, width: 'auto' }} svg /> */}
                <span style={styles.text}>
                    {i18nText('Nền tảng quản lý giao tiếp đa kênh')}
                </span>
            </div>
        </div>
    )
};

const styles = {
    wrapper: {
        left: 0,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    container: {
        height: 40,
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        opacity: 0.5,
        fontSize: 14,
        lineHeight: '16px',
    },
};

export default Logo;