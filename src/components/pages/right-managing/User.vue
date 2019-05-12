<template>
  <div>
    <el-row>
      <el-col :span="4">
        <user-dept-tree style="margin-right:20px" ></user-dept-tree>
      </el-col>
      <el-col :span="20">
        <add-user
          :roles="roles" 
          :users="users" 
          style="float:left">
        </add-user>
        <TableSearch :tableData="users"></TableSearch>
        <user-table :header="header" :roles="roles" ></user-table>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import {getRoleList} from './../../../api/right-managing/role.js'
import {getUserList} from './../../../api/right-managing/user.js'
import UserTable from './user/UserTable'
import UserDeptTree from './user/UserDeptTree'
import AddUser from './user/AddUser'
import TableSearch from './../../common/TableSearch'
export default {
  name: 'User',

  components: {
    UserTable,
    AddUser,
    TableSearch,
    UserDeptTree
  },

  data() {
    return {
      users: [],
      roles: [],
      header: [
        //  o:表示单个数值  1：表示多个数值 数组
        {label:'账号' ,prop:'username',type:0},
        {label:'用户角色' ,prop:'roles',type:1},
        // {label:'部门'，prop:}
        {label: '操作', prop:'operate',width:'200px',fixed:'right'}
      ],
    }
  },

  mounted:function(){
    getUserList().then((res)=>{
      this.users=res.data.data;
    });
    getRoleList().then((data)=>{
      this.roles=data.data.data;    
    });
  },

}
</script>

<style>

</style>