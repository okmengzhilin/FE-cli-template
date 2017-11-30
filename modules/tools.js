var path = require("path");
var fs = require('fs');
var yargs = require("yargs");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    getCliParams(){
        var argv = yargs
                .alias('e', 'env')
                .alias('n', 'name')
                .alias('p', 'port')
                .argv;
        return argv;
    },
    getConfig(){
        var data = fs.readFileSync(path.join(__dirname,"config.json"));
	    return JSON.parse(data);
    },

    getVueCssLoader(loader,isProduction){
        var cssConfig = {
            fallback:'vue-style-loader',
            use:[
                { 
                    loader: 'css-loader', 
                    options: {
                        "minimize": isProduction,
                        "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                    } 
                },
                {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                    }
                }
            ]
        }

        if(loader!=="css"){
            cssConfig.use.push({
                loader:loader+'-loader',
                options:{
                    "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                }
            })
        }

        if(!isProduction){
            cssConfig.use.unshift("vue-style-loader");
            return cssConfig.use;
        }else{
            return ExtractTextPlugin.extract(cssConfig)
        }
        
        
    },

    getCssLoader(loader,isProduction){
        var cssConfig = {
            fallback:'style-loader',
            use:[
                { 
                    loader: 'css-loader', 
                    options: {
                        "minimize": isProduction,
                        "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                    } 
                },
                {
                    "loader": "postcss-loader",
                    "options": {
                        "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                    }
                }
            ]
        }

        if(loader!=="css"){
            cssConfig.use.push({
                loader:loader+'-loader',
                options:{
                    "sourceMap": (isProduction&&this.getConfig().sourceMap.prodSourceMap)||(!isProduction&&this.getConfig().sourceMap.devCssSourceMap)
                }
            })
        }

        if(!isProduction){
            cssConfig.use.unshift("style-loader");
            return cssConfig.use;
        }else{
            return ExtractTextPlugin.extract(cssConfig)
        }
    }
}