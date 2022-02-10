const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        app: './scripts/main.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
        hot: true,
        watchFiles: ['src/**/*'],
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './html/index.html',
            filename: 'index.html',
            title: 'Gallery',
        }),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       from: path.resolve(__dirname, 'src/assets'),
        //       to: path.resolve(__dirname, 'dist/assets'),
        //       noErrorOnMissing: true,
        //     },
        //   ],
        // }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['postcss-preset-env', 'autoprefixer'],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /.(png|svg|gif|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /.(ttf|otf|eot|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx|js)?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         [
                    //             '@babel/preset-env',
                    //             {
                    //                 useBuiltIns: 'usage',
                    //                 corejs: 3,
                    //             },
                    //         ],
                    //         '@babel/preset-typescript',
                    //     ],
                    // },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
