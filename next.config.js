const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer'); // # Analyze is done on build when env var is set // ANALYZE=true yarn build
const { withRasterImages, withPlayback, withFonts, withSVG } = require('@moxy/next-common-files');

module.exports = withPlugins([
    withRasterImages(),
    withPlayback(),
    withFonts(),
    withSVG(),
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
]);