const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');

module.exports = (env) => {
    const isDev = !(env && env.prod);
    const config = {
        cache: true,
        devtool: isDev ? 'source-map' : false,
        performance: isDev ? { hints: false } : { hints: 'warning' },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                './node_modules'
            ]
        },
        resolveLoader: {
            modules: [
                './node_modules'
            ]
        },
        entry: {
            main: [
                './src/main.ts'
            ],
            polyfills: [
                './src/polyfills.ts'
            ],
        },
        output: {
            path: path.join(process.cwd(), 'wwwroot'),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.(eot|svg)$/,
                    use: 'file-loader?name=[name].[ext]'
                },
                {
                    test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1500,
                                name: '[name].[ext]'
                            }
                        }]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer()
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.ts$/,
                    use: ['awesome-typescript-loader', 'angular2-template-loader']
                }
            ]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DllReferencePlugin({
                manifest: require('./wwwroot/vendor-manifest.json')
            }),
            new ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html',
                hash: false,
                inject: true,
                compile: true,
                favicon: false,
                minify: false,
                cache: true,
                showErrors: true,
                chunks: 'all',
                excludeChunks: [],
                title: 'Typhon Group',
                xhtml: true,
                chunksSortMode: 'auto'
            }),
            new BaseHrefWebpackPlugin({})
        ].concat(isDev
            ? []
            : [
                new webpack.optimize.UglifyJsPlugin()
            ]),
        node: {
            fs: 'empty',
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
    return config;
};
