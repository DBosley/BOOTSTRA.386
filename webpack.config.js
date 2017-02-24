const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname);
const root = path.join.bind(path, ROOT);

const isDev = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development';
const config = {
    entry: {
        "386": ['./js/386.js', './less/bootstrap.less']
    },
    devtool: 'source-map',

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        path: root('dist')
    },
    module: {
        rules: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                }),
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [root('demo/index.html')]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=img/&outputPath=img/'
            },
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=fonts/&outputPath=fonts/',
            }

        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'demo/index.html',
            chunksSortMode: 'dependency',
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new ExtractTextPlugin('[name].css'),
    ],
};
module.exports = config;