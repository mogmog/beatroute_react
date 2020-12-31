const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

const projectsRoot = __dirname + "/"

// Don't open the browser during development (prevent new browser tab on every restart)
process.env.BROWSER = "none";

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar({ profile: true }),
      ...(process.env.NODE_ENV === "development"
          ? [new BundleAnalyzerPlugin({ openAnalyzer: false })]
          : [])
    ]
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {

        customizeThemeLessPath: path.join(
            projectsRoot,
            "src/customTheme.less"
        )
      }
    }
  ]
};
