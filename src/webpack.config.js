var IsDev = process.argv.indexOf('--env.prod') < 0;
var Path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
    cache: true,
    devtool: IsDev ? 'eval' : null,
    entry: {
        main: ['./Client/main.ts']
    },
    output: {
        path: Path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' }),
        new ForkCheckerPlugin(),
        new Webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(IsDev ? [] : [
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.optimize.UglifyJsPlugin()
    ]),
    module: {
        loaders: [
            { test: /\.ts$/, exclude: [/\.(spec|e2e)\.ts$/], loaders: ['awesome-typescript', 'angular2-template'] },
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/, loader: [ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' }), 'to-string-loader', 'css-loader'] },
            { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(jpeg|jpg|gif|png|json)$/, loaders: ['file-loader?name=[name].[ext]'] }
        ]
    },
    profile: true,
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: Path.resolve(__dirname, 'Client'),
        modulesDirectories: ['node_modules']
    }
};
