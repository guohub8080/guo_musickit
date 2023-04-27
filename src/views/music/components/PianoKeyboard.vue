<script setup lang="ts">
import { ref, computed, ComputedRef, watch } from "vue";
import { n_db, step_alter } from "../logic/utils";
// import { note_meta } from "../logic/musicdb";
import note_meta from "../logic/db_note_meta";
// import Note from "./ShowNote.vue";

// 先定义从父组件传下来的数据类型及props
const props = defineProps<{
  tonic_step_alter: step_alter;
}>();

// 主音数据库类型
const tonic_n_db: ComputedRef<n_db> = computed(() => {
  return note_meta({
    step: props.tonic_step_alter.step,
    alter: props.tonic_step_alter.alter,
  }).first();
});

// 随主音选择的函数
const is_tonic_choice = (loc_id: number) => {
  if (tonic_n_db.value.loc_id === loc_id) {
    return { css: "is_tonic_choice", show_name: tonic_n_db.value.art_name };
  } else {
    return null;
  }
};
const is_selected = ref(0);
// 决定是否可以选择的函数（在主音之外重选一个）
const select_target = (select_loc_id: number) => {
  if (tonic_n_db.value.loc_id === select_loc_id) {
    is_selected.value = 0;
  } else if (select_loc_id === is_selected.value) {
    is_selected.value = 0;
  } else {
    // console.log(`you choose ${select_loc_id}`);
    is_selected.value = select_loc_id;
  }
};

// 决定选择CSS样式的函数
const show_selected = (loc_id: number) => {
  if (loc_id === is_selected.value) {
    return "selected";
  }
};

// 监听主音数据，如果和现在的数值重了，那么赶紧重置
watch(tonic_n_db, (new_value) => {
  if (new_value.loc_id === is_selected.value) {
    is_selected.value = 0;
  }
});
</script>

<template>
  <div class="piano_keyboard">
    <div class="white_group">
      <!-- 白键C -->
      <div
        class="white_key"
        :class="[is_tonic_choice(1)?.css, show_selected(1)]"
        @click="select_target(1)"
      >
        {{ is_tonic_choice(1)?.show_name }}
      </div>
      <!-- 白键D -->
      <div
        class="white_key"
        :class="[is_tonic_choice(3)?.css, show_selected(3)]"
        @click="select_target(3)"
      >
        {{ is_tonic_choice(3)?.show_name }}
      </div>
      <!-- 白键E -->
      <div
        class="white_key"
        :class="[is_tonic_choice(5)?.css, show_selected(5)]"
        @click="select_target(5)"
      >
        {{ is_tonic_choice(5)?.show_name }}
      </div>
      <!-- 白键F -->
      <div
        class="white_key"
        :class="[is_tonic_choice(6)?.css, show_selected(6)]"
        @click="select_target(6)"
      >
        {{ is_tonic_choice(6)?.show_name }}
      </div>
      <!-- 白键G -->
      <div
        class="white_key"
        :class="[is_tonic_choice(8)?.css, show_selected(8)]"
        @click="select_target(8)"
      >
        {{ is_tonic_choice(8)?.show_name }}
      </div>
      <!-- 白键A -->
      <div
        class="white_key"
        :class="[is_tonic_choice(10)?.css, show_selected(10)]"
        @click="select_target(10)"
      >
        {{ is_tonic_choice(10)?.show_name }}
      </div>
      <!-- 白键B -->
      <div
        class="white_key"
        :class="[is_tonic_choice(12)?.css, show_selected(12)]"
        @click="select_target(12)"
      >
        {{ is_tonic_choice(12)?.show_name }}
      </div>
      <div class="black_group">
        <!-- 黑键C♯/D♭ -->
        <div
          class="black_key"
          :class="[is_tonic_choice(2)?.css, show_selected(2)]"
          @click="select_target(2)"
        >
          {{ is_tonic_choice(2)?.show_name }}
        </div>
        <!-- 黑键D♯/E♭ -->
        <div
          class="black_key"
          :class="[is_tonic_choice(4)?.css, show_selected(4)]"
          @click="select_target(4)"
        >
          {{ is_tonic_choice(4)?.show_name }}
        </div>

        <div class="black_key">隐藏占位用，不可删除</div>
        <!-- 黑键F♯/G♭ -->
        <div
          class="black_key"
          :class="[is_tonic_choice(7)?.css, show_selected(7)]"
          @click="select_target(7)"
        >
          {{ is_tonic_choice(7)?.show_name }}
        </div>
        <!-- 黑键G♯/A♭ -->
        <div
          class="black_key"
          :class="[is_tonic_choice(9)?.css, show_selected(9)]"
          @click="select_target(9)"
        >
          {{ is_tonic_choice(9)?.show_name }}
        </div>
        <!-- 黑键A♯/B♭ -->
        <div
          class="black_key"
          :class="[is_tonic_choice(11)?.css, show_selected(11)]"
          @click="select_target(11)"
        >
          {{ is_tonic_choice(11)?.show_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";
// 白键宽度
@kbd-white-width: 2.5rem;
// 黑键宽度
@kbd-black-width: @kbd-white-width * 0.7;
// 白键高度
@kbd-white-height: 10rem;
// 黑键高度
@kbd-black-height: @kbd-white-height * 0.6;
// 白键的圆角度
@white-kbd-raduis: 0.2rem;

// 黑键的默认颜色
@kbd-black-color: rgb(53, 53, 53);
// 白键的默认颜色
@kbd-white-color: rgb(252, 252, 252);
// 主音的键盘颜色
@kbd-selected-color: #1890ff;
// 选择的键盘颜色
@kbd-pressed-color: #ffa000;

.selected {
  background-color: @kbd-pressed-color !important;
}

// 设置单个键所在的字全部靠下排序的mixin
.set-btm-mixin() {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.kbd-hover-mixin() {
  &:hover {
    background-color: #ffee58;
    transition: all ease-in-out 0.2s;
  }
  &:active {
    background-color: #fff59d;
    transition: all ease-in-out 0.2s;
  }
}

.key-tonic-minxin() {
  background-color: @kbd-selected-color !important;
  color: rgb(253, 253, 253);
  font-size: 1rem;
  // font-weight: 700;
}

div {
  margin: 0;
  padding: 0;
}
.piano_keyboard {
  display: block;

  // background-color: rgb(209, 255, 148);
  .is_tonic_choice {
    .key-tonic-minxin();
  }

  .white_group {
    display: flex;
    align-items: flex-start;
    .white_key {
      .set-btm-mixin();
      border: @thin-border;
      width: @kbd-white-width;
      height: @kbd-white-height;
      background-color: @kbd-white-color;
      border-bottom-left-radius: @white-kbd-raduis;
      border-bottom-right-radius: @white-kbd-raduis;
      &:first-child {
        border-top: @bold-border;
        border-left: @bold-border;
        border-bottom: @bold-border;
        border-top-left-radius: @white-kbd-raduis;
        // margin-left: -1px;
      }
      &:not(:first-child) {
        border-top: @bold-border;
        border-bottom: @bold-border;
      }
      &:nth-child(7) {
        border-top-right-radius: @white-kbd-raduis;
        border-right: @bold-border;
      }
    }

    .black_group {
      display: flex;
      margin-left: @kbd-white-width*-7;
      .black_key {
        .set-btm-mixin();
        border-bottom-left-radius: @white-kbd-raduis;
        border-bottom-right-radius: @white-kbd-raduis;
        border: @bold-border;
        border-top: @bold-border;
        width: @kbd-black-width;
        height: @kbd-black-height;
        background-color: @kbd-black-color;
        &:first-child {
          margin-left: @kbd-white-width - @kbd-black-width*0.5;
        }
        &:not(:first-child) {
          margin-left: @kbd-white-width - @kbd-black-width;
        }
        &:last-child {
          margin-right: @kbd-white-width - (@kbd-black-width * 0.5);
        }
        // 黑键要隐藏其中一个
        &:nth-child(3) {
          visibility: hidden;
        }
      }
    }

    .white_key,
    .black_key {
      .kbd-hover-mixin();
    }
  }
}
</style>
