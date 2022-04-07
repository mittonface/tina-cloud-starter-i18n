const withSvgr = require("next-svgr");

module.exports = {
  i18n: {
    locales: ["en-US", "fr"],
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