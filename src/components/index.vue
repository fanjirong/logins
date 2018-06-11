<template>
    <div class='wrap'>
        <h1>电信通 | <span>企业信息管理平台</span></h1>
        <div class='box'>
            <div class='login'>
                    <p><span @click='login_way="ercode"' :class='login_way==="ercode"?"active":""'>二维码登录</span><span @click='login_way="zh"'  :class='login_way==="zh"?"active":""'>账号登录</span></p>
                    <div class='show'>
                        <transition>
                            <component :is="login_way"></component>
                        </transition>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import ercode from './ercode'
import zh from './zh'
    var con = 10;
    export default {
        name:"",
        data(){
            return {
                login_way:'ercode'
            }
        },
        beforeRouterEnter(to,form,next){
                next()
        },
        components:{
            ercode,
            zh
        }
    }
</script>
<style>
   @import url('../css/style1.css');
</style>



