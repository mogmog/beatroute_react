const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

module.exports = {

  plugins: [

    {
      plugin: require("craco-cesium")(),

    },

    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
            __dirname,
            "src/customTheme.less"
        )
      }
    }
  ],

  webpack: {
    headers: {
    }
  }
};
