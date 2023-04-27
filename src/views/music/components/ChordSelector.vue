<script setup lang="ts">
import ShowNote from "./ShowNote.vue";
import useMusicStrore from "../logic/music_store";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";

const store = useMusicStrore();
const {tonic_choice_bar, tonic_n_db, chord_choice_bar, chord_list} = storeToRefs(store);

const chord_items = [
  {
    value: "3",
    label: "三和弦",
    children: [
      {value: "maj3", label: "M3"},
      {value: "min3", label: "m3"},
      {value: "aug3", label: "+3"},
      {value: "dim3", label: "°"},
    ],
  },
  {
    value: "7",
    label: "七和弦",
    children: [
      {value: "maj7", label: "M7"},
      {value: "min7", label: "m7"},
      {value: "dom7", label: "7"},
      {value: "m7b5", label: "m7-5 (ø)"},
      {value: "dim7", label: "°7"},
      {value: "mm7", label: "mM7"},
    ],
  },
  {
    value: "sus",
    label: "挂留和弦",
    children: [
      {value: "sus2", label: "sus2"},
      {value: "sus4", label: "sus4"},
      {value: "7sus2", label: "7sus2"},
      {value: "7sus4", label: "7sus4"},
      {value: "M7sus2", label: "M7sus2"},
      {value: "M7sus4", label: "M7sus4"},
    ],
  },
];
</script>

<template>
  <div class="chord_selector">
    <!--    <div>{{chord_choice_bar}}</div>-->
    <!--    < div style="width: 2rem; font-weight: 700; font-size: 1.2rem"></div>-->
    <span style="margin-right: 0.5rem">根音</span>
    <span style="font-weight: 700; font-size: 1.2rem;margin-right: 1rem">{{ tonic_n_db.art_name }}</span>
    <a-cascader
        style="width: 10rem"
        v-model:value="chord_choice_bar"
        :options="chord_items"
        :allowClear="false"
        :bordered="true"
        expandTrigger="hover"
    />
    <span style="margin-left: 1rem">的组成音是</span>
    <div>

      <div v-for="item in chord_list" style="display: inline-block;width: 3rem;font-size: 1.2rem;font-weight: 700">
        {{ item.art_name }}
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
div.chord_selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
