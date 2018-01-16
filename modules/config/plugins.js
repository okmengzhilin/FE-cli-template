var path = require("path");

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var tools = require(path.join(__dirname,"../tools.js"));
var {e,n,p} = tools.getCliParams();
var config = tools.getConfig();

var pageInfo = require(path.join(__dirname,"../../projects/"+n+"/src/view.js"));
if(e === "production"){
    pageInfo.hash = true;
}

pageInfo.chunks = ["vendor","main"];

//配置插件
var plugins = [
    //生成HTML
    new HtmlWebpackPlugin(pageInfo),

    //提取相同js文件中相同的部分
    new webpack.optimize.CommonsChunkPlugin({
        // names:useLibs,
        name:"vendor",
        filename:"js/vendor.bundle.js",
        minChunks: Infinity,
    })
]

if(e === "production"){
    //js混淆
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings:false,
            drop_console:true,
        }
    }));

    //将css单独倒出到文件
    plugins.push(new ExtractTextPlugin({
        filename:'css/[name].css',
        allChunks:true,
    }));
}

if(e === "develop"&&config.tools.autoReload){
    //热替换
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = plugins;