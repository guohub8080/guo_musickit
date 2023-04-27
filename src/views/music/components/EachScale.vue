<script setup lang="ts">
import { ref, reactive, onMounted, computed, ComputedRef } from "vue";
import Note from "./ShowNote.vue";
import useMusicStore from "../logic/music_store";
import { storeToRefs } from "pinia";
import PopChord from "./PopChord.vue";
import { scale_db, get_step_alter_by_uid } from "../logic/utils";
// import { scale } from "../logic/musicdb";
import scale from "../logic/db_scale";
const store = useMusicStore();
const { tonic_choice_bar, tonic_n_db, is_show_scale_rome, show_scale_id } = storeToRefs(
  store
);

// 从数据库中找到和具体调式有关的那条信息：
const tonic_scale: ComputedRef<scale_db> = computed(() => {
  return scale({
    base_step: tonic_choice_bar.value.step,
    base_alter: tonic_choice_bar.value.alter,
    mode_id: show_scale_id.value,
  }).first();
});
</script>

<template>
  <div>
    <table class="scale" :class="tonic_scale.is_trans ? 'is_trans' : null">
      <tr>
        <td>
          <Note :n_step_alter="get_step_alter_by_uid(tonic_scale.base_uid)" />
        </td>
        <td>{{ is_show_scale_rome ? "主 Ⅰ" : "主 1" }}</td>
        <td>{{ is_show_scale_rome ? "上主 Ⅱ" : "上主 2" }}</td>
        <td>{{ is_show_scale_rome ? "中 Ⅲ" : "中 3" }}</td>
        <td>{{ is_show_scale_rome ? "下属 Ⅳ" : "下属 4" }}</td>
        <td>{{ is_show_scale_rome ? "属 Ⅴ" : "属 5" }}</td>
        <td>{{ is_show_scale_rome ? "下中 Ⅵ" : "下中 6" }}</td>
        <td>{{ is_show_scale_rome ? "导 Ⅶ" : "导 7" }}</td>
      </tr>
      <tr>
        <td>
          {{ tonic_scale.mode_name }}
        </td>
        <td v-for="each_note in tonic_scale.notes">
          <Note :n_step_alter="get_step_alter_by_uid(each_note.uid)" />
        </td>
      </tr>
    </table>

    <table class="chord">
      <tr>
        <td class="tiny">调内</td>
        <td>{{ is_show_scale_rome ? "Ⅰ 级" : " 1 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅱ 级" : " 2 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅲ 级" : " 3 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅳ 级" : " 4 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅴ 级" : " 5 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅵ 级" : " 6 级" }}</td>
        <td>{{ is_show_scale_rome ? "Ⅶ 级" : " 7 级" }}</td>
      </tr>

      <tr>
        <td>三和弦</td>
        <td v-for="(item, index) in tonic_scale.degree_chord3" class="popup">
          <a-popover
            :title="item.chord_name + '和弦'"
            :placement="index === 6 ? 'bottomRight' : 'bottom'"
          >
            <template #content> <PopChord :notes="item.chord_notes" /> </template>
            <div class="show_chord">
              <Note
                :n_step_alter="get_step_alter_by_uid(item.root_uid)"
                :chord_term="item.chord_show_term"
              />
            </div>
          </a-popover>
        </td>
      </tr>

      <tr>
        <td>七和弦</td>
        <td v-for="(item, index) in tonic_scale.degree_chord7" class="popup">
          <a-popover
            :title="item.chord_name + '和弦'"
            :placement="index === 6 ? 'bottomRight' : 'bottom'"
          >
            <template #content> <PopChord :notes="item.chord_notes" /> </template>
            <div class="show_chord">
              <Note
                :n_step_alter="get_step_alter_by_uid(item.root_uid)"
                :chord_term="item.chord_show_term"
              />
            </div>
          </a-popover>
          <!-- {{ item }} -->
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import "../styles/itv_table_common.less";
@table_left: 8rem;
@table_width: 38rem;
table.scale {
  margin: 0 auto;
  border-top: @bold-border;
  border-left: @bold-border;
  border-right: @bold-border;
  width: @table_width;
  // border-collapse: collapse;
  // border-bottom: @bold-border;

  tr {
    &:first-child {
      border-bottom: @thin-border;
      td:not(:first-child) {
        font-weight: 700;
      }
    }
    &:last-child {
      border-bottom: 0;
    }
    td {
      padding: 0;
      border-left: @thin-border;
      &:first-child {
        width: @table_left;
      }
    }
  }
}

table.chord {
  margin: 0 auto;
  // margin-top: 1rem;
  border-left: @bold-border;
  border-right: @bold-border;
  border-bottom: @bold-border;
  border-top: @bold-border;
  width: @table_width;
  transition: all ease-in-out 0.2s;
  tr {
    border-top: @thin-border;
    &:first-child {
      height: 2rem;
      font-weight: 700;
    }
    td {
      padding: 0;
      border-left: @thin-border;
      cursor: default;
    }
    .popup:hover {
      .hover_mixin();
      cursor: default;
    }
  }
  .tiny {
    width: 4rem;
  }
}

.is_trans {
  background-color: #CFD8DC;
}

.show_chord {
  display: inline-block !important;
}
</style>
