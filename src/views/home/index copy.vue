<template >
  <div>
    <div>
      <a-radio-group v-model:value="value1" button-style="solid">
        <a-radio-button value="a"> Hangzhou </a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </div>
    {{ value1 }}
  </div>
</template>




<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref<string>('a')

</script>

