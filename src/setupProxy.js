const { createProxyMiddleware } = require('http-proxy-middleware');
// 反向代理用于请求数据，ajax请求被反向代理拦截到猫眼
// 然后重启服务器后才会生效
module.exports = function(app) {
  app.use(
    '/ajax',
    createProxyMiddleware({
      target: 'https://m.maoyan.com',
      changeOrigin: true,
    })
  );

};
