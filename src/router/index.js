import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Table from '@/components/table'
import YgAdmin from '../components/tab/yg_admin'
import UserAdmin from '../components/tab/user_admin'
import YgAdmin1 from '../components/tab/yg_admin1'
import UserAdmin1 from '../components/tab/user_admin1'
import userChild from '../components/tab/user_child'
 Vue.use(Router)

let router =new Router({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      // beforeEnter(to,from,next){
      //   next()
      // }
    },
    {
      path: '/table',
      name: 'table',
      component: Table,
      children:[
        {
          path: 'yg_admin',
          name: 'yg_admin',
          component: YgAdmin
        },
        {
          path: 'user_admin',
          name: 'user_admin',
          component: UserAdmin,
          children:[
            {
               path: 'userChild',
               name: 'userChild',
               component: userChild
            }
          ]
        },
         {
          path: 'yg_admin1',
          name: 'yg_admin1',
          component: YgAdmin1
        },
        {
          path: 'user_admin1',
          name: 'user_admin1',
          component: UserAdmin1
        }
      ]
    }
  ]
})
export default router

//导航守卫
router.beforeEach((to,form,next)=>{
  if(to.name==='Index'){
     next()
  }else{
      let islogin = sessionStorage.getItem('islogin')
      if(islogin){
        next()
      }else{
        next('/Index')
      }
  }
})