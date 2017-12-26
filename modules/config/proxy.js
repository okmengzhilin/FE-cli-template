var proxyList = {
    "/api":{
        target: 'http://eg.com', // 代理的目标服务器
        cookieDomainRewrite:{},
        proxyTimeout:10000,
    }
};

module.exports = proxyList