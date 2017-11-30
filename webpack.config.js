var path = require("path");

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var tools = require(path.join(__dirname,"modules/tools.js"));
var {e,n,p} = tools.getCliParams();
var config = tools.getConfig();

var plugins = require(path.join(__dirname,"modules/config/plugins.js"));
var loaders = require(path.join(__dirname,"modules/config/loaders.js"));
var alias = require(path.join(__dirname,"modules/config/alias.js"));
var allLibs = require(path.join(__dirname,"modules/config/libs.js"));
var useLibs = require("./projects/"+n+"/src/view.js").chunks;


var entry = {};
useLibs.forEach(item => {
    entry[item] = allLibs[item];
});
entry["main"] = [
    path.join(__dirname,"./projects/"+n+"/src/main.js")
]

if(e === "develop"&&config.tools.autoReload){
    for(let key in entry){
        entry[key].unshift('webpack-hot-middleware/client?reload=true')
    }
}

var webpackConfig = {
	devtool:(e==="production")?(config.sourceMap.prodSourceMap?"#source-map":false):(config.sourceMap.devJsSourceMap?"#cheap-module-eval-source-map":false), 
	entry:entry,
	output:{
		path:path.join(__dirname,"./projects/"+n+"/online"),
        filename:'js/[name].bundle.js',
    },
    module:{
        rules:loaders
    },
    plugins: plugins,
    resolve:{
		alias:alias,
	},
};

module.exports = webpackConfig;