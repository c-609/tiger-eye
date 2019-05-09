<template>
  <div style="margin-right:20px">
    <el-button type="primary" @click="userFormVisible = true" icon="el-icon-edit" size="mini">添加用户</el-button>

    <el-dialog title="新增" :visible.sync="userFormVisible" @close='closeDialog'>
      <el-form :model="userForm" status-icon :rules="rules2" ref="userForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="account">
          <el-input type="text" v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord1">
          <el-input type="password" v-model="userForm.passWord1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passWord2">
          <el-input type="password" v-model="userForm.passWord2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="roles">
          <el-checkbox v-for="(item,index) in roles" :key="index" v-model="item.name">{{item.nameZh}}</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button> 
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addUser} from '../../../../api/right-managing/user.js'
export default {
     props:{
      roles:{
          type:Array
      },
      users:{
          type:Array
      } 
     },
      inject:['reload'],
    data() {
      var i=0;
      var validateAcount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账户不能为空'));
        } else {
          for(i=0;i<this.users.length;i++){
           if(this.userForm.account === this.users[i].username){
              callback(new Error('用户名已存在'));
              break;
           }
          }
          if ( i>=this.users.length) {
            this.$refs.userForm.validateField('passWord1');
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.userForm.checkPass !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.passWord1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        userFormVisible: false,
        formLabelWidth: '120px',
        userForm: {
          account:'',
          passWord1:'',
          passWord2: '',
          admin:'',
          superuser:'',
          user:''
        },
        rules2: {
          account: [
            { validator: validateAcount, trigger: 'blur' }
          ],
           passWord2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          passWord1: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      closeDialog(){
        this.userForm.account= '';//清空数据
        this.userForm.passWord1 = '';
        this.userForm.passWord2 = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const roles = [];
            var j=0;
            var i;
            for(i=0;i<this.roles.length;i++){
              if(this.roles[i].name==true){
                roles[j]=this.roles[i].id;
                j++;
              }
            }
            addUser( this.userForm.account, this.userForm.passWord1, roles)
              .then(res=>{
                console.log(res);
                this.reload();
                if( res && res.data.data.data == 1 ){
                    alert("添加成功！")
                }
              }); 
              this.userFormVisible = false;
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>