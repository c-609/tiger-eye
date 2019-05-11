<template>
  <div>
    <el-table
     ref="dormitoryTable"
      :data="Tables.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
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
          <div v-if="item.type==1">
            <div v-for="(i,index) in scope.row[item.prop]" :key="index">
                {{scope.row[item.prop][index].nameZh}}
            </div>
            </div> 
          <div v-else>{{scope.row[item.prop]}}</div> 
          
          <el-button @click="handleView(scope.row.id)" type="text" size="small" v-if="item.prop=='operate'">查看</el-button>
          <el-button @click="handleEdit( scope.row)" type="text" size="small" v-if="item.prop=='operate'">编辑</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small" v-if="item.prop==='operate'">删除</el-button>
       </template>
        
      </el-table-column>  
    </el-table>
    <el-dialog
      title="查看"
      :visible.sync="dialogTransferVisible"
      @close='closeDialog'  
      >
      <el-tree
        :data="menuData"
        ref="menuData"
        node-key="id"
        :default-expand-all="true"
        :props="menuProps">
      </el-tree>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      @close='closeDialog'
      >
      <el-form :model="form" label-position="right">
        <el-form-item label="账号" :label-width="formLabelWidth" >
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色标识"  :label-width="formLabelWidth">
          <el-checkbox v-model="form.admin">ROLE_admin</el-checkbox>
          <el-checkbox v-model="form.superuser">ROLE_superuser</el-checkbox>
          <el-checkbox v-model="form.user">ROLE_user</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <div>
    	<el-pagination background
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
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
import {getUserMenuTree, deleteUser, updateUser} from './../../../../api/right-managing/user.js'
import eventBus from './../../../../utils/eventBus.js'
  export default {
    name: 'UserTable',
    inject:['reload'],
    created:function(){
        eventBus.$on('Ta',(data)=>{
            this.Tables=data 
        })
    },
    data() {
      return {
        Tables:[],
        search: '',  
        pagesize: 5,
				currpage: 1,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form:{
          id:'',
          username:'',
          password:'',
          admin:'',
          superuser:'',
          user:'',
        },
        menuProps:{
          label: 'name',
          children: 'children',
        },
        menuData:[],
        dialogTransferVisible: false,
      }
    },
    props: ['header'],
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
          alert(id)
          this.$confirm('是否删除此用户?', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
          deleteUser(id).then((res)=>{
            this.reload();
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      handleView(id){
        this.dialogTransferVisible=true;
        getUserMenuTree(id).then(res=>{     
          this.menuData  = res.data.data ;
        }) 
      },
       handleEdit(row) {
          this.dialogFormVisible=true;
          this.form.username=row.username;
          this.form.id=row.id;
      },
      handleDialogSure(){
        updateUser(this.form.id, this.form.username).then(res=>{
          this.reload();
          });
          this.dialogFormVisible=false;
      },
      closeDialog(){
        this.form.password='';
        this.form.admin='';
        this.form.superuser='';
        this.form.user='';
      },
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

