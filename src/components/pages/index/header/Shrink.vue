<template>
  <div>
    <!-- <i   class="el-icon-umpmenu--line1 shrink-icon" @click="setCollapse"></i> -->
    <i  v-if="!isCollapse" class="el-icon-umpmenu--line1 shrink-icon" @click="setCollapse"></i>
    <i v-else class="el-icon-umpmenu--line shrink-icon" @click="setCollapse"></i>
    <!-- <span v-if="isCollapse" class="el-icon-unfold" @click="setCollapse"></span>
    <span v-if="!isCollapse" class="el-icon-fold" @click="setCollapse"></span> -->
  </div>
</template>

<script>
export default {
  data() {
    return { }
  },

  methods: {
    setCollapse(){   
      this.$store.commit('setCollapse');
    }
  },

  computed: {
      isCollapse(){
        return this.$store.state.isCollapse;
      }
    },
}
</script>

<style>
.shrink-icon {
  font-size: 30px;
}
</style>