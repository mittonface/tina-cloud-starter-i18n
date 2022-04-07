const withSvgr = require("next-svgr");

module.exports = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL", "nl-BE"],
    defaultLocale: "en-US",
  },
  ...withSvgr({
    async rewrites() {
      return [
        {
          source: "/",
          destination: "/home",
        },
      ];
    },
  }),
};