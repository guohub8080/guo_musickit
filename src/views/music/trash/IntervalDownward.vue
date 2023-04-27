<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";

import Note from "./ShowNote.vue";
</script>

<template>
  <!-- <div class="downward">
    <table>
      <tr>
        <td>
          <div class="note">
            <Note :note_info="tonic_db_info" />
          </div>
        </td>
        <td colspan="4">下行</td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">2</td>
        <td>
          <div class="interval_title">减二度 (0)</div>
          <div class="note">
            <Note :note_info="null" />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[0].target_uid)">
          <div class="interval_title">小二度 (1)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[0].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[1].target_uid)">
          <div class="interval_title">大二度 (2)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[1].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[2].target_uid)">
          <div class="interval_title">增二度 (3)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[2].target_uid)"
            />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">3</td>
        <td @click="set_new_tonic(downward_interval_info[3].target_uid)">
          <div class="interval_title">减三度 (2)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[3].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[4].target_uid)">
          <div class="interval_title">小三度 (3)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[4].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[5].target_uid)">
          <div class="interval_title">大三度 (4)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[5].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[6].target_uid)">
          <div class="interval_title">增三度 (5)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[6].target_uid)"
            />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">4</td>
        <td @click="set_new_tonic(downward_interval_info[7].target_uid)">
          <div class="interval_title">减四度 (4)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[7].target_uid)"
            />
          </div>
        </td>
        <td colspan="2" @click="set_new_tonic(downward_interval_info[8].target_uid)">
          <div class="interval_title">纯四度 (5)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[8].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[9].target_uid)">
          <div class="interval_title">增四度 (6)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[9].target_uid)"
            />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">5</td>
        <td @click="set_new_tonic(downward_interval_info[10].target_uid)">
          <div class="interval_title">减五度 (6)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[10].target_uid)"
            />
          </div>
        </td>
        <td colspan="2" @click="set_new_tonic(downward_interval_info[11].target_uid)">
          <div class="interval_title">纯五度 (7)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[11].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[12].target_uid)">
          <div class="interval_title">增五度 (8)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[12].target_uid)"
            />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">6</td>
        <td @click="set_new_tonic(downward_interval_info[13].target_uid)">
          <div class="interval_title">减六度 (7)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[13].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[14].target_uid)">
          <div class="interval_title">小六度 (8)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[14].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[15].target_uid)">
          <div class="interval_title">大六度 (9)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[15].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[16].target_uid)">
          <div class="interval_title">增六度 (10)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[16].target_uid)"
            />
          </div>
        </td>
      </tr>
      <tr class="each_line">
        <td class="interval_index">7</td>
        <td @click="set_new_tonic(downward_interval_info[17].target_uid)">
          <div class="interval_title">减七度 (9)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[17].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[18].target_uid)">
          <div class="interval_title">小七度 (10)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[18].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[19].target_uid)">
          <div class="interval_title">大七度 (11)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[19].target_uid)"
            />
          </div>
        </td>
        <td @click="set_new_tonic(downward_interval_info[20].target_uid)">
          <div class="interval_title">增七度 (12)</div>
          <div class="note">
            <Note
              :note_info="get_note_info_by_uid(downward_interval_info[20].target_uid)"
            />
          </div>
        </td>
      </tr>
    </table>
  </div> -->
</template>

<style scoped></style>
