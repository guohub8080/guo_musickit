<script setup lang="ts">

import PianoKeyboardInfo from "../components/PianoKeyboardInfo.vue";
import Interval from "../components/Interval.vue"
import ReverseInterval from "../components/ReverseInterval.vue"


</script>

<template>
  <PianoKeyboardInfo/>
  <div class="show_interval">
    <Interval ward="interval_upward" class="each_interval"/>
    <span></span>
    <Interval ward="interval_downward" class="each_interval"/>

  </div>
  <ReverseInterval/>
</template>

<style scoped lang="less">
div.music {
  background-color: rgb(246, 246, 246);
  padding-top: 1rem;
}

.show_interval {
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;

  span {
    width: 1.5rem;
    display: inline-block;
  }

  .each_interval {
    display: inline-block;
    margin: 0 auto;
  }
}
</style>
