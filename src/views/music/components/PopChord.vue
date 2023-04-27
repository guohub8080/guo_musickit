<script lang="ts" setup>
import { reactive, toRefs, watch } from "vue";
import useMS from "../logic/music_store";
import { storeToRefs } from "pinia";
import Note from "./ShowNote.vue";

const props = defineProps<{
  notes: { uid: number; art_name: string; step: string; alter: number; octave: number }[];
}>();
</script>

<template>
  <div class="pop_chord" :class="props.notes.length === 3 ? 'l3' : 'l4'">
    <div v-for="item in props.notes" class="each_note">
      <Note :n_step_alter="{ step: item.step, alter: item.alter }"></Note>
    </div>
  </div>
</template>

<style scoped lang="less">
.l3 {
  width: 8rem;
  margin: 0 auto;
  .each_note {
    width: 2rem;
    display: inline-block;
    &:last-child {
      margin-left: 0rem;
    }
  }
}

.l4 {
  width: 9rem;
  margin: 0 auto;
  .each_note {
    width: 2rem;
    display: inline-block;
    &:nth-child(2),
    &:nth-child(3) {
      margin-left: 0;
      margin-right: 0;
    }
    &:last-child {
      margin-right: -1rem;
    }
  }
}
</style>
