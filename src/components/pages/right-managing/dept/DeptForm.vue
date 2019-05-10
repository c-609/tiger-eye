<template>
  <div class="dept-form">
    <el-card>
    <el-form label-width="100px" :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="父级节点" prop="parentId">
        <el-input v-model="form.parentId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="节点ID" prop="id" v-if="formStatus!='add'">
        <el-input v-model="form.id" placeholder="请输入节点ID" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label=标题 prop="name">
        <el-input v-model="form.name"  placeholder="请输入标题" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="请求地址" prop="sort">
        <el-input v-model="form.sort"  placeholder="请求地址" :disabled="formEdit"></el-input>
      </el-form-item>

      <el-form-item style="float:left" v-if="formStatus=='add'">
        <el-button type="primary" size="small" @click="addSave">保存</el-button>
        <el-button size="small" @click="cancelButton">取消</el-button>
      </el-form-item>
      <el-form-item style="float:left" v-if="formStatus=='edit'">
        <el-button type="primary" size="small" @click="editUpdate">更新</el-button>
        <el-button size="small" @click="cancelButton">取消</el-button>
      </el-form-item>

    </el-form>
    </el-card>
  </div>
</template>

<script>
import eventBus from "./../../../../utils/eventBus.js"
import { getDept, addDept, updateDept} from '../../../../api/right-managing/dept';
export default {
  name: 'DeptForm',
  inject:['reload'],
  data(){
    return {
      formStatus:'',
      formEdit:true,
      formAdd:true,
      addParentId:'',
      form: {
          name: undefined,
          id: undefined,
          parentId: undefined,
          sort: undefined,
        },
    }
  },
  created:function(){
    this.addDept();
    this.addButton();
    this.nodeEdit();
    eventBus.$on("getDeptNodeData",(form)=>{
        this.addParentId = form.id;
        this.form = form;
        this.formStatus='';
        this.formEdit=true;
        this.formAdd=true;
      })
  },
  methods:{
    addDept(){
      eventBus.$on("addDeptNode",(formAdd,formStatus,node)=>{
        this.formStatus = formStatus;
        this.formEdit = formAdd;
        this.addParentId = node;    
        this.resetForm();
      })
    },
    addButton(){
      eventBus.$on("addDept",(formAdd,formStatus)=>{
        this.formStatus = formStatus;
        this.formEdit = formAdd;
        this.resetForm();
      })
    },
    nodeEdit(){
      eventBus.$on('deptNodeEdit',()=>{
        this.formEdit = false;
        this.formStatus = 'edit'
      })
    },
    addSave(){
      addDept(this.form.parentId, this.form.url, this.form.name, this.form.path)
        .then(res=>{
          this.reload();
        })
    },
    editUpdate(){
      updateDept(this.form.id, this.form.name, this.form.component, this.form.path)
        .then(res=>{
          this.reload();
        })
    },
    cancelButton(){
     this.formEdit = true;
     this.formStatus = '';
    },
     resetForm() { 
      this.form = {
          permission: undefined,
          name: undefined,
          id : undefined,
          parentId: this.addParentId,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          path: undefined
        }
      }
  }
}
</script>

<style scoped>

.dept-form{
 margin-left: 160px;
 margin-top: 10px
 /* margin-right: 20px; */
}
.el-input,
.el-select{
  /* width:500px; */
  float: left;
}

</style>