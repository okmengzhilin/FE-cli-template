var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var tools = require(path.join(__dirname,"../tools.js"));
var {e,n,p} = tools.getCliParams();
var config = tools.getConfig();

var loader = [
    {   
        //.vue文件编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                js: 'babel-loader',
                css:tools.getVueCssLoader("css",e==="production"),
                scss:tools.getVueCssLoader("sass",e==="production"),
                sass:tools.getVueCssLoader("sass",e==="production"),
                less:tools.getVueCssLoader("less",e==="production"),
            }
        }
    },
    {   //babel，编译es6,jsx
        test:/\.(js?)$/,
        loader:'babel-loader',
        include: [
            path.resolve(__dirname, '../../projects'),
        ],
    },

    //css,scss,sass,less
    {   
        test:/\.css$/,
        loader:tools.getCssLoader("css",e==="production"),
    },
    {
        test:/\.(scss|sass)$/,
        loader:tools.getCssLoader("sass",e==="production"),
    },
    {
        test:/\.less$/,
        loader:tools.getCssLoader("less",e==="production"),
    },

    //图片处理
    {   
        test:/\.(png|jpg|gif|jpeg)$/,
        loader:'url-loader',
        options:{
            limit:10000,
            name:"images/[name].[ext]",
        }
    },

    //字体文件处理
    {   
        test:/\.(svg|woff|ttf|eot)$/,
        loader:'url-loader',
        options:{
            limit:10000,
            name:"fonts/[name].[ext]",
        }
    },
];


module.exports = loader;