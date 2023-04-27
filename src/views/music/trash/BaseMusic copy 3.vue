<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";

// const tonic_info = reactive({
//   tonic_step: "C",
//   tonic_alter: 0,
// });

// const tonic_db_info = computed(() =>
//   music_meta({ step: tonic_info.tonic_step, bias: tonic_info.tonic_alter }).first()
// );

// const get_note_info_by_uid = (uid: number) => music_meta({ uid: uid }).first();
// const get_note_info_by_step_and_alter = (step: string, alter: number) =>
//   music_meta({ step: step, bias: alter }).first();

// const full_db_info = computed(() =>
//   interval({ base_uid: tonic_db_info.value.uid }).first()
// );

// const set_new_tonic = (uid: number) => {
//   const new_tonic_info = get_note_info_by_uid(uid);
//   if (-1 <= new_tonic_info.bias && new_tonic_info.bias <= 1) {
//     tonic_info.tonic_step = new_tonic_info.step;
//     tonic_info.tonic_alter = new_tonic_info.bias;
//   }
// };
// const upward_interval_info = computed(() => full_db_info.value.interval_upward);
// const downward_interval_info = computed(() => full_db_info.value.interval_downward);
</script>

<template>
  <!-- 主音的选择条 -->
  <!-- <div class="tonic_choice">
    <a-radio-group v-model:value="tonic_info.tonic_step" button-style="solid">
      <a-radio-button value="C">C</a-radio-button>
      <a-radio-button value="D">D</a-radio-button>
      <a-radio-button value="E">E</a-radio-button>
      <a-radio-button value="F">F</a-radio-button>
      <a-radio-button value="G">G</a-radio-button>
      <a-radio-button value="A">A</a-radio-button>
      <a-radio-button value="B">B</a-radio-button>
    </a-radio-group>
    <span></span>
    <a-radio-group v-model:value="tonic_info.tonic_alter" button-style="solid">
      <a-radio-button :value="-1">Flat(♭)</a-radio-button>
      <a-radio-button :value="0">Natural</a-radio-button>
      <a-radio-button :value="1">Sharp(♯)</a-radio-button>
    </a-radio-group>
  </div>

  <div class="interval">
    <div class="upward">
      <table>
        <tr>
          <td>
            <div class="note">
              <Note :note_info="tonic_db_info" />
            </div>
          </td>
          <td colspan="4">上行</td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">2</td>
          <td>
            <div class="interval_title">减二度 (0)</div>
            <div class="note">
              <Note :note_info="null" />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[0].target_uid)">
            <div class="interval_title">小二度 (1)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[0].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[1].target_uid)">
            <div class="interval_title">大二度 (2)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[1].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[2].target_uid)">
            <div class="interval_title">增二度 (3)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[2].target_uid)"
              />
            </div>
          </td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">3</td>
          <td @click="set_new_tonic(upward_interval_info[3].target_uid)">
            <div class="interval_title">减三度 (2)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[3].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[4].target_uid)">
            <div class="interval_title">小三度 (3)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[4].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[5].target_uid)">
            <div class="interval_title">大三度 (4)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[5].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[6].target_uid)">
            <div class="interval_title">增三度 (5)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[6].target_uid)"
              />
            </div>
          </td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">4</td>
          <td @click="set_new_tonic(upward_interval_info[7].target_uid)">
            <div class="interval_title">减四度 (4)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[7].target_uid)"
              />
            </div>
          </td>
          <td colspan="2" @click="set_new_tonic(upward_interval_info[8].target_uid)">
            <div class="interval_title">纯四度 (5)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[8].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[9].target_uid)">
            <div class="interval_title">增四度 (6)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[9].target_uid)"
              />
            </div>
          </td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">5</td>
          <td @click="set_new_tonic(upward_interval_info[10].target_uid)">
            <div class="interval_title">减五度 (6)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[10].target_uid)"
              />
            </div>
          </td>
          <td colspan="2" @click="set_new_tonic(upward_interval_info[11].target_uid)">
            <div class="interval_title">纯五度 (7)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[11].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[12].target_uid)">
            <div class="interval_title">增五度 (8)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[12].target_uid)"
              />
            </div>
          </td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">6</td>
          <td @click="set_new_tonic(upward_interval_info[13].target_uid)">
            <div class="interval_title">减六度 (7)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[13].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[14].target_uid)">
            <div class="interval_title">小六度 (8)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[14].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[15].target_uid)">
            <div class="interval_title">大六度 (9)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[15].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[16].target_uid)">
            <div class="interval_title">增六度 (10)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[16].target_uid)"
              />
            </div>
          </td>
        </tr>
        <tr class="each_line">
          <td class="interval_index">7</td>
          <td @click="set_new_tonic(upward_interval_info[17].target_uid)">
            <div class="interval_title">减七度 (9)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[17].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[18].target_uid)">
            <div class="interval_title">小七度 (10)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[18].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[19].target_uid)">
            <div class="interval_title">大七度 (11)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[19].target_uid)"
              />
            </div>
          </td>
          <td @click="set_new_tonic(upward_interval_info[20].target_uid)">
            <div class="interval_title">增七度 (12)</div>
            <div class="note">
              <Note
                :note_info="get_note_info_by_uid(upward_interval_info[20].target_uid)"
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="gap"></div>
    <div class="downward">
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
    </div>
  </div> -->
</template>

<style scoped>
tr,
div,
table,
td {
  padding: 0;
  margin: 0;
}

.tonic_choice {
  width: 100%;
  /* background-color: rgb(255, 143, 143); */
}

.tonic_choice span {
  display: inline-block;
  width: 3rem;
}

p {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}

table {
  cursor: default;
}

table td {
  border: 1px black solid;
  margin: 0 auto;
}

.interval {
  /* width: 70rem; */
  height: 40rem;

  /* background-color: rgb(210, 255, 255); */
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.each_line {
  height: 3.5rem;
}

.each_line .interval_index {
  font-size: 1.2rem;
}

td .interval_title {
  width: 5rem;
}

div.interval_title {
  margin: 0 auto;
}

.interval > .gap {
  width: 3rem;
}

td {
  margin: 0;
  padding: 0;
}

.each_line .interval_title {
  /* width: 100%; */
  min-width: 100%;
  padding-top: 0.2rem;
  /* margin-bottom: -0.3rem; */
  /* background-color: rgb(74, 0, 94); */
}
td:hover {
  background-color: rgb(250, 255, 173);
  overflow: hidden;
}
td:active {
  background-color: #d8cc47;
  animation: infinite 2s;
}
table {
  border: 2px black solid;
  background-color: #fff;

  margin: 0;
  padding: 0;
}
</style>
