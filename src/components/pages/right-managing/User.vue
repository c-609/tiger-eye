<template>
  <div>
      <add-user
        :roles="roles" 
        :users="users" 
        style="float:left">
      </add-user>
      <TableSearch :tableData="users"></TableSearch>
      <user-table :header="header" ></user-table>
  </div>
</template>

<script>
import {getRoleList} from './../../../api/right-managing/role.js'
import {getUserList} from './../../../api/right-managing/user.js'
import UserTable from './user/UserTable'
import AddUser from './user/AddUser'
import TableSearch from './../../common/TableSearch'
export default {
  name: 'User',

  components: {
    UserTable,
    AddUser,
    TableSearch
  },

  data() {
    return {
      users: [],
      roles: [],
      header: [
        //  o:表示单个数值  1：表示多个数值 数组
        {label:'账号' ,prop:'username',type:0},
        {label:'用户角色' ,prop:'roles',type:1},
        {label: '操作', prop:'operate',width:'200px',fixed:'right'}
      ],
    }
  },

  mounted:function(){
    getUserList().then((data)=>{
      this.users=data.data.data;
    });
    getRoleList().then((data)=>{
      this.roles=data.data.data;    
    });
  },

}
</script>

<style>

</style>