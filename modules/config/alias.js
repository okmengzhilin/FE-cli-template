var path = require("path");

var tools = require(path.join(__dirname,"../tools.js"));
var {n,p} = tools.getCliParams();

// 引入模块别名
var alias = {
    vue$:"vue/dist/vue.js",
    vuerouter$:"vue-router/dist/vue-router.js",
    "@src":path.join(__dirname,"../../projects/"+n+"/src")
    
}

module.exports = alias;