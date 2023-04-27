<script setup lang="ts">
// 先定义从父组件传下来的数据类型及props
import {n_db, r_itv_db, step_alter, ud_itv_db} from "@/views/music/trash/logic/utils";


const props = defineProps<{
  data: r_itv_db
}>();


</script>

<template>
  <div class="outer">
    <div v-if="data.exception" class="e">
      {{ props.data.exception }}
    </div>
    <div v-else>
      <div class="u"><span>▲</span>{{ props.data.upward_prefix }}{{ props.data.upward_num }}度 ({{ props.data.upward_semi_gap }})</div>
      <div class="d"><span>▼</span>{{ props.data.downward_prefix }}{{ props.data.downward_num }}度 ({{ props.data.downward_semi_gap }})
      </div>
    </div>

  </div>

</template>

<style scoped lang="less">
.outer {
  height: 3rem;

  span{
    font-size: 0.7rem;
    margin-right: 0.3rem;
    color: #8a8a8a;
  }
}

</style>
