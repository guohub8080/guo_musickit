<script setup lang="ts">
import {ref, reactive, onMounted, computed} from "vue";
import Note from "./ShowNote.vue";
import {get_n_db_by_uid, get_n_db_by_step_alter, r_itv_db} from "../trash/logic/utils";
import {ud_itv_db, n_db, step_alter} from "../trash/logic/utils";

// 先定义从父组件传下来的数据类型及props
defineProps<{
  itv_db: ud_itv_db[];
  tonic_db?: n_db;
  tonic_step_alter: step_alter;
  ward: string;
}>();

const emits = defineEmits<{
  (event_name: "update_tonic_choice", new_tonic_uid: number | undefined): number;
}>();

const update_tonic_choice = (prop_item: ud_itv_db[], index: number) => {
  emits("update_tonic_choice", prop_item[index]?.target_uid);
};

// 定义函数：期望将正确的音符的step和alter传输给ShowNote组件进行渲染
const get_n_props_by_index = (prop_item: ud_itv_db[], index: number): step_alter | null => {
  // console.log(prop, index);
  if (!prop_item) {
    return null;
  }

  if (prop_item[index]?.target_step) {
    return {step: prop_item[index]?.target_step, alter: prop_item[index]?.target_alter};
  } else {
    return null;
  }
};
// 单独处理CSS：如果有音符，那么可聚焦
const can_be_focus = (prop_item: ud_itv_db[], index: number) => {
  const type = typeof prop_item[index]?.target_alter
  if (type === "number") {
    if (-1 <= (prop_item[index].target_alter as number) && (prop_item[index].target_alter as number) <= 1) {
      return ["focus"]
    }
  }
  return null
}
</script>

<template>
  <div class="interval">
    <table>
      <tr>
        <td>
          <!-- 主音 -->
          <div class="note">
            <Note :n_step_alter="tonic_step_alter"/>
          </div>
        </td>
        <!-- 上行或下行的标题 -->
        <td colspan="4">{{ ward }}</td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">2</td>
        <!-- 减二度一直不予以展示 -->
        <!--        <td>-->
        <!--          <div class="interval_title">减二度 (0)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="null"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 小二度 -->
        <td @click="update_tonic_choice(itv_db, 0)" :class="can_be_focus(itv_db,0)">
          <div class="interval_title">小二度 (1)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 0)"/>
          </div>
        </td>
        <!-- 大二度 -->
        <td @click="update_tonic_choice(itv_db, 1)" :class="can_be_focus(itv_db,1)">
          <div class="interval_title">大二度 (2)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 1)"/>
          </div>
        </td>
        <!-- 增二度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 2)" :class="can_be_focus(itv_db,2)">-->
        <!--          <div class="interval_title">增二度 (3)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 2)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
      <tr class="each_line">
        <!-- 减三度 -->
        <td class="interval_index">3</td>
        <!--        <td @click="update_tonic_choice(itv_db, 3)" :class="can_be_focus(itv_db,3)">-->
        <!--          <div class="interval_title">减三度 (2)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 3)"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 小三度 -->
        <td @click="update_tonic_choice(itv_db, 4)" :class="can_be_focus(itv_db,4)">
          <div class="interval_title">小三度 (3)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 4)"/>
          </div>
        </td>
        <!-- 大三度 -->
        <td @click="update_tonic_choice(itv_db, 5)" :class="can_be_focus(itv_db,5)">
          <div class="interval_title">大三度 (4)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 5)"/>
          </div>
        </td>
        <!-- 增三度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 6)" :class="can_be_focus(itv_db,6)">-->
        <!--          <div class="interval_title">增三度 (5)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 6)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
      <tr class="each_line">
        <!-- 减四度 -->
        <td class="interval_index">4</td>
        <!--        <td @click="update_tonic_choice(itv_db, 7)" :class="can_be_focus(itv_db,7)">-->
        <!--          <div class="interval_title">减四度 (4)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 7)"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 纯四度 -->
        <td colspan="2" @click="update_tonic_choice(itv_db, 8)" :class="can_be_focus(itv_db,8)">
          <div class="interval_title">纯四度 (5)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 8)"/>
          </div>
        </td>
        <!-- 增四度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 9)" :class="can_be_focus(itv_db,9)">-->
        <!--          <div class="interval_title">增四度 (6)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 9)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
      <tr class="each_line">
        <!-- 减五度 -->
        <td class="interval_index">5</td>
        <!--        <td @click="update_tonic_choice(itv_db, 10)" :class="can_be_focus(itv_db,10)">-->
        <!--          <div class="interval_title">减五度 (6)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 10)"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 纯五度 -->
        <td colspan="2" @click="update_tonic_choice(itv_db, 11)" :class="can_be_focus(itv_db,11)">
          <div class="interval_title">纯五度 (7)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 11)"/>
          </div>
        </td>
        <!-- 增五度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 12)" :class="can_be_focus(itv_db,12)">-->
        <!--          <div class="interval_title">增五度 (8)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 12)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
      <tr class="each_line">
        <td class="interval_index">6</td>
        <!-- 减六度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 13)" :class="can_be_focus(itv_db,13)">-->
        <!--          <div class="interval_title">减六度 (7)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 13)"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 小六度 -->
        <td @click="update_tonic_choice(itv_db, 14)" :class="can_be_focus(itv_db,14)">
          <div class="interval_title">小六度 (8)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 14)"/>
          </div>
        </td>
        <!-- 大六度 -->
        <td @click="update_tonic_choice(itv_db, 15)" :class="can_be_focus(itv_db,15)">
          <div class="interval_title">大六度 (9)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 15)"/>
          </div>
        </td>
        <!-- 增六度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 16)" :class="can_be_focus(itv_db,16)">-->
        <!--          <div class="interval_title">增六度 (10)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 16)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
      <tr class="each_line">
        <td class="interval_index">7</td>
        <!-- 减七度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 17)" :class="can_be_focus(itv_db,17)">-->
        <!--          <div class="interval_title">减七度 (9)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 17)"/>-->
        <!--          </div>-->
        <!--        </td>-->
        <!-- 小七度 -->
        <td @click="update_tonic_choice(itv_db, 18)" :class="can_be_focus(itv_db,18)">
          <div class="interval_title">小七度 (10)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 18)"/>
          </div>
        </td>
        <!-- 大气度 -->
        <td @click="update_tonic_choice(itv_db, 19)" :class="can_be_focus(itv_db,19)">
          <div class="interval_title">大七度 (11)</div>
          <div class="note">
            <Note :n_step_alter="get_n_props_by_index(itv_db, 19)"/>
          </div>
        </td>
        <!-- 增七度 -->
        <!--        <td @click="update_tonic_choice(itv_db, 20)" :class="can_be_focus(itv_db,20)">-->
        <!--          <div class="interval_title">增七度 (12)</div>-->
        <!--          <div class="note">-->
        <!--            <Note :n_step_alter="get_n_props_by_index(itv_db, 20)"/>-->
        <!--          </div>-->
        <!--        </td>-->
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
.interval {
  @import "../styles/itv_table_common";

  table {

    tr {
      td:nth-child(1) {
        width: 0;
      }

      td {
        width: 10rem;
      }

      td.interval_index {
        font-size: 1.2rem;
      }
    }
  }

}

</style>
