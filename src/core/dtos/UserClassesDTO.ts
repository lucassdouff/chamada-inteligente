import { ClassWeekDayModel } from "../models/ClassWeekDayModel";

export interface UserClassesDTO {
    id_class: number,
    name: string,
    code: string,
    semester: string,
    id_teacher: number,
    id_course: number,
    class_weekdays: ClassWeekDayModel[]
}
