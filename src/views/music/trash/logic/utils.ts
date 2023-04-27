import { music_meta, interval } from "./musicdb";

// 返回的是一个数据库中的一条note属性，一个是根据uid进行查找，一个是根据step与alter查找。
export const get_n_db_by_uid = (uid: number) => music_meta({ uid: uid }).first();
export const get_n_db_by_step_alter = (step: string, alter: number) =>
    music_meta({ step: step, alter: alter }).first();

export interface step_alter {
    "step": string | null | false | undefined |any
    "alter"?: number | null | false | undefined |any
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
    "target_art_name"?: string
    "target_is_normal"?: boolean
    "target_is_black"?: boolean
    "target_loc_id"?: number
    "semi_gap"?: number

}[]

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