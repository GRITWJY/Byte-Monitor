# 前端监控项目后端

## 加载依赖 
 * npm install

## 启动项目 
 * npm run start(更改需重启)
 * npm run dev(nodemon插件 更改内容自动重启服务)

### 我用的koa2的脚手架搭的根地址就是bin目录下的www，然后功能引入在app.js 

### 已经允许跨域了，随便访问

### 需要编写的内容及方法
参考routes文件下的staticError.js和monitor.js,

需要自己编写sql语句，不会的可以问我，找到自己负责的内容，

如果是请求数据就用get方法,ctx.request.query可以获得url的参数，解构取值，

具体还是看文件注释吧,写完routes里的文件后需要在根目录下的app.js导入中间件，

在10行导入依赖，在42行以后照着写（导入中间件）就行

### selectData是查询函数，addData是插入函数，没有本质区别就是返回值不一样，因为每个请求的内容不太一样，所以不太好封装（主要是我不会）

### 我也是边看边写的，有什么优化或者建议都可以说



## 接口的 model + controller 编写方法

一个完整的接口包括:  route + controller + model

- route: 指定路由, 以及要调用什么 controller

- controller: 处理这个接口的所有逻辑

- model: 与 sql 进行直接交互的

例子可以看 routes 中的 r-sdk, 这个是sdk数据上报的接口
### 第一步: 指定路由, 和 调用 controller 里的方法
```javascript
router.post("/transportData", sdkController.addData);
```

### 第二步: 编写接口逻辑

我这里是根据传过来的 `category`, 去决定调用哪个 `model` 方法

注意: 接口的返回用我封装的 success  和 error 函数, 具体可看 utils/response.js
```javascript
exports.addData = async (ctx) => {
  let data = ctx.request.body;

  await Promise.all(
    data.map((da) => {
      switch (JSON.parse(da.category)) {
        case "error":
          return sdkModel.addJSError(da);
        case "behavior":
          return sdkModel.addBehavior(da);
        case "xhr":
          return sdkModel.addXHR(da);
        case "router":
          return sdkModel.addRoute(da);
        case "performance":
          return sdkModel.addPerformance(da);
        default:
          return [];
      }
    })
  )
    .then((res) => {
      response.success(ctx, res);
    })
    .catch((err) => {
      response.error(ctx, err);
      ctx.body = err;
    });
};
```


### 第三步: 编写相应的SQL语句
```javascript
// 添加JS错误
exports.addJSError = (data) => {
  let { userId, appId, msg, type, selector, extra = null, page, stack } = data;
  stack = JSON.stringify(stack);
  extra = JSON.stringify(extra);
  let _sql = `INSERT INTO error (user_id, app_id, msg, type, selector, extra, page, stack) VALUES (${userId},${appId},${msg},${type},${selector},${extra},${page},${stack})`;
  return query(_sql, []);
};
```



## 统一返回形式

我在utils 里封装了统一的返回形式, 大家今后的返回都用这两个函数返回

```javascript
/**
 * 成功的数据
 * @param ctx
 * @param data
 * @param msg
 * @param code
 */
function success(ctx, data = {}, msg = "success", code = 20000) {
  ctx.body = {
    code,
    msg,
    data,
  };
}

/**
 * 失败的数据
 * @param ctx
 * @param msg
 * @param data
 * @param code
 */
function error(ctx, msg = "失败", data = {}, code = 0) {
  ctx.body = {
    msg,
    code,
    data,
  };
}

```
