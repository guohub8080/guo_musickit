import note_meta from "./db_note_meta";
import interval from "./db_interval";
import { TAFFY } from "./taffy-min";

// 返回的是一个数据库中的一条note属性，一个是根据uid进行查找，一个是根据step与alter查找。
export const get_n_db_by_uid = (uid: number) => note_meta({ uid: uid }).first();
export const get_n_db_by_step_alter = (step: string, alter: number) =>
    note_meta({ step: step, alter: alter }).first();

export const get_step_alter_by_uid = (uid: number) => {
    const new_tonic_db: n_db = note_meta({ uid: uid }).first()
    return { step: new_tonic_db.step, alter: new_tonic_db.alter }
}

// 将一个数据进行taffy化：
export const to_db = (arr: Array<any>) => TAFFY(arr)

export interface step_alter {
    "step": string | null | false | undefined | any
    "alter"?: number | null | false | undefined | any
}
export interface n_db {
    "uid"?: number
    "step": string | null | false | undefined
    "math_name"?: string
    "alter"?: number | null | false | undefined
    "index"?: number | null | false | undefined
    "fifth_value"?: number
    "is_normal"?: boolean
    "is_black"?: boolean
    "loc_id"?: number
    "art_name"?: string
}

// 意思是 up and down
export interface ud_itv_db {
    "interval_full_description": string
    "interval_prefix": string
    "interval_num": number
    "interval_ward": string
    "target_exception"?: null | string | false
    "target_uid"?: number
    "target_step"?: string | null | false | undefined
    "target_alter"?: number | null | false | undefined
    "target_math_name"?: string
    "target_index"?:number
    "target_art_name"?: string
    "target_is_normal"?: boolean
    "target_is_black"?: boolean
    "target_loc_id"?: number
    "semi_gap"?: number

}

// 意思是 reverse
export interface r_itv_db {
    "target_uid": number
    "target_step": string | null | false | undefined
    "target_alter": number | null | false | undefined
    "target_index": number
    "target_math_name": string
    "target_art_name": string
    "target_is_normal": boolean
    "target_is_black": boolean
    "target_loc_id": boolean
    "exception": null | string
    "upward_full_description"?: string
    "upward_prefix"?: string
    "upward_num"?: number
    "upward_semi_gap"?: number
    "downward_full_description"?: string
    "downward_prefix"?: string
    "downward_num"?: number
    "downward_semi_gap"?: number
}[]

export interface notes_in_scale_db {
    "order": number,
    "uid": number,
    "art_name": string,
    "step": string,
    "alter": number,
    "loc_id": number,
    "octave": number
}

export interface degree_in_scale {
    "degree": number,
    "chord_type": number,
    "root_uid":number,
    "chord_name": string,
    "chord_term": string,
    "chord_show_term": string,
    "chord_notes":
    { "uid": number, "art_name": string, "step": string, "alter": number, "octave": number }[],

}


export interface scale_db {
    "base_uid": number,
    "base_art_name": "C",
    "base_loc_id": 1,
    "base_step": "C",
    "base_alter": 0,
    "mode_id": "ION",
    "mode_term": "Ionian",
    "mode_name": "自然大调",
    "mode_class": "中古调式",
    "mode_class_index": 1,
    "is_trans": false,
    "notes": notes_in_scale_db[]
    "degree_chord3": degree_in_scale[],
    "degree_chord7": degree_in_scale[]
}[]

export interface reverse_scale_db {
    "base_uid": number,
    "base_art_name": string,
    "base_step": string,
    "base_alter": number,
    "reverse_scale": {
        "target_tonic_uid": number,
        "target_tonic_art_name": string,
        "target_tonic_step": string,
        "target_tonic_alter": number,
        "target_mode_id": string,
        "target_mode_name": string,
        "target_mode_term": string,
        "target_tone_number": number
    }[],
    "chords_in_scale": {
        "chord_type": number,
        "chord_degree_in_scale": number,
        "chord_root_uid": number,
        "chord_root_art_name": string,
        "chord_root_step": string,
        "chord_root_alter": number,
        "chord_term": string,
        "chord_show_term": string,
        "note_order_in_chord": number,
        "target_tonic_uid": number,
        "target_tonic_art_name": string,
        "target_tonic_step": string,
        "target_tonic_alter": number,
        "target_mode_id": string,
        "target_mode_name": string,
        "target_mode_term": string
    }[]
}