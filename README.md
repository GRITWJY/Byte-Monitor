```
项目目录结构
```
|-- webMonitor // 项目
    |-- .gitignore
    |-- package-lock.json
    |-- package.json // 项目依赖
    |-- public  // CRA创建项目自动生成
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- logo192.png
    |   |-- logo512.png
    |   |-- manifest.json
    |   |-- robots.txt
    |-- src // 开发主要文件夹
        |-- App.css
        |-- App.js
        |-- App.test.js
        |-- index.css
        |-- index.js // 项目入口文件
        |-- logo.svg
        |-- reportWebVitals.js // react自带的性能测试文件
        |-- setupProxy.js // 网络请求设置
        |-- components // 页面子组件以及共享组件
        |   |-- sandbox
        |       |-- index.css
        |       |-- MonitorRouter.js
        |       |-- SideMenu.js
        |       |-- TopHeader.js
        |-- redux // 组件状态管理容器
        |   |-- store.js
        |   |-- reducers
        |       |-- CollapsedReducer.js
        |       |-- LoadingReducer.js
        |-- router // 路由文件夹
        |   |-- IndexRouter.js
        |-- util // 工具箱
        |   |-- http.js
        |-- views // 与路由相关的组件
            |-- login // 登录界面
            |   |-- Login.css
            |   |-- Login.js
            |-- sandbox // 侧边导航栏
                |-- MonitorSandBox.css
                |-- MonitorSandBox.js
                |-- error // 错误
                |   |-- JSerror.js // js错误模块
                |   |-- Promiseerror.js // js错误模块
                |   |-- Staticsourceerror.js // 静态资源错误模块
                |-- help // 帮助信息
                |   |-- Helpdoc.js
                |   |-- SubmitQues.js
                |-- home // 首页，数据大看板
                |   |-- Home.js
                |-- nopermission // 访问路由错误，无权限
                |   |-- Nopermission.js
                |-- overview  // 应用概览
                |   |-- Overview.js
                |-- performance // 性能分析
                |   |-- Apiperformance.js // API性能分析
                |   |-- Pageperformance.js // 页面性能分析
                |-- set // 配置
                |   |-- Alert.js // 警报配置
                |   |-- Paramset.js // 参数配置
                |   |-- Sourcemapset.js // sourece-map配置
                |-- user // 用户轨迹
                    |-- User.js


前端运行: `npm run start`

## 后端开发说明

后端运行 `npm run server`





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


### 需要编写的内容及方法
参考routes文件下的staticError.js和monitor.js,

需要自己编写sql语句，不会的可以问我，找到自己负责的内容，

如果是请求数据就用get方法,ctx.request.query可以获得url的参数，解构取值，

具体还是看文件注释吧,写完routes里的文件后需要在根目录下的app.js导入中间件，

在10行导入依赖，在42行以后照着写（导入中间件）就行

### selectData是查询函数，addData是插入函数，没有本质区别就是返回值不一样，因为每个请求的内容不太一样，所以不太好封装（主要是我不会）

### 我也是边看边写的，有什么优化或者建议都可以说

