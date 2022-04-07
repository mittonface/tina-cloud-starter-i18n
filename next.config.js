const withSvgr = require("next-svgr");

module.exports = withSvgr({
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US'
  }
});
