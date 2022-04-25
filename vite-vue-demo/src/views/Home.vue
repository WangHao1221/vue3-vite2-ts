<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <p>this is home page <el-button type="" @click="showDia()">点击弹窗</el-button></p>
  <p><el-button type="primary" @click="inCrement">我是按钮</el-button> </p>
  <p>store operate count is:{{ count }}</p>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex';
import { key } from '../store/index';
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "About",
   setup() {
      const store = useStore(key)
      const count = computed(() => store.state.count)
      const showDia = ()=>{
          ElMessage({
           message: "Home页面",
           type: "success"
       })
      }
      return {
        count,
        inCrement: () => store.commit('increment'),
        showDia
      }
    }
});
</script>
