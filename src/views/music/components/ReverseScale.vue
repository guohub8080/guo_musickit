<script setup lang="ts">
import { ref, reactive, computed, ComputedRef } from "vue";
import Note from "./ShowNote.vue";
import useMusicStore from "../logic/music_store";
import db_reverse_scsale from "../logic/db_reverse_scale";
import { storeToRefs } from "pinia";
import { scale_db, get_step_alter_by_uid, reverse_scale_db, to_db } from "../logic/utils";

const store = useMusicStore();
const {
  tonic_n_db,
  reverse_scale_show_by,
  show_scale_id,
  is_show_scale_rome,
} = storeToRefs(store);
const { set_new_tonic_by_uid, numer_to_rome } = store;
// 从数据库中找到和具体调式有关的那条信息：
const reverse_scale: ComputedRef<reverse_scale_db> = computed(() => {
  return db_reverse_scsale({ base_uid: tonic_n_db.value.uid }).first();
});

const show_reverse_by_mode = computed(() => {
  if (reverse_scale.value.reverse_scale.length == 0) {
    return [];
  }
  const ready_db = to_db(reverse_scale.value.reverse_scale);
  const ion_info = ready_db({ target_mode_id: "ION" }).get();
  const aeo_info = ready_db({ target_mode_id: "AEO" }).get();
  const dor_info = ready_db({ target_mode_id: "DOR" }).get();
  const phr_info = ready_db({ target_mode_id: "PHR" }).get();
  const lyd_info = ready_db({ target_mode_id: "LYD" }).get();
  const mly_info = ready_db({ target_mode_id: "MLY" }).get();
  const loc_info = ready_db({ target_mode_id: "LOC" }).get();
  return [
    { mode_name: "自然大调", scale_info: ion_info },
    { mode_name: "自然小调", scale_info: aeo_info },
    { mode_name: "Dorian小调", scale_info: dor_info },
    { mode_name: "Phrygian小调", scale_info: phr_info },
    { mode_name: "Lydian大调", scale_info: lyd_info },
    { mode_name: "Mixo-lydian大调", scale_info: mly_info },
    { mode_name: "Locrian半减七调", scale_info: loc_info },
  ];
});

const show_reverse_by_tonic = computed(() => {
  if (reverse_scale.value.reverse_scale.length == 0) {
    return [];
  }
  const ready_db = to_db(reverse_scale.value.reverse_scale);
  const uid_list = Array.from(
    new Set(
      ready_db()
        .get()
        .map((x: any) => x.target_tonic_uid)
    )
  );

  const result = uid_list.map((x) => {
    const each_info = ready_db({ target_tonic_uid: x }).get();
    return { uid: x, info: each_info };
  });
  return result;
});

const set_new_scale = (tonic_uid: number, mode_id: string) => {
  set_new_tonic_by_uid(tonic_uid);
  show_scale_id.value = mode_id;
};
</script>

<template>
  <!-- 通过主音进行展示 -->
  <div v-show="reverse_scale_show_by === 'by_mode'" class="by_mode">
    <div v-show="show_reverse_by_mode.length > 0">
      <table>
        <tr>
          <td colspan="2">包含 {{ tonic_n_db.art_name }} 的调式：按音阶显示</td>
        </tr>

        <tr v-for="item in show_reverse_by_mode">
          <td v-show="item.scale_info.length > 0" class="mode_name_col">
            {{ item.mode_name }}
          </td>
          <td v-show="item.scale_info.length > 0">
            <div class="by_tonic_show_notes_outer">
              <div
                v-for="info in item.scale_info"
                class="inner_each"
                @click="set_new_scale(info.target_tonic_uid, info.target_mode_id)"
              >
                <Note
                  :n_step_alter="{
                    step: info.target_tonic_step,
                    alter: info.target_tonic_alter,
                  }"
                  class="inner_note"
                />
                <div class="tone_num">
                  {{
                    is_show_scale_rome
                      ? numer_to_rome(info.target_tone_number)
                      : info.target_tone_number
                  }}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="show_reverse_by_mode.length === 0">
      <table>
        <tr>
          <td colspan="2">包含 {{ tonic_n_db.art_name }} 的调式</td>
        </tr>
        <tr>
          <td style="height: 5rem; font-size: 1rem; color: gray">无 数 据</td>
        </tr>
      </table>
    </div>
  </div>
  <!-- 通过音阶进行展示 -->
  <div v-show="reverse_scale_show_by === 'by_tonic'" class="by_tonic">
    <div v-show="show_reverse_by_tonic.length > 0">
      <table>
        <tr>
          <td colspan="2">包含 {{ tonic_n_db.art_name }} 的调式：按主音显示</td>
        </tr>

        <tr v-for="item in show_reverse_by_tonic">
          <td class="left_note_name">
            <!-- {{ item.uid }} -->
            <Note :n_step_alter="get_step_alter_by_uid(item.uid as number)"></Note>
          </td>
          <td>
            <!-- {{ item.info }} -->
            <div class="by_tonic_outer">
              <div
                class="inner_one"
                v-for="info in item.info"
                @click="set_new_scale(info.target_tonic_uid, info.target_mode_id)"
              >
                {{ info.target_mode_name }}
                (
                {{
                  is_show_scale_rome
                    ? numer_to_rome(info.target_tone_number)
                    : info.target_tone_number
                }}
                )
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="show_reverse_by_tonic.length === 0">
      <table>
        <tr>
          <td colspan="2">包含 {{ tonic_n_db.art_name }} 的调式</td>
        </tr>
        <tr>
          <td style="height: 5rem; font-size: 1rem; color: gray">无 数 据</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";

@table_left: 8rem;
@table_width: 38rem;

table {
  margin: 0 auto;
  width: 38rem;
  border-collapse: collapse;
  border: @bold-border;
  tr:first-child {
    font-weight: 700;
    height: 2rem;
  }
  td {
    border: @thin-border;
    padding: 0;
  }
}

.by_mode {
  margin-top: 1.5rem;
  .mode_name_col {
    width: 10rem;
  }
  .by_tonic_show_notes_outer {
    width: 100%;
    display: flex;
    // align-items: center;
    justify-content: space-between;

    .inner_each {
      // background-color: rgb(223, 129, 129);
      display: flex;
      // border: 1px black solid;
      width: 100%;
      // align-content: center;
      // align-items: center;
      // justify-items: flex-end;
      flex-direction: column;
      &:not(:first-child) {
        border-left: 1px dotted #9e9e9e;
      }
      &:hover {
        .hover_mixin();
      }
      &:active{
        .active_mixin();
      }
      .inner_note {
        // background-color: rgb(255, 177, 177);
        border-radius: 0.3rem;
        padding-left: -1rem;
        // width: 0;
      }
      .tone_num {
        margin-top: -0.5rem;
      }
    }
  }
}

.by_tonic {
  margin-top: 1.5rem;

  table {
    .left_note_name {
      width: 4rem;
    }

    .by_tonic_outer {
      // background-color: rgb(147, 55, 55);
      margin-top: 2px;
      margin-bottom: 2px;
      display: flex;
      flex-wrap: wrap;
      // align-items: center;
      justify-content: space-evenly;

      .inner_one {
        padding-top: 1px;
        padding-bottom: 1px;
        // border: 1px black solid;
        width: 11rem;
        transition: all ease-in-out 0.2s;
        &:hover {

          .hover_mixin();
          border-radius: 0.2rem;

          font-weight: 700;
        }
      }
    }
  }
}
</style>
