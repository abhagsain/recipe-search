const env = require('dotenv').config();
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotEnv = require('dotenv-webpack');
module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    mode: 'development',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Generated Webpack',
            filename: 'index.html',
            template: './src/index.html'
        }),
        new dotEnv()
    ],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
}