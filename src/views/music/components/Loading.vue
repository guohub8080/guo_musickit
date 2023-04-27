<script setup lang="ts">
import {ref} from "vue";
import {useScrollLock} from "@vueuse/core";

const el = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(el)
isLocked.value = true
</script>

<template>
  <div class="loading" @touchmove.prevent ref="el">
    <div class="out_circle">
      <div class="inner_circle">
        <div class="up_text">
          <a-spin class="spin_kit"/>
          <div>加载中...</div>
        </div>

      </div>

      <div class="bg_circle"></div>

    </div>

  </div>
</template>

<style scoped lang="less">
@circle-r: 20rem;
.blur {
  width: 100%;
  height: calc(100%);
  position: absolute;
  background-color: rgba(173, 173, 173, 0.5);
  filter: blur(40px);
  z-index: 99;
}

div.loading {

  width: 100%;
  background-color: rgba(28, 28, 30, 0.8);
  margin: 0 auto;
  height: calc(100vh);
  position: absolute;
  z-index: 100;
  overflow: hidden;
  //filter: blur(20px);
  .out_circle {
    display: block;
    width: @circle-r;
    height: @circle-r;
    border-radius: 99rem;
    margin: calc(20vh) auto 0;
    //background-color: #fff;
    //filter: blur(10px);
    .inner_circle {
      position: absolute;
      z-index: 102;

      .up_text {
        height: @circle-r;
        width: @circle-r;
        z-index: 101;
        font-size: 1.2rem;
        font-weight: 700;
        //background-color: #cb6666;
        display: flex;
        flex-direction: column;
        justify-content: center;
        //align-items: center;
      }
    }


  }

  .bg_circle {
    background-color: rgba(255, 255, 255, 0.95);
    filter: blur(8px);
    //position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: 200;

    @keyframes light_blur {
      0%, 100% {
        filter: blur(8px);
        transform: scale(1);
        opacity: 1;
      }
      50% {
        filter: blur(18px);
        transform: scale(1.2);
        opacity: 0.9
      }
    }
    animation: light_blur 2s infinite;
    animation-timing-function: ease-out;
  }

}
</style>
