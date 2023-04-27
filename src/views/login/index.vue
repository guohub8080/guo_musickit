<script setup lang="ts">

import {useNow} from "@vueuse/core";

const now = useNow()
</script>

<template>
  <h1 @click="">This is login</h1>

  {{ now }}
</template>

<style scoped>
.hehe {
  height: 200px;
  width: 2000px;
}


</style>
