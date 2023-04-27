<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import router from "@/router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import {computed, onMounted, onUpdated, ref, getCurrentInstance, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import useMusicStore from "@/views/music/logic/music_store";
import {storeToRefs} from "pinia";
// console.log(router.getRoutes());

const mstore = useMusicStore();
const {tonic_choice_bar, tonic_n_db, nth} = storeToRefs(mstore);

</script>

<template>

  <a-config-provider :locale="zhCN">
    <router-view/>
  </a-config-provider>
</template>

<style lang="less">
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 5px;
}


</style>
