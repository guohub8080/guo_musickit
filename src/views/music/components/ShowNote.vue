<script setup lang="ts">
import { object } from "vue-types";
import { step_alter } from "../logic/utils";
const props = defineProps<{
  n_step_alter: any | null | step_alter | false | any | Object;
  // step: string | null | false | undefined;
  // alter: number | null | false | undefined;
  chord_term?: string;
}>();

const get_alter = (alter: number) => {
  if (alter === 1) {
    return "♯";
  } else if (alter === 2) {
    return "♯♯";
  } else if (alter === -1) {
    return "♭";
  } else if (alter === -2) {
    return "♭♭";
  }
};
</script>

<template>
  <div class="outer">
    <div v-if="n_step_alter" class="step">
      {{ props.n_step_alter.step }}
      <span v-if="props.n_step_alter?.alter">
        {{ get_alter(props.n_step_alter?.alter) }}
      </span>
    </div>
    <div
      v-if="props.chord_term"
      class="chord_term"
      :class="props.n_step_alter.alter ? 'has_alter' : null"
    >
      {{ props.chord_term }}
    </div>
  </div>
</template>

<style scoped>
.outer {
  /* background-color: rgb(229, 229, 229); */
  /* width: 3.5rem; */
  min-width: 3.5rem;
  /* height: 4rem; */
  height: 2rem;
  margin: 0 auto;
  display: flex;
  /* 子对象竖直排布： */
  justify-content: center;
  align-items: flex-start;
}

.step {
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  /*font-family:    Menlo, Courier, monospace;*/
}

.step span {
  font-weight: 400;
  font-size: 0.9rem;
  margin-left: 1px;
  margin-right: -2px;
  font-family: "Segoe UI";
}

.chord_term {
  font-weight: 700;
  font-size: 1rem;
  padding-top: 0.2rem;
  margin-left: 1px;
}
.has_alter {
  margin-left: 0.2rem !important;
}
</style>
