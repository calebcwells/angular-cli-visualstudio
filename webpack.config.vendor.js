const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('vendor.css');

module.exports = (env) => {
    const isDev = !(env && env.prod);
    const config = {
        resolve: {
            extensions: ['.js']
        },
        entry: {
            vendor: [
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'jquery'
            ]
        },
        output: {
            path: path.join(process.cwd(), 'wwwroot'),
            filename: '[name].js',
            library: '[name]'
        },
        module: {
            loaders: [
                { test: /\.css/, use: extractCss.extract(['css-loader']) },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                    use: 'url-loader?limit=100000&name=[name].[ext]'
                },
                { test: /\.json$/, use: 'json-loader' }
            ]
        },
        plugins: [
            extractCss,
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
            new webpack.DllPlugin({
                path: path.join(process.cwd(), 'wwwroot', '[name]-manifest.json'),
                name: '[name]'
            })
        ].concat(isDev ? [] : [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })])
    };
    return config;
};
