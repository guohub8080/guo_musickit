<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { music_meta, interval } from "./musicdb";
import Note from "./ShowNote.vue";

const tonic_info = reactive({
  tonic_step: "C",
  tonic_alter: 0,
});

const tonic_db_info = computed(() =>
  music_meta({ step: tonic_info.tonic_step, bias: tonic_info.tonic_alter }).first()
);

const get_note_info_by_uid = (uid: number) => music_meta({ uid: uid }).first();
const get_note_info_by_step_and_alter = (step: string, alter: number) =>
  music_meta({ step: step, bias: alter }).first();

const full_db_info = computed(() =>
  interval({ base_uid: tonic_db_info.value.uid }).first()
);

const set_new_tonic = (uid: number) => {
  const new_tonic_info = get_note_info_by_uid(uid);
  if (-1 <= new_tonic_info.bias && new_tonic_info.bias <= 1) {
    tonic_info.tonic_step = new_tonic_info.step;
    tonic_info.tonic_alter = new_tonic_info.bias;
  }
};
const upward_interval_info = computed(() => full_db_info.value.interval_upward);
const downward_interval_info = computed(() => full_db_info.value.interval_downward);
</script>

<template>
  <!-- 主音的选择条 -->
  <!-- <div class="tonic_choice">
    <a-radio-group v-model:value="tonic_info.tonic_step" button-style="solid">
      <a-radio-button value="C">C</a-radio-button>
      <a-radio-button value="D">D</a-radio-button>
      <a-radio-button value="E">E</a-radio-button>
      <a-radio-button value="F">F</a-radio-button>
      <a-radio-button value="G">G</a-radio-button>
      <a-radio-button value="A">A</a-radio-button>
      <a-radio-button value="B">B</a-radio-button>
    </a-radio-group>
    <span></span>
    <a-radio-group v-model:value="tonic_info.tonic_alter" button-style="solid">
      <a-radio-button :value="-1">Flat(♭)</a-radio-button>
      <a-radio-button :value="0">Natural</a-radio-button>
      <a-radio-button :value="1">Sharp(♯)</a-radio-button>
    </a-radio-group>
  </div>

  <div class="interval">
  
    <div class="gap"></div>

  </div> -->
</template>

<style scoped>
tr,
div,
table,
td {
  padding: 0;
  margin: 0;
}

.tonic_choice {
  width: 100%;
  /* background-color: rgb(255, 143, 143); */
}

.tonic_choice span {
  display: inline-block;
  width: 3rem;
}

p {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

table {
  cursor: default;
}

table td {
  border: 1px black solid;
  margin: 0 auto;
}

.interval {
  /* width: 70rem; */
  height: 40rem;

  /* background-color: rgb(210, 255, 255); */
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.each_line {
  height: 3.5rem;
}

.each_line .interval_index {
  font-size: 1.2rem;
}

td .interval_title {
  width: 5rem;
}

div.interval_title {
  margin: 0 auto;
}

.interval > .gap {
  width: 3rem;
}

td {
  margin: 0;
  padding: 0;
}

.each_line .interval_title {
  /* width: 100%; */
  min-width: 100%;
  padding-top: 0.2rem;
  /* margin-bottom: -0.3rem; */
  /* background-color: rgb(74, 0, 94); */
}
td:hover {
  background-color: rgb(250, 255, 173);
  overflow: hidden;
}
td:active {
  background-color: #d8cc47;
  animation: infinite 2s;
}
table {
  border: 2px black solid;
  background-color: #fff;

  margin: 0;
  padding: 0;
}
</style>
