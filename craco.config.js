const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
//const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");

const enableCKEWebpackConfigPlugin = (webpackConfig, { env, paths }) => {
  // Extract the oneOf array from the relevant webpack.module.rules object
  let oneOf;
  let ix;
  ix = webpackConfig.module.rules.findIndex(item => {
    return item.hasOwnProperty("oneOf");
  });
  oneOf = webpackConfig.module.rules[ix].oneOf;

  // Add the SVG and CSS loaders to the oneOf array
  const additions = [
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: ["raw-loader"]
    },
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
      use: [
        {
          loader: "style-loader",
          options: {
            injectType: "singletonStyleTag"
          }
        }

      ]
    }
  ];
  additions.forEach((item, index) => {
    oneOf.push(item);
  });

  // Modify cssRegex
  let loader;
  loader = oneOf.find(item => {
    if (item.test !== undefined)
      return item.test.toString() === cssRegex.toString();
  });
  loader.exclude = [cssModuleRegex, /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/];

  // Modify cssModuleRegex
  loader = oneOf.find(item => {
    if (item.test !== undefined)
      return item.test.toString() === cssModuleRegex.toString();
  });
  loader.exclude = [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/];

  // Modify file-loader
  loader = oneOf.find(item => {
    if (item.loader !== undefined)
      return (
        item.loader.toString() === require.resolve("file-loader").toString()
      );
  });
  loader.exclude = [
    /\.(js|mjs|jsx|ts|tsx)$/,
    /\.html$/,
    /\.json$/,
    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
  ];

  // Always return a config object.
  return webpackConfig;
};

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
    alias: {},
    plugins: [

    ],
    configure: (webpackConfig, { env, paths }) => {
      return enableCKEWebpackConfigPlugin(webpackConfig, { env, paths });
    }
  }
};
