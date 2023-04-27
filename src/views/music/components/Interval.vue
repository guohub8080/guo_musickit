<script setup lang="ts">
import Note from "./ShowNote.vue";

import useMusicStore from "../logic/music_store";
import { storeToRefs } from "pinia";
import interval_info from "../logic/db_interval";
import { computed, ComputedRef } from "vue";
import { ud_itv_db } from "@/views/music/logic/utils";

const store = useMusicStore();
const { tonic_choice_bar, tonic_n_db, is_show_scale_rome, show_scale_id } = storeToRefs(
  store
);

const { set_new_tonic_by_uid } = store;
const props = defineProps<{
  ward: string;
}>();

const show_ward = computed(() => {
  if (props.ward === "interval_upward") {
    return "上行音程";
  } else if (props.ward === "interval_downward") {
    return "下行音程";
  }
});
const itv_db: ComputedRef<ud_itv_db[]> = computed(() => {
  const certain_db = interval_info({ base_uid: tonic_n_db.value.uid }).first();
  if (props.ward === "interval_upward") {
    return certain_db.interval_upward;
  } else if (props.ward === "interval_downward") {
    return certain_db.interval_downward;
  }
});

const get_note_info = (index: number) => {
  if (!itv_db.value[index].target_exception) {
    return {
      step: itv_db.value[index].target_step,
      alter: itv_db.value[index].target_alter,
    };
  } else {
    return null;
  }
};

const update_tonic_choice = (i: number) => {
  if (Math.abs(itv_db.value[i].target_alter as number) < 2) {
    const new_uid = itv_db.value[i].target_uid;
    set_new_tonic_by_uid(new_uid as number);
  }
};

const hover_note_css = (i: number) => {
  if (Math.abs(itv_db.value[i].target_alter as number) < 2) {
    return "hover_note";
  }
};
</script>

<template>
  <div class="interval">
    <table>
      <tr>
        <td colspan="5" class="title">
          <!-- 主音 -->
          <div class="inner_title">
            <Note :n_step_alter="tonic_choice_bar" />
            <div>
              {{ show_ward }}
            </div>
          </div>
        </td>
        <!-- 上行或下行的标题 -->
        <!--        <td colspan="4">{{ show_ward }}</td>-->
      </tr>
      <tr class="each_line">
        <td class="interval_index">2</td>
        <!-- 减二度一直不予以展示 -->
        <td class="each_cell">
          <div class="interval_title">减二度 (0)</div>
          <div class="note">
            <Note :n_step_alter="null" />
          </div>
        </td>
        <!-- 小二度 -->
        <td @click="update_tonic_choice(0)" class="each_cell" :class="hover_note_css(0)">
          <div class="interval_title">小二度 (1)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(0)" />
          </div>
        </td>
        <!-- 大二度 -->
        <td @click="update_tonic_choice(1)" class="each_cell" :class="hover_note_css(1)">
          <div class="interval_title">大二度 (2)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(1)" />
          </div>
        </td>
        <!-- 增二度 -->
        <td @click="update_tonic_choice(2)" class="each_cell" :class="hover_note_css(2)">
          <div class="interval_title">增二度 (3)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(2)" />
          </div>
        </td>
      </tr>

      <tr class="each_line">
        <td class="interval_index">3</td>
        <!-- 减三度 -->
        <td @click="get_note_info(3)" class="each_cell" :class="hover_note_css(3)">
          <div class="interval_title">减三度 (2)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(3)" />
          </div>
        </td>
        <!-- 小三度 -->
        <td @click="update_tonic_choice(4)" class="each_cell" :class="hover_note_css(4)">
          <div class="interval_title">小三度 (3)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(4)" />
          </div>
        </td>
        <!-- 大三度 -->
        <td @click="update_tonic_choice(5)" class="each_cell" :class="hover_note_css(5)">
          <div class="interval_title">大三度 (4)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(5)" />
          </div>
        </td>
        <!-- 减三度 -->
        <td @click="update_tonic_choice(6)" class="each_cell" :class="hover_note_css(6)">
          <div class="interval_title">增三度 (5)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(6)" />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <!-- 减四度 -->
        <td class="interval_index">4</td>
        <td @click="update_tonic_choice(7)" :class="hover_note_css(7)">
          <div class="interval_title">减四度 (4)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(7)" />
          </div>
        </td>
        <!-- 纯四度 -->
        <td colspan="2" @click="update_tonic_choice(8)" :class="hover_note_css(8)">
          <div class="interval_title">纯四度 (5)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(8)" />
          </div>
        </td>
        <!-- 增四度 -->
        <td @click="update_tonic_choice(9)" :class="hover_note_css(9)">
          <div class="interval_title">增四度 (6)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(9)" />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">5</td>
        <!-- 减五度 -->
        <td
          @click="update_tonic_choice(10)"
          class="each_cell"
          :class="hover_note_css(10)"
        >
          <div class="interval_title">减五度 (6)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(10)" />
          </div>
        </td>
        <!-- 纯五度 -->
        <td
          colspan="2"
          @click="update_tonic_choice(11)"
          class="each_cell"
          :class="hover_note_css(11)"
        >
          <div class="interval_title">纯五度 (7)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(11)" />
          </div>
        </td>
        <!-- 增五度 -->
        <td
          @click="update_tonic_choice(12)"
          class="each_cell"
          :class="hover_note_css(12)"
        >
          <div class="interval_title">增五度 (8)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(12)" />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">6</td>
        <!-- 减六度 -->
        <td
          @click="update_tonic_choice(13)"
          class="each_cell"
          :class="hover_note_css(13)"
        >
          <div class="interval_title">减六度 (7)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(13)" />
          </div>
        </td>
        <!-- 小六度 -->
        <td
          @click="update_tonic_choice(14)"
          class="each_cell"
          :class="hover_note_css(14)"
        >
          <div class="interval_title">小六度 (8)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(14)" />
          </div>
        </td>
        <!-- 大六度 -->
        <td
          @click="update_tonic_choice(15)"
          class="each_cell"
          :class="hover_note_css(15)"
        >
          <div class="interval_title">大六度 (9)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(15)" />
          </div>
        </td>
        <!-- 增六度 -->
        <td
          @click="update_tonic_choice(16)"
          class="each_cell"
          :class="hover_note_css(16)"
        >
          <div class="interval_title">增六度 (10)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(16)" />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">7</td>
        <!-- 减七度 -->
        <td
          @click="update_tonic_choice(17)"
          class="each_cell"
          :class="hover_note_css(17)"
        >
          <div class="interval_title">减七度 (9)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(17)" />
          </div>
        </td>
        <!-- 小七度 -->
        <td
          @click="update_tonic_choice(18)"
          class="each_cell"
          :class="hover_note_css(18)"
        >
          <div class="interval_title">小七度 (10)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(18)" />
          </div>
        </td>
        <!-- 大七度 -->
        <td
          @click="update_tonic_choice(19)"
          class="each_cell"
          :class="hover_note_css(19)"
        >
          <div class="interval_title">大七度 (11)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(19)" />
          </div>
        </td>
        <!-- 增七度 -->
        <td
          @click="update_tonic_choice(20)"
          class="each_cell"
          :class="hover_note_css(20)"
        >
          <div class="interval_title">增七度 (12)</div>
          <div class="note">
            <Note :n_step_alter="get_note_info(20)" />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";

.interval {
  table {
    //width: 22rem;
    height: 0;
    border: @bold-border;
    border-collapse: collapse;
    .each_cell {
      width: 5rem;
    }
    .title {
      //display: flex;
      //background-color: #fff162;
      //align-items: center;
      //justify-content: center;
      //width: 100%;
      .inner_title {
        display: inline-flex;

        div:last-child {
          //background-color: #e36868;
          display: inline-flex;
          //justify-content: center;
          align-items: center;
        }
      }
    }

    .interval_index {
      font-size: 1.2rem;
      width: 2rem;
    }

    .each_line {
      border-top: @thin-border;

      // td:not(:first-child) {
      //   //background-color: #d76c6c;
      // }
    }

    tr {
      padding: 0;
      margin: 0;
      border: 0;
    }

    .hover_note {
      &:hover {
        .hover_mixin();
      }
      &:active {
        .active_mixin();
      }
    }

    td {
      padding: 0;
      padding-top: 0.1rem;
      transition: ease-in-out all 0.2s;
      cursor: default;

      &:last-child {
        border: 0;
      }

      &:not(:first-child) {
        border-left: @thin-border;
      }
    }
  }
}
</style>
