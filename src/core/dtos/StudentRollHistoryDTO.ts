export interface StudentRollHistoryDTO {
    id_attendance_roll: number,
    id_class: number,
    start_datetime: Date,
    end_datetime: Date | null,
    validation: number,
    present: boolean
}