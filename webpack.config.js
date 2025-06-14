const path = require('path');//nodejs核心模块，专门用来处理路径问题
module.exports = {
    //模式
    mode: 'development',
    //入口
    entry: './main.js',
    //输出
    output: {
        //文件的输入路径
        path: path.resolve(__dirname, 'dist'),
        //文件名
        filename: 'main.js',
    },

    //加载器
    module: {
        rules: [
            {
                test: /\.css$/i,//只检测.css文件
                use: [
                    //执行顺序：从右到左（从上到下）
                    'style-loader',//将js中css通过创建style标签添加到html文件中生效
                    'css-loader',//将css资源编译成commonjs的模块到js中
                ],
            },
            {
                test: /\.js$/,                 // 匹配 .js 文件
                exclude: /node_modules/,        // 排除 node_modules
                use: {
                    loader: 'babel-loader',       // 使用 babel-loader
                    options: {
                        cacheDirectory: true,       // 启用缓存提升构建速度
                        presets: [['@babel/preset-env', {modules:false}]]
                    }
                }
            }
        ],
    },
    //插件
    plugins: [

    ],
    //模式
    mode: 'development',
};