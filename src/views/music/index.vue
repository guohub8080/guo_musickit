<script setup lang="ts">
import {computed} from "vue";
import note_meta from "./logic/db_note_meta";

import {storeToRefs} from "pinia";
import {to_db} from "./logic/utils";
import {onKeyUp} from "@vueuse/core";
import useMusicStore from "./logic/music_store";
import Settings from "./components/Settings.vue";
import router from "@/router";
import Loading from "./components/Loading.vue";

const mstore = useMusicStore();
const {tonic_choice_bar, tonic_n_db, nth, is_loading} = storeToRefs(mstore);

// 和导航有关的功能：

router.beforeEach((to, from, next) => {
  is_loading.value = true;
  next();
});
// 这里为了让效果明显一些加了延时
router.afterEach((to, from) => {
  is_loading.value = false;
});

const is_selected = (inth: number) => {
  if (nth.value === inth) {
    return "is_selected";
  }
};

// 和导航无关的功能（快捷键）：
const step_li = ["C", "D", "E", "F", "G", "A", "B"];

onKeyUp("r", (e) => {
  e.preventDefault();
  const alter_li = [-1, 0, 1];
  tonic_choice_bar.value.step = step_li[Math.floor(Math.random() * step_li.length)];
  tonic_choice_bar.value.alter = alter_li[Math.floor(Math.random() * alter_li.length)];
});

onKeyUp(["c", "d", "e", "f", "g", "a", "b"], (e) => {
  e.preventDefault();
  tonic_choice_bar.value.step = e.key.toUpperCase();
});

onKeyUp(["0", "-", "="], (e) => {
  e.preventDefault();
  if (e.key === "-") {
    tonic_choice_bar.value.alter = -1;
  } else if (e.key === "0") {
    tonic_choice_bar.value.alter = 0;
  } else {
    tonic_choice_bar.value.alter = 1;
  }
});

onKeyUp(["[", "]"], (e) => {
  e.preventDefault();
  if (e.key === "[") {
    if (tonic_choice_bar.value.alter > -1) {
      tonic_choice_bar.value.alter -= 1;
    }
  } else {
    if (tonic_choice_bar.value.alter < 1) {
      tonic_choice_bar.value.alter += 1;
    }
  }
});

onKeyUp([",", "."], (e) => {
  e.preventDefault();
  const new_index =
      e.key === "."
          ? step_li.indexOf(tonic_choice_bar.value.step) + 1
          : step_li.indexOf(tonic_choice_bar.value.step) - 1;
  if (new_index < 0) {
    tonic_choice_bar.value.step = step_li[new_index + step_li.length];
  } else if (new_index > step_li.length - 1) {
    tonic_choice_bar.value.step = step_li[new_index - step_li.length];
  } else {
    tonic_choice_bar.value.step = step_li[new_index];
  }
});

onKeyUp("v", (e) => {
  e.preventDefault();
  if (tonic_n_db.value.is_black) {
    const new_tonic = note_meta(
        {loc_id: tonic_n_db.value.loc_id},
        {is_normal: true},
        {step: {"!=": tonic_n_db.value.step}}
    ).first();
    tonic_choice_bar.value = {step: new_tonic.step, alter: new_tonic.alter};
  }
});

onKeyUp(["ArrowLeft", "ArrowRight"], (e) => {
  e.preventDefault();
  let new_loc_id: number;
  if (e.key === "ArrowLeft") {
    new_loc_id = (tonic_n_db.value.loc_id as number) - 1;
  } else {
    new_loc_id = (tonic_n_db.value.loc_id as number) + 1;
  }
  if (new_loc_id <= 0) {
    new_loc_id += 12;
  } else if (new_loc_id > 12) {
    new_loc_id -= 12;
  }
  const new_choice = note_meta(
      {loc_id: new_loc_id},
      {alter: {">=": -1}},
      {alter: {"<=": 1}}
  ).get();

  const test_new_choice = to_db(new_choice)({alter: 0}).first();
  if (test_new_choice != false) {
    tonic_choice_bar.value = {step: test_new_choice.step, alter: 0};

    return;
  }
  if (e.key === "ArrowLeft") {
    const test_new_choice2 = to_db(new_choice)({alter: -1}).first();
    tonic_choice_bar.value = {
      step: test_new_choice2.step,
      alter: test_new_choice2.alter,
    };
    return;
  }
  if (e.key === "ArrowRight") {
    const test_new_choice2 = to_db(new_choice)({alter: 1}).first();
    tonic_choice_bar.value = {
      step: test_new_choice2.step,
      alter: test_new_choice2.alter,
    };
    return;
  }
});

const is_hidden = computed(() => {
  if (nth.value != 3) {
    return "is_hidden";
  }
  return null;
});

const need_hide = computed(() => {
  if ([1].includes(nth.value as number)) {
    return "is_hidden";
  }
  return null;
});


</script>

<template>
  <div >


    <!--    导航条-->
    <div class="nav">
      <div @click="router.replace('/readme')" :class="is_selected(1)">ReadMe</div>
      <div @click="router.replace('/interval')" :class="is_selected(2)">Interval</div>
      <div @click="router.replace('/scales')" :class="is_selected(3)">Scales</div>
      <div @click="router.replace('/chord')" :class="is_selected(4)">Chord</div>
    </div>

    <Loading v-if="is_loading"/>

    <!--  <Loading/>-->
    <div class="music" :class="need_hide">
      <!-- 主音的选择条 -->
      <div class="tonic_choice">
        <a-radio-group
            v-model:value="tonic_choice_bar.step"
            button-style="solid"
            class="step"
        >
          <a-radio-button value="C">C</a-radio-button>
          <a-radio-button value="D">D</a-radio-button>
          <a-radio-button value="E">E</a-radio-button>
          <a-radio-button value="F">F</a-radio-button>
          <a-radio-button value="G">G</a-radio-button>
          <a-radio-button value="A">A</a-radio-button>
          <a-radio-button value="B">B</a-radio-button>
        </a-radio-group>
        <a-radio-group
            v-model:value="tonic_choice_bar.alter"
            button-style="solid"
            class="alter"
        >
          <a-radio-button :value="-1">Flat(♭)</a-radio-button>
          <a-radio-button :value="0">Natural</a-radio-button>
          <a-radio-button :value="1">Sharp(♯)</a-radio-button>
        </a-radio-group>
        <a-popover
            title="乐理计算器设置"
            placement="bottomRight"
            class="settings"
            :class="is_hidden"
        >
          <template #content>
            <Settings/>
          </template>
          <!-- <a-button type="primary"><setting-outlined /></a-button> -->
          <a-button type="link" shape="round"> 设置</a-button>
        </a-popover>
      </div>
    </div>
    <router-view/>
    <div style="height: 10rem"></div>
  </div>
</template>

<style scoped lang="less">
.nav {
  background-color: rgb(39, 39, 39);

  display: flex;

  justify-content: center;
  gap: 0.5rem;

  .is_selected {
    // border-collapse: collapse;
    // border-bottom: 10px #b9b9b9 solid;
    background-color: rgb(205, 205, 205);
    transition: all ease-out 0.2s;
    width: 12rem;
    font-weight: 700;
    color: #2c3e50;
  }

  div {
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    border-radius: 0.2rem;
    cursor: pointer;
    background-color: rgb(70, 70, 70);
    width: 6rem;

    color: antiquewhite;
    transition: all ease-in 0.2s;

    &:active {
      // filter: brightness(5);
      background-color: #1634cb;
      color: antiquewhite;
      transition: all ease-in-out 0.2s;
    }

    &:hover {
      filter: brightness(1.2);
      transition: all ease-in 0.2s;
    }
  }
}

div.music {
  background-color: rgb(245, 243, 243);
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px rgba(191, 191, 191, 0.4) solid;
  margin-bottom: 1rem;
}

.tonic_choice {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  transition: all ease-in 0.2s;

  .step,
  .alter {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    transition: all ease-in 0.2s;
  }

  .settings {
    margin-right: -5rem;
    background-color: rgba(198, 219, 255, 0.5);
    font-weight: 700;
    transition: all ease-in 0.2s;
  }
}

.is_hidden {
  opacity: 0;
  display: none;
  transition: all ease-in 0.2s;
}
</style>
