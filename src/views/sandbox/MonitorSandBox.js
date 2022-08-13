import React, { useEffect } from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
// import TopHeader from '../../components/sandbox/TopHeader'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//css
import './MonitorSandBox.css'

//antd
import { Layout } from 'antd'
import MonitorRouter from '../../components/sandbox/MonitorRouter'
const {Content} = Layout

export default function NewsSandBox() {
    NProgress.start()
    useEffect(()=>{
        NProgress.done()
    })
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                {/* <TopHeader></TopHeader> */}
                {/* 内容组件从antd中引入 */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow:"auto"
                    }}
                >
                    {/* 将路由封装成组件 */}
                   <MonitorRouter></MonitorRouter>
                </Content>
            </Layout>
        </Layout>
    )
}
