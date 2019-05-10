<template>
  <div>
    <el-tree 
      node-key="id"
      highlight-current
      :data="deptData" 
      :props="deptProps" 
      @node-click="getNodeData"
      :render-content="renderContent"
      default-expand-all
      >  
    </el-tree>
  </div>
</template>

<script>
import {getDeptTree} from './../../../../api/right-managing/dept.js'
export default {
  name: 'UserDeptTree',
  data(){
    return{
      deptData: '',
      deptProps: {
        label: 'name',
        children: 'children'
      },
    }
  },
  methods: {

  },
  created:function(){
    getDeptTree().then(res=>{
      this.deptData = res.data.data
    })
  },

}
</script>

<style>

</style>