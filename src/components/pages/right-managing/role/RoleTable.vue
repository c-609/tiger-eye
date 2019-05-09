<template>
  <div>
    <el-table
    ref="dormitoryTable"
      :data="Tables.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
      :row-style="{height:'0'}"
      :cell-style="{padding:'0'}" >
      <el-table-column
        type="index"
        width="50"
        fixed="left"
        label="序号">
      </el-table-column>

      <el-table-column
        v-for="(item,key) in header" 
        :key="key" 
        :prop="item.prop" 
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed">
        <template slot-scope="scope">
          <div>{{scope.row[item.prop]}}</div> 
          <el-button @click="handleEditRirhts(scope.row)" type="text" size="small" v-if="item.prop=='operate'">修改权限</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop=='operate'">删除</el-button>
       </template>  
      </el-table-column>   
    </el-table>

    <el-dialog
      title="修改权限"
      :visible.sync="dialogTransferVisible"
      @close='closeDialog'
      >
      <el-tree
        :data="menuData"
        ref="menuData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="defaultChecked"
        :props="menuProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTransferVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      	<el-pagination background
            :current-page=currpage
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[2, 4, 6, 8]"
			:page-size="pagesize"
			:total="Tables.length"
			@current-change="handleCurrentChange"  
			@size-change="handleSizeChange" 
			>
		</el-pagination>
    </div>
  </div>
</template>


<script>
import {deleteRole, getRightTree, getRoleRight, updateRoleRight} from './../../../../api/right-managing/role.js'
import eventBus from './../../../../utils/eventBus.js';
  export default {
    name: 'BasicTable',
    props: ['header'],
    inject:['reload'],
    created:function(){
      eventBus.$on('Ta',(data)=>{
        this.Tables=data
      })
      getRightTree().then(res=>{
        this.menuData = res.data.data;
      })
    },
     data() {
      return { 
        Tables:[],
        search: '',   
        pagesize: 8,
		    currpage: 1,
        dialogTransferVisible: false,
        data:{
          rid:'',
          mids:''
        },
        value:[],
        transferData:[],
        menuData:[],
        menuProps:{
          label: 'name',
          children: 'children'
        },
        defaultChecked:[],
        rid:''
      }
    },
    computed:{
        TablesChange(){
            return this.Tables;
        }
    },
    watch:{
        TablesChange(){
           this.handleCurrentChange(1);
        }
    },
     methods: {
       handleCurrentChange(cpage) {
					this.currpage = cpage;
				},
				handleSizeChange(psize) {
					this.pagesize = psize;
				},

      handleDelete(id) {
          var _this = this;
          this.$confirm('是否删除此角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteRole(id).then(res=>{
              if(status!=200){
                _this.$message({
                   type:'info',
                   message:'删除成功' 
                })
              }
            })
            this.reload();
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
      },
      closeDialog(){
        this.$refs.menuData.setCheckedKeys([]);  
      },
      handleEditRirhts(row){
        this.dialogTransferVisible=true;
        this.rid = row.id;     
        getRoleRight(this.rid).then(res=>{     
          this.defaultChecked = res.data.data ;
        }) 
      },
      handleDialogSure(){
        var mids = this.$refs.menuData.getCheckedKeys().concat(this.$refs.menuData.getHalfCheckedKeys());
        console.log(mids)
        var _this = this;
        updateRoleRight(this.rid, mids).then((res)=>{
          if(status!=200){
                _this.$message({
                   type:'success',
                   message:'修改成功' 
                })
              }    
          });
        this.dialogTransferVisible=false;
      }  
    },
  }
</script>

<style type="text/css" >
.el-pagination{
		text-align: right;
    margin-top:20px;
    margin-right: 50px
	}
</style>
