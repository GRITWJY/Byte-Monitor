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
