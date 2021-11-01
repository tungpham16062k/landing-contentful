import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { ServerStyleSheets } from '@mui/styles';

import { SeoConfigs } from '@constants/index';

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheets = new ServerStyleSheets();
        const initialProps = await Document.getInitialProps(ctx);
        ctx.renderPage = () => ctx.renderPage({ enhanceApp: App => (props) => sheets.collect(<App {...props} />) });
        return {
            ...initialProps,
            initialSeoConfig: SeoConfigs[ctx.pathname],
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
    }

    render() {
        const { initialSeoConfig } = this.props;
        const seoConfig = initialSeoConfig || SeoConfigs.default;
        return (
            <Html lang='vi'>
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" ></link>
                    {/* START: favicon */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
                    <link rel="manifest" href="/static/favicon/site.webmanifest" />
                    <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
                    <meta name="theme-color" content="#000000" />
                    {/* END: favicon */}
                    {/* START: custom header */}
                    <meta name="google-site-verification" content="dIVNp5fejyQNlVKoFDPf9MBHucUBy3yuOy3I3-k_GEE" />
                    <link rel="canonical" href={seoConfig.canonical} />
                    <meta name="description" content={seoConfig.description} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@smatestore" />
                    <meta name="twitter:creator" content="@kds(minhnguyenkhoi)" />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="vi_VN" />
                    <meta property="og:site_name" content="Smatestore" />
                    <meta property="og:url" content={seoConfig.canonical} />
                    <meta property="og:title" content={'OMICRM | ' + seoConfig.title} />
                    <meta property="og:description" content={seoConfig.description} />
                    <meta property="og:image" content={seoConfig.image} />
                    <meta property="og:image:alt" content="" />
                    <meta property="og:image:width" content="800" />
                    <meta property="og:image:height" content="600" />
                    {/* END: custom header */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }

}