export interface TeacherRollHistoryDTO {
    id_attendance_roll: number,
    id_class: number,
    start_datetime: Date,
    end_datetime: Date,
    present_students: number,
    percentage: number
}