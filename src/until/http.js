import Vue from 'vue'
import axios from 'axios'

//创建实例
 let instance = axios.create({
     timeout:3000
 })

//请求拦截
 instance.interceptors.request.use((config)=>{
     return config;
 },(err)=>{
     console.log(err)
 })

 //响应拦截
 instance.interceptors.response.use((response)=>{
     return response;
 },(err)=>{
     console.log(err)
 })

//插件
let httpPlugin={
    install(Vue){
        //防止$http 在将来被覆盖
        Object.defineProperty(Vue.prototype,'$http',{
            value:instance
        })
    }
}
export {instance} 
export default httpPlugin


//  Object.defineProperty(obj, prop, descriptor)
// obj
// 要在其上定义属性的对象。
// prop
// 要定义或修改的属性的名称。
// descriptor
// 将被定义或修改的属性描述符。
// 返回值
//     被传递给函数的对象。