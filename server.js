
const express = require('express');
const app = express();

const path = require("path");

const opn = require('opn');

const tools = require("./modules/tools.js");
const {e,n,p} = tools.getCliParams();
const config = tools.getConfig();

const proxy = require('http-proxy-middleware');
let proxyList = [];
try{
    proxyList = require(path.join(__dirname,"./projects/"+n+"/src/proxy.js"));
}catch(err){
    console.log("未添加本地代理")
}


var webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

//设置端口
app.set('port', p?p:3000);

// webpack配置
if(e === "develop"){
    var compiler = webpack(webpackConfig);
    var webpackDev = require('webpack-dev-middleware')(compiler, {
        publicPath: "/"
    });
    var webpackHot = require('webpack-hot-middleware')(compiler);
    
    app.use(webpackDev);
    
    if(config.tools.autoReload){
        app.use(webpackHot);
    }
    
    if(config.tools.autoOpenBrowser){
        opn(config.tools.openUrl);
    }

    // 创建proxy
    Object.keys(proxyList).forEach((item)=>{
        app.use(proxy(item,proxyList[item]))
    })

    //监听端口
    app.listen(app.get('port'), () => {
        console.log("服务已开启，端口号"+app.get('port'))
        if(config.tools.autoOpenBrowser){
            opn(config.tools.openUrl);
        }
    });
}else{
    webpack(webpackConfig,(err, stats)=>{
        if (err) throw err;
        process.stdout.write(stats.toString() + '\n\n');
    });
}