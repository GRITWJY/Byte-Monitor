import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import MonitorSandBox from '../views/sandbox/MonitorSandBox'
export default function IndexRouter() {
    return (
        <HashRouter>
            <Switch>
                {/* react-router-dom@5,当路径为'/login',渲染组件login */}
                <Route path="/login" component={Login}/>
                {/* <Route path="/" component={NewsSandBox}/>等价于Router  render */}
                {/* <Route path='/' render={()=><NewsSandBox></NewsSandBox>/} */}
                <Route path="/" render={()=>
                // 三目表达式，判断是否授权（路由拦截）
                   
                    <MonitorSandBox></MonitorSandBox>
                   
                }/>
            </Switch>
        </HashRouter>
    )
}
