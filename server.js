const express = require('express');
const app = express();

const path = require("path");
const yargs = require("yargs");
const opn = require('opn');

const proxy = require('http-proxy-middleware');
const bodyParser = require("body-parser");

const tools = require("./modules/tools.js");
const {e,n,p} = tools.getCliParams();
const config = tools.getConfig();

const router = require("./api/router.js");
const api = require("./api/api.js");

const proxyList = require("./modules/config/proxy.js");

var webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");


// 配置请求参数处理工具
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//路由设置
app.use("/gui/",router);
app.use("/api/",api);

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


