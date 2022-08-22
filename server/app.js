const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const cors = require("koa2-cors");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const log4j = require("./logger/index.js");

const monitor = require("./routes/monitor");
const sdkRoute = require("./routes/r-sdk");
const staticRoute = require("./routes/staticError");

// error handler
onerror(app);

// 中间件
//相当于原生nodejs里处理传入数据（chunk）
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
//自动将数据转成json
app.use(json());
//日志
app.use(logger());
//静态文件服务，public下的文件可以直接访问,webpack打包应该是放在这里
app.use(require("koa-static")(__dirname + "/public"));
//服务端模板引擎，用不到
app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
//写入日志
app.use(async (ctx, next) => {
  if (ctx.method === "GET") log4j.info(`${ctx.method}|${ctx.url}`);
  else
    log4j.info(`${ctx.method}|${ctx.url}|${JSON.stringify(ctx.request.body)}`);
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//允许跨域
app.use(cors());

/**--------------------------------------------------------------------------router--------------------------**/
/** 测试路由**/
app.use(monitor.routes(), monitor.allowedMethods());
/** sdk数据上传路由 **/
app.use(sdkRoute.routes(), sdkRoute.allowedMethods());

app.use(staticRoute.routes(), staticRoute.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

app.listen(3005);

module.exports = app;
