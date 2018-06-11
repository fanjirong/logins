<template>
    <div>
        <el-form :model="login_model" ref='form'>
            <el-form-item label="登录账号" prop="accont" :rules="rules">
                <el-input  placeholder="请输入手机号和或邮箱" v-model="login_model.accont"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled='isphonedisabled' @click="send('phone')">{{phoneMsg}}</el-button>
                <el-button :disabled='isemaildisabled' @click="send('email')">{{emailMsg}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码">
                <el-input></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class='btn'@click='go_router'>登录</el-button>
           </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name:"",
        data(){
             return {
                login_model:{
                    accont:''
                },
                rules:[
                    { required: true, message: '请输入正确的信息', trigger: 'blur' }
                ],
                phoneMsg:'重新发送',
                emailMsg:'邮箱获取',
                timer:null,
                isphonedisabled:false,
                isemaildisabled:false
             }
        },
        methods:{
            condon(type){
                let time = 5;
                this.timer=setInterval(()=>{
                    time--;
                    type=='phone'?(this.isphonedisabled=true,this.phoneMsg=time):(this.isemaildisabled=true,this.emailMsg=time);
                    if(time<=0){
                        type=='phone'?this.phoneMsg='重新发送':this.emailMsg='重新获取'
                        clearInterval(this.timer)
                        type=='phone'?this.isphonedisabled=false:this.isemaildisabled=false;
                    }
                },1000)
            },
            send(type) {
                if(this.rules.length>1){
                    this.rules.pop()
                }
                if(type=='phone'){
                    this.rules.push({validator:(rule,value,callback)=>{
                        if(/^1[3578]\d{9}$/.test(value)){
                            callback()
                        }else{
                            callback(new Error('请输入正确格式的手机号'))
                        }
                    }, message: '请输入正确的手机号码'})
                }else if(type=='email'){
                    this.rules.push({ type, message: '请输入正确的邮箱地址'})
                }
               
                this.$refs.form.validate((isValid,rules) => {
                    if(isValid){
                        this.condon(type)
                        sessionStorage.setItem('islogin',1)
                    }
                });
            },
            go_router(){
                this.$router.push('/table')
            }
        }
    }
</script>
<style>
.el-form-item__content,
.el-form-item__label{
    margin-left:10%;
    line-height:25px;
}
.el-input__inner{
    width:80%;
    height:35px;
}
.el-button{
    width:37%;
    height:40px;
    overflow:hidden;
}
.btn{
    width:80%;
    background:skyblue;
    color:#fff;
}
</style>