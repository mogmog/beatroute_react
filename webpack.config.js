"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = (_env, args) => {
    const prod = args.mode === "production";
    return {
        context: __dirname,
        devServer: {
            hot: true,
            port: 3000,
            open: true,
        },
        devtool: !prod ? void 0 : "eval-source-map",
        entry: ["./src/index2"],
        mode: prod ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            plugins: prod ? [] : ["react-refresh/babel"],
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                    use: ["url-loader"],
                },
                ...[
                    prod
                        ? {
                            // Strip cesium pragmas
                            test: /\.js$/,
                            enforce: "pre",
                            include: path.resolve(__dirname, cesiumSource),
                            use: [
                                {
                                    loader: "strip-pragma-loader",
                                    options: {
                                        pragmas: {
                                            debug: false,
                                        },
                                    },
                                },
                            ],
                        }
                        : {},
                ],
            ],
        },
        output: {
            path: path.join(__dirname, "build"),
        },
        plugins: [
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify("/"),
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(cesiumSource, cesiumWorkers),
                        to: "Workers",
                    },
                    {
                        from: path.join(cesiumSource, "Assets"),
                        to: "Assets",
                    },
                    {
                        from: path.join(cesiumSource, "Widgets"),
                        to: "Widgets",
                    },
                ],
            }),
            new HtmlPlugin({
                template: "index.html",
            }),
            ...(prod ? [] : [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]),
        ],
        resolve: {
            alias: {
                cesium$: "cesium/Cesium",
                cesium: "cesium/Source",
            },
        },
    };
};
