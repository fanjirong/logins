<template>
    <div>
        <el-form ref='form' :model='form' label-width="80px">
            <el-form-item label="用户姓名">
                <el-input v-model="form.name"><i class="el-icon-arrow-down el-input__icon" slot="suffix"></i></el-input>
            </el-form-item>
            <el-form-item label="用户手机号">
                <el-input v-model="form.name"><i class="el-icon-arrow-down el-input__icon" slot="suffix"></i></el-input>
            </el-form-item>
            <el-form-item label="归属组织">
                <el-popover
                placement="bottom"
                width="400"
                trigger="click"
                @after-enter="toFetchList"
                >
                <el-container direction='vertical' v-loading='flag' >
                    <el-form label='组织名称'>
                        <el-input class='inp' v-model='abc'></el-input>
                        <el-button @click='filterItem=abc'>查询</el-button>
                    </el-form>
                    <el-table :data="filterGroup()(filterItem)" :height="300" @row-click='rowClick'>
                        <el-table-column width="50" type="index" label="序号"></el-table-column>
                        <el-table-column width="130" property="ORGNAME" label="组织名称"></el-table-column>
                        <el-table-column width="150" property="FORGNAME" label="上级组织"></el-table-column>
                    </el-table>
                </el-container>
                <el-input slot="reference"  v-model="form.group">
                    <i class="el-icon-arrow-down el-input__icon" slot="suffix"></i>
                </el-input>
                </el-popover>
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input v-model="form.name"><i class="el-icon-arrow-down el-input__icon" slot="suffix"></i></el-input>
            </el-form-item>
            <el-button size='small'>查询</el-button>
        </el-form>
        
        <div>
            <el-button size='small' @click='add'>添加</el-button>
            <el-table size="small" :data="tableData" border style="width: 100%" v-loading='flags' >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" width="150"></el-table-column>
                <el-table-column prop="id" label="员工id" width="120" :show-overflow-tooltip='true'></el-table-column>
                <el-table-column prop="code" label="员工编号" width="120"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
                <el-table-column prop="group" label="归属组织" width="120"></el-table-column>
                <el-table-column prop="auth" label="权限" width="120"></el-table-column>
                <el-table-column prop="forg" label="上级组织" width="120"></el-table-column>
                <el-table-column prop="time" label="创建时间" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" @click='del(scope)' size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination  @current-change='changeSize' background layout="prev, pager, next" :total="table.length" :page-size="Pagesize"></el-pagination>
            <el-dialog title="添加/编辑" :visible.sync="dialogFormVisible">
            <el-form ref='refs' :model="newform" :inline='true' lable-position='left' label-width='30' :rules='rules'>
                <el-form-item label="员工姓名" prop='name'>
                <el-input size='small' v-model="newform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工邮箱" prop='email'>
                <el-input size='small' v-model="newform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                <el-input size='small' v-model="newform.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="证件号码">
                <el-input size='small' v-model="newform.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人员状态">
                <el-input size='small' v-model="newform.zt" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                <el-input size='small' v-model="newform.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="归属组织">
                <el-select size='small' v-model="newform.forg" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
    export default {
        data(){
            let validator = (rule,value,callback)=>{
                if(!value){
                    return callback(new Error('不能为空'))
                }
                return callback()
            }
            return {
                form:{
                    name:'',
                    group:''
                },
                newform:{
                    name:"",
                    email:"",
                    type:"",
                    id:"",
                    zt:"",
                    phone:"",
                    forg:""
                },
                rules:{
                     name: [
                            {validator,trigger: 'blur' }
                     ],
                     email: [
                            { required: true, message: '请输入邮箱', trigger: 'blur' },
                            { type:'email', message: '请输入正确格式',trigger: 'blur' }
                     ],
                },
                flag:false,
                filterItem:'',
                abc:'',
                flags:false,
                Pagesize:4,
                num:1,
                dialogFormVisible:false
            }
        },
        computed:{
            //...mapState(['group']),
            ...mapState(['table']),
            tableData(){
                let tableArr= this.table.slice(this.Pagesize*(this.num-1),this.Pagesize*this.num)
                return tableArr
                
            }
        },
        mounted(){
            // this.$store.dispatch('fetchTable');
            this.toFetchTable()
        },
        watch:{
            group(_old,_news){
                this.flag=false
            }
        },
        methods:{
            rowClick(row, event, column){
                this.form.group = row.ORGNAME
            },
            toFetchList(){
                this.flag = true
                this.fetchList(()=>{
                    this.flag=false
                })
            },
            toFetchTable(){
                this.flags = true;
                this.fetchTable(()=>{
                    this.flags= false;
                })
            },
             handleClick(row) {
                this.dialogFormVisible=true;
                this.newform = row
             },
             changeSize(Pagesize){
                this.num = Pagesize
             }, 
             add(){
                  this.dialogFormVisible=true;
                  this.newform = {
                      name:"",
                      email:"",
                      type:"",
                      id:"",
                      zt:"",
                      phone:"",
                      forg:""
                }
             },
             del(store){
                 this.$confirm('你确定要删除这个人吗？','提示',{
                     callback:()=>{
                        this.deletePeople({
                            code:store.row.code,
                            cb:()=>{
                                this.$message('删除成功')
                            }
                        })
                     }
                 })
             },
             sure(){
                 this.$refs.refs.validate((isValid,tag)=>{
                     dialogFormVisible = false
                 })
                
             },
            ...mapActions(['fetchList']),
            ...mapGetters(['filterGroup',]),
            ...mapActions(['fetchTable']),
            ...mapMutations(['deletePeople'])
        }
    }
</script>
<style lang="">
    .el-form-item{
        display:inline-block;
    }
    .inp{
        width:50%;
    }
</style>



























