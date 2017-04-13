/**
 * Created by Wolf on 2017/2/13.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './index.js',

        //用于辅助提取第三方库
        vendor_explicit:['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        publicPath:'/public/',
        //需要将整个应用导出为库的时候使用，详情见官方文档
        // library:'es6',
        // libraryTarget:'var'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['react','es2015'],
                    plugins: ['transform-runtime']
                }
            },
            // {
            //     test: /\.html$/,
            //     loader: "html-loader",
            //     options:{
            //         minimize: true
            //     }
            // }
        ]
    },
    //externals:['react','react-dom','moment'],//不需要bundle的库 用于自己开发库使用
    target:'web',
    //找到打包前的程序位置，方便调试
    devtool: "val-source-map",
    //是否开启实时监听
    // watch:true,
    // watchOptions: {
    //     // aggregateTimeout: 1000, //编译的延迟
    //     ignored: /node_modules/,//忽略不必要的文件
    //     // poll: 500 // 轮询监听
    // },
    //webpack-dev-server 配置相关
    devServer: {
        port: 8080,
        hot: true,
        inline:true
    },
    plugins: [
        //将moment模块抛出为全局变量M供使用
        // new webpack.ProvdePlugin({
        //     M: 'moment'
        // }),
        //用于第三方库的分离 公共模块的提取
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.HotModuleReplacementPlugin(),// 用于热更新
        new webpack.NamedModulesPlugin()
    ],
};