<script setup lang="ts">
import { ref, reactive, computed, ComputedRef } from "vue";
import Note from "./ShowNote.vue";
import useMusicStore from "../logic/music_store";
import db_reverse_scsale from "../logic/db_reverse_scale";
import { storeToRefs } from "pinia";

import { scale_db, get_step_alter_by_uid, reverse_scale_db, to_db } from "../logic/utils";
import db_note_meta from "../logic/db_note_meta";
const store = useMusicStore();
const {
  tonic_n_db,
  is_show_scale_rome,
  reverse_scale_show_by,
  show_scale_id,
} = storeToRefs(store);
const { set_new_tonic_by_uid, numer_to_rome } = store;
// 从数据库中找到和具体调式有关的那条信息：
const reverse_scale: ComputedRef<reverse_scale_db> = computed(() => {
  return db_reverse_scsale({ base_uid: tonic_n_db.value.uid }).first();
});

const chords_in_scale = computed(() => {
  const ready_db = to_db(reverse_scale.value.chords_in_scale);
  if (ready_db().get().length === 0) {
    return [];
  }
  const ion_info = ready_db({ target_mode_id: "ION" }).get();
  const aeo_info = ready_db({ target_mode_id: "AEO" }).get();
  const dor_info = ready_db({ target_mode_id: "DOR" }).get();
  const phr_info = ready_db({ target_mode_id: "PHR" }).get();
  const lyd_info = ready_db({ target_mode_id: "LYD" }).get();
  const mly_info = ready_db({ target_mode_id: "MLY" }).get();
  const loc_info = ready_db({ target_mode_id: "LOC" }).get();
  return [
    { mode_name: "自然大调", chords_info: ion_info },
    { mode_name: "自然小调", chords_info: aeo_info },
    { mode_name: "Dorian小调", chords_info: dor_info },
    { mode_name: "Phrygian小调", chords_info: phr_info },
    { mode_name: "Lydian大调", chords_info: lyd_info },
    { mode_name: "Mixo-lydian大调", chords_info: mly_info },
    { mode_name: "Locrian半减七调", chords_info: loc_info },
  ];
});

const note_order_in_chord = (order: number) => {
  if (order === 1) {
    return "三";
  } else if (order === 2) {
    return "五";
  } else if (order === 3) {
    return "七";
  }
};

const chord_type_cn = (type: number) => {
  if (type === 3) {
    return "三和弦";
  } else if (type === 7) {
    return "七和弦";
  }
};

const set_new_scale = (tonic_uid: number, mode_id: string) => {
  set_new_tonic_by_uid(tonic_uid);
  show_scale_id.value = mode_id;
};
</script>

<template>
  <div v-show="chords_in_scale.length > 0">
    <table>
      <tr>
        <td colspan="3" style="height: 2rem">
          包含 {{ tonic_n_db.art_name }} 的调内和弦
          <span style="color: gray; margin-left: 3rem; font-weight: 400">
            忽略
            {{ tonic_n_db.art_name }}
            作为主音音阶的调内和弦</span
          >
        </td>
      </tr>

      <tr v-for="item in chords_in_scale">
        <td v-show="item.chords_info.length > 0">
          <div class="each_mode_name">{{ item.mode_name }}</div>
          <div class="outer">
            <div
              v-for="chord_info in item.chords_info"
              class="inner_each"
              @click="
                set_new_scale(chord_info.target_tonic_uid, chord_info.target_mode_id)
              "
            >
              <div>
                <Note
                  :n_step_alter="{
                    step: chord_info.chord_root_step,
                    alter: chord_info.chord_root_alter,
                  }"
                  class="inner_chord"
                  :chord_term="chord_info.chord_show_term"
                />
              </div>
              <div>
                <b>{{ chord_info.target_tonic_art_name }} </b>
                调
                {{
                  is_show_scale_rome
                    ? numer_to_rome(chord_info.chord_degree_in_scale)
                    : chord_info.chord_degree_in_scale
                }}
                级
              </div>
              <div>
                {{ chord_type_cn(chord_info.chord_type)
                }}{{ note_order_in_chord(chord_info.note_order_in_chord) }}音
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <div v-show="chords_in_scale.length == 0">
    <table>
      <tr>
        <td colspan="3" style="height: 2rem">
          包含 {{ tonic_n_db.art_name }} 的调内和弦
        </td>
      </tr>
      <tr>
        <td style="height: 5rem; font-size: 1rem; color: gray">无 数 据</td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";
@table_left: 8rem;
@table_width: 38rem;

table {
  margin: 0 auto;
  margin-top: 1.5rem;
  width: 38rem;
  padding: 0;
  border: @bold-border;
  td {
    border: @thin-border;
    padding: 0;
  }
  tr:first-child {
    font-weight: 700;
  }
  .each_mode_name {
    // height: 2rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    vertical-align: center;
    background-color: rgb(239, 239, 239);
  }
  .outer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // row-gap: 1rem;
    // justify-items: a;

    .inner_each {
      // border: @thin-border;
      width: 6rem;
      border-radius: 0.3rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      div:nth-child(2) {
        margin-top: -0.3rem;
      }
      .inner_chord {
        display: flex;
        justify-content: center;
      }
      transition: all ease-in-out 0.2s;
      &:hover {
        .hover_mixin();
      }
      &:active{
        .active_mixin();
      }
    }
  }
}
</style>
