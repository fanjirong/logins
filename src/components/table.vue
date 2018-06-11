<template>
    <div>
        <el-container>
            <el-header>Header</el-header>
            <el-container style="height: 500px;  border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu>
                    <el-submenu v-for='(i,index) in $store.state.data' :index="index+'1'" :key='index'>
                        <template slot="title">{{i.name}}</template>
                            <el-menu-item v-for='(item,ind) in i.submenus'  :index="index+1+'-'+ind+1"  :key='ind'><router-link :to="{name:item.type}">{{item.name}}</router-link></el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                 </el-main>
             </el-container>
        </el-container>
    </div>
</template>
<script>
//import axios from 'axios'
    export default {
        name:"",
        data(){
            return {
                
            }
        },
        mounted(){
            this.$store.dispatch('fechData');
        }
    }
</script>
<style lang="">

</style>
