/**
 *@Author: hy-zhangb
 *Date: 2018/5/7 10:41
 * @Last Modified by: jiannan.lv
 * @Last Modified time: 2019-05-09 11:44:29
 *Email: lovewinders@163.com
 *File Path: Machine-Learning - webpack.config
 *@File Name: webpack.config
 *@Description: Description
 */
const configs = require('./product.config');

const path = require('path');
const webpack = require('webpack');

// ----------------------------------
// get dev || pro Configuration
// ----------------------------------
const {
    env,
    DIR_BASE_PATH,
    COMPILER_DEVTOOL,
    COMPILER_PUBLIC_PATH,
    paths: { assignPath, client, dist },
    DIR_DIST_JS,
    COMPILER_HASH_TYPE,
    // DIR_DIST,
    globals: { __DEV__ }
} = configs;

const webpackAssignConfigs = __DEV__ ? require('./webpack.config.dev') : require('./webpack.config.pro');

// ----------------------------------
// entry Configuration
// ----------------------------------
const entry = {
    ...webpackAssignConfigs.entry
};
// ----------------------------------
// output Configuration
// ----------------------------------
const output = {
    // 打包产出后文件存放位置
    path: dist,
    // entry chunk产出时的文件名称
    filename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.js`,
    // async chunk产出时的文件名称
    chunkFilename: `${DIR_DIST_JS}/[name].${COMPILER_HASH_TYPE}.chunk.js`,
    publicPath: COMPILER_PUBLIC_PATH
};

// ----------------------------------
// output Configuration
// ----------------------------------
const devtool = COMPILER_DEVTOOL;

// ----------------------------------
// resolve Configuration
// ----------------------------------
const resolve = {
    extensions: ['.js', '.vue', '.json', '.scss', '.css', '.styl', '.sass', '.less'],
    alias: {
        app: client,
        react: path.join(process.cwd(), 'node_modules/react'),
        'react-dom': path.join(process.cwd(), 'node_modules/react-dom'),
        'prop-types': path.join(process.cwd(), 'node_modules/prop-types'),
        lodash: path.join(process.cwd(), 'node_modules/lodash'),
        public: path.join(process.cwd(), 'public')
    }
};

// ----------------------------------
// module Configuration
// ----------------------------------
const modules = {
    rules: [
        {
            test: /\.js|jsx$/,
            include: [client],
            exclude: [dist, assignPath(DIR_BASE_PATH, 'node_modules')],
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        },
        {
            test: /\.vue$/,
            include: [client],
            exclude: [dist, assignPath(DIR_BASE_PATH, 'node_modules')],
            use: [
                {
                    loader: 'vue-loader'
                }
            ]
        },
        // rules Configuration
        ...webpackAssignConfigs.module.rules
    ]
};

// ----------------------------------
// optimization Configuration
// ----------------------------------
const optimization = webpackAssignConfigs.optimization;

// ----------------------------------
// plugins Configuration
// ----------------------------------
const plugins = [
    new webpack.DllReferencePlugin({
        context: DIR_BASE_PATH,
        manifest: require('./vendors-manifest.json')
    }),
    new webpack.DefinePlugin(configs.globals),
    // plugins Configuration
    ...webpackAssignConfigs.plugins
];

// ----------------------------------
// webpack Config Configuration
// ----------------------------------
const webpackConfig = {
    cache: true,
    mode: env,
    entry,
    output,
    devtool,
    resolve,
    optimization,
    plugins,
    module: modules
};

module.exports = webpackConfig;
