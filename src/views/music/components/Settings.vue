<script lang="ts" setup>
import { reactive, toRefs, watch } from "vue";
import useMS from "../logic/music_store";
import { storeToRefs } from "pinia";
const store = useMS();

const {
  is_show_scale_rome,
  show_scale_id,
  reverse_scale_show_by,
} = storeToRefs(store);
</script>

<template>
  <div class="settings">
<!--    <div class="is_pro_mode">-->
<!--      <div class="btn_line">-->
<!--        <span>音程Pro模式</span>-->
<!--        <a-switch v-model:checked="pro_mode_on" class="right" />-->
<!--      </div>-->

<!--      <div class="tip">-->
<!--        当前{{-->
<!--          pro_mode_on-->
<!--            ? "开启。开启后，将增减音程一并列入显示。"-->
<!--            : "关闭。关闭后，增减音程不列入显示。"-->
<!--        }}-->
<!--      </div>-->
<!--    </div>-->

    <div class="scale_num_mode">
      <div class="btn_line">
        <span>以罗马数字显示</span>
        <a-switch v-model:checked="is_show_scale_rome" class="right" />
      </div>

      <div class="tip">
        {{ is_show_scale_rome ? "效果预览：主Ⅰ 属Ⅴ 导Ⅶ" : "效果预览：主1  属5  导7" }}
      </div>
    </div>
    <div class="show_scales">
      <div class="btn_line">
        <span>音阶显示选择</span>
      </div>
      <div style="height: 0.3rem"></div>
      <a-radio-group v-model:value="show_scale_id">
        <a-radio value="ION" class="mode_options">自然大调（Ionia）</a-radio>
        <a-radio value="AEO" class="mode_options">自然小调（Aeolian）</a-radio>
        <a-radio value="DOR" class="mode_options">Dorian小调</a-radio>
        <a-radio value="PHR" class="mode_options">Phrygian小调</a-radio>
        <a-radio value="LYD" class="mode_options">Lydian大调</a-radio>
        <a-radio value="MLY" class="mode_options">Mixo-lydian大调</a-radio>
        <a-radio value="LOC" class="mode_options">Locrian半减七调</a-radio>
      </a-radio-group>
    </div>
    <div class="reverse_by">
      <div class="btn_line">
        <span>反向音阶显示</span>
      </div>
      <div style="height: 0.3rem"></div>
      <a-radio-group v-model:value="reverse_scale_show_by">
        <a-radio value="by_mode" class="mode_options">按音阶</a-radio>
        <a-radio value="by_tonic" class="mode_options">按主音</a-radio>
      </a-radio-group>
    </div>
  </div>
  <div style="height: 1.5rem"></div>
</template>

<style scoped lang="less">
.settings {
  // background-color: rgb(246, 246, 246);
  width: 12rem;
  margin: 0 auto;
  text-align: left;
  margin-top: -1rem;
  margin-bottom: -1rem;

  .ant-divider {
    margin-top: 0;
    margin-bottom: 0;
  }

  span {
    font-weight: 700;
  }

  .show_scales {
    display: block;
    .right {
      margin-right: -0.4rem;
    }
  }
  .btn_line {
    margin-top: 1.2rem;
    display: flex;
    .right {
      margin-left: auto;
    }
  }
  .tip {
    margin-top: 5px;
    display: block;
    text-align: justify;
    color: rgb(118, 118, 118);
    margin-bottom: 0.3rem;
    //font-size: 0.6rem;
  }
}

.mode_options {
  display: block;
  margin-top: -5px;
  margin-bottom: -5px;
}
</style>
