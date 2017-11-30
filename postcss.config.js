var path = require("path");
var tools = require(path.join(__dirname,"modules/tools.js"));

module.exports = {
    sourceMap:(process.env.NODE_ENV==="production"&&tools.getConfig().sourceMap.prodSourceMap)||(process.env.NODE_ENV==="develop"&&tools.getConfig().sourceMap.devCssSourceMap),
	plugins:[
        require('autoprefixer')({  
            browsers: ['ie>=8','>1% in CN']  
        })
    ]
}