# vue-common-cli
基于vue+webpack+nodejs的前端打包系统，本项目是使用yarn安装依赖库，所以使用前请安装yarn，或自己手动使用npm安装



#### 目录结构

- tpls —— 存放生成html的模板文件
- projects —— 工作目录，存放已创建的的项目
- base —— 存放公共的库文件
- node_modules —— node引入模块
- modules ——打包配置
  - config
    - alias.js —— 别名配置
    - libs.js —— 项目中可引用的库
    - loaders.js —— 配置webpack中的loader
    - plugins.js —— 配置webpack中的plugin
  - config.js —— webpack全局配置
  - tools.js —— 用到的全局函数
- package.json —— npm的配置文件
- babelrc ——babel配置
- postcss.config.js —— postcss配置
- gitignore —— git忽略文件
- server.js —— 本地服务器配置
- webpack.config.js ——webpack的入口配置文件


#### projects中项目目录结构

- src —— 存放源文件
  - main.js —— 入口文件，必须
  - view.js —— 配置页面信息及需引入的库，必须
  - proxy.js —— 项目本地代理设置，非必须
- online —— 存放生产环境打包的代码

#### 安装

1. 将本项目克隆到本地，执行`yarn install`安装依赖的模块
2. 在本项目根目录下新建projects目录

#### modules下config.json配置项

```json
{
    "sourceMap":{
        "prodSourceMap":false,     //生产环境是否开启sourcemap
        "devJsSourceMap":true,	   //开发环境开启js sourcemap
        "devCssSourceMap":true	   //开发环境开启css sourcemap
    },

    "tools":{
        "autoOpenBrowser":true,    //开启服务器时，是否自动打开浏览器
        "openUrl":"http://localhost:3001",  //自动打开的URL
        "autoReload":true		  //是否自动刷新浏览器
    }
}
```



#### 使用

——开发——

1. 在projects目录下新建项目，项目结构如上描述，项目demo：[查看demo](https://github.com/okmengzhilin/vue-common-cli-demo)

2. 配置view.js，如下所示

   ```javascript
   module.exports = {
      title:'index',    //页面标题
      hash:false,		//是否为引入的静态资源添加hash
      libs:["vue"],   //页面中用到的库，值是libs.js中配置的库的子集，添加后可统一打包
      filename:'index.html',        //生成的html文件名
      template:'tpls/tpl.html',     //页面使用的模板
      inject:'body'				//chunks插入到页面的位置
   }
   ```

3. 配置main.js，该文件为入口文件

4. 如需要添加本地代理，按上面项目结构创建proxy.js文件，配置如下：

   ```javascript
   var proxyList = {
       "/api-path":{
           target: 'http://hostname:port', // 代理的目标服务器
           cookieDomainRewrite:{
               "example.com":"example.com"
           },
           proxyTimeout:10000,
       }
   };

   module.exports = proxyList
   ```

   ​

5. 在本项目根目录执行`yarn run dev -n project-name -p 3001`进入开发模式，-p默认为3000端口（可不写），也可写成`yarn run dev --name=project-name --port=3001`

6. 例如apps目录下有名称为project的项目：`yarn run dev -n project -p 3001` ，在浏览器中访问localhost:3001

——线上打包——

执行`yarn run build -n project-name` 进行生产环境打包，打包代码存放在项目中的online目录