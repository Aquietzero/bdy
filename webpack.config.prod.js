const path = require('path');
const webpack = require('webpack');

// TODO
// use (https://webpack.js.org/plugins/commons-chunk-plugin/)
// to wrap commonly used libs.

module.exports = {
    entry: {
        vendors: [
            'vue/dist/vue',
        ],
        index: './public/javascripts/pages/index/index.js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.bundle.js",
            path: path.resolve(__dirname, './public/build/js'),
            // (Give the chunk a different name)
            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        }),
        new webpack.optimize.UglifyJsPlugin({})
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build/js')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader?presets[]=es2015',
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.sass$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
                options: {
                    name: 'stylesheets/[hash].[ext]'
                }
            }]
        }, {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: '/build/images/[hash].[ext]'
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: false,
                },
            }]
        }]
    }
};
