<script setup lang="ts">
import { ref } from "vue";
import Clock from "../components/Clock.vue";
import ChordSelector from "../components/ChordSelector.vue";
</script>

<template>
  <div class="chord_select">
    <ChordSelector />
    <Clock class="clock_show" />
  </div>
</template>

<style scoped lang="less">
.chord_select {
  //display: flex;
  //flex-wrap: wrap;
  //justify-content: center;
  display: block;
  margin: 0 auto;

  .clock_show{
    margin: 1rem auto 0;
  }
}
</style>
