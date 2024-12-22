import { defineStore } from 'pinia'
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';
import { get_n_db_by_uid, to_db, step_alter, n_db } from "./utils";
// import { note_meta } from './_musicdb';
import note_meta from "./db_note_meta"
import { useRoute } from "vue-router";
import calculated_chord from "./calculate_clock"
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export default defineStore('music', () => {
    // 主音的选择条：
    const tonic_choice_bar: Ref<step_alter> = ref({
        step: "C",
        alter: 0,
    });

    // 主音的数据库：
    const tonic_n_db: ComputedRef<n_db> = computed(() => {
        return note_meta({
            step: tonic_choice_bar.value.step,
            alter: tonic_choice_bar.value.alter,
        }).first();
    });

    const nth = computed(() => {

        const route = useRoute();
        // console.log(route.path)
        switch (route.path) {
            case "/readme":
                return 1;
            case "/interval":
                return 2;
            case "/scales":
                return 3;
            case "/chord":
                return 4;
        }
    })
    // 如何显示音阶？阿拉伯数字或罗马数字,true的时候显示罗马数字，false的时候显示普通数字
    const is_show_scale_rome = ref(true)

    // 需要显示的音阶：
    const show_scale_id = ref("ION")

    // 是否加载
    const is_loading = ref(false)


    // 和弦选择的内容
    const chord_choice_bar = ref(["3", "maj3"]);

    // 和弦clock表的内容
    // const chord_list = calculated_chord(tonic_n_db.value, chord_choice_bar.value[1])
    const chord_list = computed(()=>{
        return calculated_chord(tonic_n_db.value, chord_choice_bar.value[1])
    })


    // 更新新的主音，通过uid
    function set_new_tonic_by_uid(new_uid: number) {
        const new_tonic_db = note_meta({ uid: new_uid }).first();
        tonic_choice_bar.value = { step: new_tonic_db.step, alter: new_tonic_db.alter }
        // tonic_choice_bar.value.step = new_tonic_db.step
        // tonic_choice_bar.value.alter = new_tonic_db.alter
    }

    // 通过step和alter更新主音
    function set_new_tonic_by_step_alter(new_step: string, new_alter: number) {
        const new_tonic_db = note_meta({ step: new_step, alter: new_alter }).first();
        tonic_choice_bar.value = { step: new_tonic_db.step, alter: new_tonic_db.alter }
        // tonic_choice_bar.step = new_tonic_db.step
        // tonic_choice_bar.alter = new_tonic_db.alter
    }

    // 罗马或普通数字
    const numer_to_rome = (num: number) => {
        if (!is_show_scale_rome) {
            return num
        }
        const rome_li = [null, "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"]
        return rome_li[num]
    }
    // 反向音阶以什么显示？按主音显示还是按音阶显示？
    const reverse_scale_show_by = ref("by_mode");
    return {
        tonic_choice_bar, tonic_n_db, set_new_tonic_by_uid, numer_to_rome, nth, is_loading, chord_choice_bar,
        is_show_scale_rome, set_new_tonic_by_step_alter, show_scale_id, reverse_scale_show_by, chord_list
    }
})
