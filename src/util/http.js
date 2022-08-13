import axios from 'axios'
import {store} from '../redux/store'
// 设置请求基础url，自己debug
axios.defaults.baseURL="http://localhost:5000"

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 在发送请求之前做的事情
    // 显示loading
    store.dispatch({
        type:"change_loading",
        payload:true
    })
    return config;
  }, function (error) {
    // Do something with request error
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// Add a response interceptor
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 对响应的数据进行的操作
    store.dispatch({
        type:"change_loading",
        payload:false
    })

    //隐藏loading
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 对响应错误做点什么
    store.dispatch({
        type:"change_loading",
        payload:false
    })

     //隐藏loading
    return Promise.reject(error);
  });
