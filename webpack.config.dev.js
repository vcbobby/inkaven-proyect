const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const copyPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@styles': path.resolve(__dirname, 'src/css/'),
            '@templates': path.resolve(__dirname, 'src/templates/')
        }
    },
    stats: {
        children: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
            },
            {
                test: /\.png|.jpg/,
                type: 'assets/resource'
            },
            {
                test: /\.css|.styl$/i,
                use: [miniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: true,
            template: './src/html/index.html',
            filename: './index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/imgs"
                },
                {
                    from: path.resolve(__dirname, "src", "assets/icons"),
                    to: "assets/icons"
                },
                {
                    from: path.resolve(__dirname, "src", "assets/logos"),
                    to: "assets/logos"
                },
            ]
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3006,
    },
}