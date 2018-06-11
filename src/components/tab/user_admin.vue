<template>
    <div>
        <el-container>
            <el-header>Header</el-header>
            <el-container style="height: 500px;  border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id" 
                        :default-expanded-keys="[0]"
                        :auto-expand-parent="true"
                        :props="defaultProps" 
                        :highlight-current="true"
                        
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                 </el-main>
             </el-container>
        </el-container>
    </div>
</template>
<script>
//<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  export default {
      data() {
        return {
            data: [{
          label: '应用菜单树',
          children: [{
            label: '组织权限管理',
            children: [{
              label: '员工账号管理'
            },
            {
              label: '应用功能管理'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
        // renderContent(h, { node, data, store }) {
        //     let icon;
        //     let platForm;
        //     let isShow = false;
        //     if(platForm == 0){
        //         icon =  <icon-svg icon-style="icon-style" icon-class="el-icon-pc"></icon-svg>;
        // 　　　　　isShow = true;　
        //     }else{
        //         icon = <icon-svg icon-style="icon-style" icon-class="el-icon-wx"></icon-svg>;
        // 　　　　　isShow = false;
        // 　　　}
        //     return 
        //     //(
        //                 <span style="font-size: 14px; padding-right: 8px">
        //                     <span class="normalText">
        //                         {icon}
        //                         <span style="color: #333;"> {node.label} </span>
        //                     </span>
        //                     {isshow ? '' :
        //                         <span class="pos-a" style="right:20px; top:0;">
        //                             <span style="font-size: 12px;line-height: 30px;"
        //                                 on-click={() => this.operation(node, data, event)}>
        //                                 <icon-svg icon-style="icon-style" icon-class="el-icon-ifcn-gengduo"></icon-svg>
        //                             </span>
        //                         </span>
        //                     }
        //                 </span>
        //        // );
        // },
        // loadChildData(node, resolve) {
        // 　　　　//第一级为选中并执行node-click操作
        // 　　　　if (node && node.level == 0){
        // 　　　　　　this.levelTwoDatas = node.childNodes[0];
        // 　　　　　　this.$nextTick(function () {//
        // 　　　　　　　　let obj= document.getElementsByClassName('el-tree-node__content')[0];
        // 　　　　　　　　obj.click();
        // 　　　　　　})
        // 　　　　}
        // },
        handleNodeClick(data, node, vuecomponent) {
            //console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
            console.log(data)
        }
    }
   }
</script>