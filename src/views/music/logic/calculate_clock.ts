import {computed, ComputedRef} from 'vue';

import db_interval from "./db_interval"
import db_note_meta from "./db_note_meta";
import {n_db, to_db} from "./utils"


const calculate_chord = (tonic_n_db: n_db, interval_list: [string, number][]) => {
    const calculate_interval = (base_uid: number, interval_prefix: string, interval_num: number): n_db => {
        const temp_target_interval_db = to_db(db_interval({base_uid}).first().interval_upward)({
            interval_num,
            interval_prefix
        }).first()
        // console.log(temp_target_interval_db);

        return db_note_meta({uid: temp_target_interval_db.target_uid}).first()
    }

    const new_map = interval_list.map(x => {
        // console.log("new_map",x);
        return calculate_interval(tonic_n_db.uid as number, x[0], x[1])

    })
    return [tonic_n_db, ...new_map]
}


// const a: ComputedRef<n_db[] | null[] | any> = computed(() => {


const notes_list: any = (tonic_n_db: n_db, chord_term: string) => {
    switch (chord_term) {
        case "maj3":
            return calculate_chord(tonic_n_db, [["大", 3], ["纯", 5]])
        case "maj7":
            return calculate_chord(tonic_n_db, [["大", 3], ["纯", 5], ["大", 7]])
        case "min3":
            return calculate_chord(tonic_n_db, [["小", 3], ["纯", 5]])
        case "min7":
            return calculate_chord(tonic_n_db, [["小", 3], ["纯", 5], ["小", 7]])
        case "aug3":
            return calculate_chord(tonic_n_db, [["大", 3], ["增", 5]])
        case "dim3":
            return calculate_chord(tonic_n_db, [["小", 3], ["减", 5]])
        case "dom7":
            return calculate_chord(tonic_n_db, [["大", 3], ["纯", 5], ["小", 7]])
        case "dim7":
            return calculate_chord(tonic_n_db, [["小", 3], ["减", 5], ["减", 7]])
        case "mm7":
            return calculate_chord(tonic_n_db, [["小", 3], ["纯", 5], ["大", 7]])
        case "m7b5":
            return calculate_chord(tonic_n_db, [["小", 3], ["减", 5], ["小", 7]])
        case "sus2":
            return calculate_chord(tonic_n_db, [["大", 2], ["纯", 5]])
        case "7sus2":
            return calculate_chord(tonic_n_db, [["大", 2], ["纯", 5], ["小", 7]])
        case "M7sus2":
            return calculate_chord(tonic_n_db, [["大", 2], ["纯", 5], ["大", 7]])
        case "sus4":
            return calculate_chord(tonic_n_db, [["纯", 4], ["纯", 5]])
        case "7sus4":
            return calculate_chord(tonic_n_db, [["纯", 4], ["纯", 5], ["小", 7]])
        case "M7sus4":
            return calculate_chord(tonic_n_db, [["纯", 4], ["纯", 5], ["大", 7]])
    }
    return null

}
export default notes_list
