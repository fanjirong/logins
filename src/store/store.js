import Vue from 'vue'
import Vuex from 'vuex'
import {instance as http} from '../until/http'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        data:[],
        group:[],
        table:[]
    },
    mutations:{  //通过commit来触发一个mutations
        updata(state,data){
            state.data=data.data.data;
        },
        upList(state,lists){
            state.group = lists.data.orgs;
        },
        upTable(state,table){
            state.table = table.data.userList;
        },
        deletePeople(store,payload,cb){
            let arr = store.table;
            let ind;
            arr.forEach((item,index)=>{
                if(item.code===payload.code){
                    ind = index;
                }
            })
            arr.splice(ind,1)
            store.table = arr;
            payload.cb()
        } 
    },
    actions:{  //通过dispatch来触发一个action
        fechData({commit}){
            http.get('/static/server/menu.json').then((res)=>{
                setInterval(()=>{
                    commit('updata',res)
                },2000)
            })
        },
        fetchList({commit,state},cb){
            if(state.group.length>0){
                cb()
            }
            http.get('/static/server/group.json').then((response)=>{
                setInterval(()=>{
                    commit('upList',response)
                    cb()
                },2000)
            })
        },
        fetchTable({commit,state},cb){
            http.get('/static/server/user.json').then((res)=>{
                setInterval(()=>{
                    commit('upTable',res)
                    cb()
                },2000)
                
            })
        },
        deletePeople(commit,cb){
            commit('deletePeople',cb)
        }  
    },
    getters:{
        filterGroup(state){
            return (filter)=>{
                if(filter){
                    let res = state.group.filter((item)=>{
                        return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                    })
                    return res
                }else{
                    return state.group
                }
                
            }
        }
    },
    modules:{}
})

export default store














