<template>
  <div>
    <el-tree 
      node-key="id"
      highlight-current
      :data="deptData" 
      :props="deptProps" 
      @node-click="getNodeData"
      :expand-on-click-node="false"
      :render-content="renderContent"
      default-expand-all
      >  
    </el-tree>
  </div>
</template>

<script>
import {getDeptTree} from './../../../../api/right-managing/dept.js'
import {getListByDeptId} from './../../../../api/right-managing/user.js'
import eventBus from './../../../../utils/eventBus.js'
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
    getNodeData(data){
      getListByDeptId(data.id).then(res=>{
        eventBus.$emit('tableData',res)
      })
    }
    // renderContent(data){
    //   console.log(data)
    // }
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
