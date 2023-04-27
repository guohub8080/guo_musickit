<script setup lang="ts">
import EachScale from "../components/EachScale.vue";
import ReverseScale from "../components/ReverseScale.vue";
import ChordInScale from "../components/ChordInScale.vue";
// import { step_alter } from "../logic/utils";
// import { scale } from "../logic/musicdb";
// import scale from "../logic/db_scale";

import useMusicStrore from "../logic/music_store";
import { storeToRefs } from "pinia";
const store = useMusicStrore();
const { tonic_choice_bar } = storeToRefs(store);


</script>

<template>

  <EachScale />
  <ReverseScale />
  <ChordInScale />
</template>

<style scoped lang="less">
.each_scale {
  margin-bottom: 1rem;
}
</style>
