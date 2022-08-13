import React from 'react'
import { Layout, Menu } from 'antd';
import './index.css'
import {withRouter} from 'react-router-dom'
import {
  HomeOutlined,
  LinkedinOutlined,
  UserOutlined,
  CloseCircleOutlined,
  AreaChartOutlined,
  SettingOutlined,
  BulbOutlined

} from '@ant-design/icons';
import {connect} from 'react-redux'
const { Sider } = Layout;
const { SubMenu } = Menu

// 页面样式结构
// key；title；icon
const  menuList = [
  // 首页：配置应用看板
  {
    key:"/home",
    title:"首页",
    icon:<HomeOutlined />
  },
  {
    key:"/overview",
    title:"概览",
    icon:<LinkedinOutlined />
  },
  {
    key:"/user",
    title:"用户",
    icon:<UserOutlined />
  },
  {
    key:"/error",
    title:"错误",
    icon:<CloseCircleOutlined />,
    children:[
      {
        key:"/error/javasctipt",
        title:"JavaScript错误"
      },
      {
        key:"/erro/promise",
        title:"Promise错误"
      },
      {
        key:"/erro/static",
        title:"资源请求错误"
      }
    ]
  },
  {
    key:"/performance",
    title:'性能',
    icon:<AreaChartOutlined />,
    children:[
      {
        key:"/performance/api",
        title:"接口性能"
      },
      {
        key:"/performance/page",
        title:"页面性能"
      }
    ]
  },
  {
    key:"/set",
    title:"配置",
    icon:<SettingOutlined />,
    children:[
      {
        key:"/set/paramater",
        title:"参数配置"
      },
      {
        key:"/set/sourecMap",
        title:"sourec-map配置"
      },
      {
        key:"/set/alert",
        title:"警报配置"
      }
    ]
  },
  {
    key:"/help",
    title:"帮助",
    icon:<BulbOutlined />,
    children:[
      {
        key:"/help/document",
        title:"使用文档"
      },
      {
        key:"/help/submiQuestion",
        title:"提交问题"
      }
    ]
  }
]
function SideMenu(props) {
  const renderMenu = (menuList)=>{
    return menuList.map(item=>{
      if(item.children){
        return <SubMenu key={item.key} icon={item.icon} title={item.title}>
           { renderMenu(item.children) }
        </SubMenu>
      }
      return <Menu.Item key={item.key} icon={item.icon}  onClick={()=>{
        //  console.log(props)
        // 路由跳转路径，props中含有多种路由属性
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }

  // console.log(props.location.pathname)
  // 设置选中高亮部分
  const selectKeys = [props.location.pathname]
  const openKeys = ["/"+props.location.pathname.split("/")[1]]
  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed} >
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
        <div className="logo" >前端监控系统</div>
        <div style={{flex:1,"overflow":"auto"}}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} className="aaaaaaa" defaultOpenKeys={openKeys}>
              {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>({
  isCollapsed
})
// withRouter
export default connect(mapStateToProps)(withRouter(SideMenu))