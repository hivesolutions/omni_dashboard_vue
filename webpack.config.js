const path = require("path");
const webpack = require("webpack");

const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js?[hash]",
        library: "OmniDashboard"
    },
    plugins: [
        new ManifestPlugin({}),
        new HtmlWebpackPlugin({
            title: "Omni Dashboard",
            template: "index.html.tpl",
            cache: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: false,
                preserveLineBreaks: false
            }
        }),
        new WebpackPwaManifest({
            name: "Omni Dashboard",
            short_name: "OmniDashboard",
            description: "Sales Dashboard for Omni",
            background_color: "#6d6d6d",
            icons: []
        })
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    js: "babel-loader!eslint-loader"
                }
            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                query: {
                    presets: ["env"]
                }
            }, {
                loader: "eslint-loader"
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            }, {
                loader: "extract-loader"
            }, {
                loader: "html-loader",
                options: {
                    minimize: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: false,
                    preserveLineBreaks: false
                }
            }]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]?[hash]"
            }
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: "file-loader"
        }]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 3000,
        stats: "minimal",
        hot: true
    },
    performance: {
        hints: false
    },
    devtool: "inline-source-map"
};

if (process.env.NODE_ENV === "production") {
    module.exports.devtool = "source-map";
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]);
} else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })
    ]);
}
