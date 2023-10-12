// next.config.js
const withTwin = require('./withTwin.js')
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
    reactStrictMode: true,
    images: {
        domains: ['pbs.twimg.com'],
    },
    experimental: {
        appDir: true,
    },
})
