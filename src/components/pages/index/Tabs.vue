<template>
<div class="tabs-container">    
  <el-tabs 
    v-model="editableTabsValue"
    @tab-remove="removeTab"
    @tab-click="click" >
    <el-tab-pane
      v-for="(item) in editableTabs"
      :closable="item.close"
      :key="item.name"
      :label="item.title"
      :name="item.name" >
    </el-tab-pane>
  </el-tabs>
</div>
</template>


<script>
import eventBus from './../../../utils/eventBus.js'
  export default {
    data() {
      return {
          dir:'',
          isFind:-1,
          tabsName:'',
          editableTabsValue: '1',
          editableTabs: [{
            title: '首页',
            name: '1',
            content: '首页',
            close: false,
            dir:''
          }],
        tabIndex: 1
      }
    },
    created(){
        eventBus.$on('name',res=>{
            this.tabsName=res;
            this.isFind=-1;
        })
        eventBus.$on('router',res=>{
            this.dir=res;  
        })
    },
    methods: {
      addTab(editableTabsValue) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: this.tabsName,
          name: newTabName,
          content: this.tabsName,
          dir:this.dir,
          close:true
        });
        this.$router.push(this.dir)
        this.editableTabsValue = newTabName;
        // console.log(this.editableTabs)
      },
      click(item){
          this.editableTabs.map((index)=>{
              if(index.name==item.name){
                eventBus.$emit("checked",index.dir);
                this.$router.push(index.dir)
              }
          })
         
      },
      check(){
        this.editableTabs.map((index)=>{
            if(this.tabsName==index.title){
             this.isFind=0;
             this.editableTabsValue=index.name;
            }
        })
        if(this.isFind==-1){
            this.addTab();
        }else{
            // console.log("----------------------------"+this.isFind)
        }
       
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                 eventBus.$emit("checked",nextTab.dir);
                  this.$router.push(nextTab.dir);
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>

<style>
.tabs-container{
    user-select: none; 
    position: relative;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-top: 1px solid #f6f6f6;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}
.tabs-container .el-tabs{
  background: white;
  height:40px;
}
.tabs-container .el-tabs__active-bar{
  height: 3px;
}
</style>