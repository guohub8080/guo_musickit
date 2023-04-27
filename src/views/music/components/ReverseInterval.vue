<script setup lang="ts">
// 先定义从父组件传下来的数据类型及props
import {n_db, r_itv_db, step_alter, ud_itv_db} from "../logic/utils";
import Note from "./ShowNote.vue"
import interval_info from "../logic/db_interval"
import ReverseBar from "./ReverseBar.vue"
import useMusicStore from "@/views/music/logic/music_store";
import {storeToRefs} from "pinia";
import {computed, ComputedRef} from "vue";

const store = useMusicStore();
const {tonic_choice_bar, tonic_n_db, is_show_scale_rome, show_scale_id} = storeToRefs(
    store
)

const {set_new_tonic_by_uid} = store

const reverse_itv_info: ComputedRef<r_itv_db[]> = computed(() => {
  return interval_info({base_uid: tonic_n_db.value.uid}).first().reverse_interval
})

const make_step_alter = (step: string, alter: number = 0): step_alter => {
  return {
    step, alter
  }
}

const show_cell = (given_step: string) => {
  if (tonic_choice_bar.value.step === given_step) {
    return "hide_cell"
  }

}

</script>

<template>
  <div class="reverse_interval">
    <table>
      <tr>
        <td rowspan="3" class="index_note">
          <div class="note">
            <Note :n_step_alter="tonic_choice_bar"/>
          </div>
        </td>
        <td :class="show_cell('C')" @click="set_new_tonic_by_uid(reverse_itv_info[0].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('C')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[0]"></ReverseBar>

          </div>
        </td>
        <td :class="show_cell('D')" @click="set_new_tonic_by_uid(reverse_itv_info[1].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('D')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[1]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('E')" @click="set_new_tonic_by_uid(reverse_itv_info[2].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('E')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[2]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('F')" @click="set_new_tonic_by_uid(reverse_itv_info[3].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('F')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[3]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('G')" @click="set_new_tonic_by_uid(reverse_itv_info[4].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('G')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[4]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('A')" @click="set_new_tonic_by_uid(reverse_itv_info[5].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('A')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[5]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('B')" @click="set_new_tonic_by_uid(reverse_itv_info[6].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('B')"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[6]"></ReverseBar>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="show_cell('C')" @click="set_new_tonic_by_uid(reverse_itv_info[7].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('C',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[7]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('D')" @click="set_new_tonic_by_uid(reverse_itv_info[8].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('D',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[8]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('E')" @click="set_new_tonic_by_uid(reverse_itv_info[9].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('E',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[9]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('F')" @click="set_new_tonic_by_uid(reverse_itv_info[10].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('F',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[10]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('G')" @click="set_new_tonic_by_uid(reverse_itv_info[11].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('G',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[11]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('A')" @click="set_new_tonic_by_uid(reverse_itv_info[12].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('A',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[12]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('B')" @click="set_new_tonic_by_uid(reverse_itv_info[13].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('B',1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[13]"></ReverseBar>
          </div>
        </td>
      </tr>
      <tr>
        <td :class="show_cell('C')" @click="set_new_tonic_by_uid(reverse_itv_info[14].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('C',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[14]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('D')" @click="set_new_tonic_by_uid(reverse_itv_info[15].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('D',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[15]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('E')" @click="set_new_tonic_by_uid(reverse_itv_info[16].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('E',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[16]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('F')" @click="set_new_tonic_by_uid(reverse_itv_info[17].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('F',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[17]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('G')" @click="set_new_tonic_by_uid(reverse_itv_info[18].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('G',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[18]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('A')" @click="set_new_tonic_by_uid(reverse_itv_info[19].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('A',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[19]"></ReverseBar>
          </div>
        </td>
        <td :class="show_cell('B')" @click="set_new_tonic_by_uid(reverse_itv_info[20].target_uid)">
          <div class="note">
            <Note :n_step_alter="make_step_alter('B',-1)"/>
          </div>
          <div class="each_group">
            <ReverseBar :data="reverse_itv_info[20]"></ReverseBar>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";

.reverse_interval {
  table {
    margin: 0 auto;
    border: @bold-border;
    width: 45.8rem;

    td {
      border: @thin-border;
      width: 10rem;
      cursor: default;
      transition: all ease-in 0.2s;

      &:not(.index_note) {
        &:hover {
          .hover_mixin()
        }

        &:active {
          .active_mixin()
        }
      }
    }

    .index_note {
      width: 0;
    }
  }

}

.hide_cell {
  display: none;
}
</style>
