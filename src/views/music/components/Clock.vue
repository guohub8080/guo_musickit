<script setup lang="ts">
import {computed, ref} from "vue";
import useMusicStore from "../logic/music_store";
import {storeToRefs} from "pinia";

const store = useMusicStore();
const {tonic_choice_bar, tonic_n_db, chord_list} = storeToRefs(store);

const loc_id_list = computed(() => {
  try {
    return chord_list.value.map((x?: any) => x?.loc_id)
  } catch (e) {
    console.log(e)
    return []
  }

})
const show_clock_line = (locid: number) => {
  // if (clock_loc_id_list.value.includes(locid)) {
  //   return "show_line";
  // }
  try {
    if (loc_id_list?.value.includes(locid)) {
      if (loc_id_list?.value[0] === locid) {
        return "show_line root_line"
      } else {
        return "show_line"
      }
    } else return null

  } catch (e) {
    console.log(e)
  }

};
</script>

<template>
  <div class="clock_frame">


    <img class="clock" src="../svgs/clock_face.svg" alt=""/>
    <img class="line" :class="show_clock_line(1)" src="../svgs/clock_line.svg" alt=""/>
    <img
        class="line trans1"
        :class="show_clock_line(2)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans2"
        :class="show_clock_line(3)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans3"
        :class="show_clock_line(4)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans4"
        :class="show_clock_line(5)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans5"
        :class="show_clock_line(6)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans6"
        :class="show_clock_line(7)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans7"
        :class="show_clock_line(8)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans8"
        :class="show_clock_line(9)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans9"
        :class="show_clock_line(10)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans10"
        :class="show_clock_line(11)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img
        class="line trans11"
        :class="show_clock_line(12)"
        src="../svgs/clock_line.svg"
        alt=""
    />
    <img src="../svgs/clock_bg.svg" class="clock clock_bg" alt="">
  </div>
</template>

<style scoped lang="less">
@clock_width: 30rem;

.clock_frame {
  width: @clock_width;
  height: @clock_width;
  padding: 0;
  margin: 0;
  user-select: none;

  .clock {
    display: block;
    width: @clock_width;
    position: absolute;
    padding: 0;
    margin: 0;
    z-index: -99;
  }

  .line {
    width: @clock_width;
    display: block;
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
    z-index: -100;
    opacity: 0;
  }

  .root_line {

    filter:drop-shadow(3px 0 #d56060) ;
    z-index: -101;
  }

  .show_line {
    opacity: 100%;
  }

  .trans1 {
    transform: rotate(30deg);
  }

  .trans2 {
    transform: rotate(60deg);
  }

  .trans3 {
    transform: rotate(90deg);
  }

  .trans4 {
    transform: rotate(120deg);
  }

  .trans5 {
    transform: rotate(150deg);
  }

  .trans6 {
    transform: rotate(180deg);
  }

  .trans7 {
    transform: rotate(210deg);
  }

  .trans8 {
    transform: rotate(240deg);
  }

  .trans9 {
    transform: rotate(270deg);
  }

  .trans10 {
    transform: rotate(300deg);
  }

  .trans11 {
    transform: rotate(330deg);
  }

  .clock_bg {
    position: absolute;
    z-index: -102;
  }
}
</style>
