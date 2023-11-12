import { ListItemModel } from "./ListItemModel";

export type ListDataModel={
    id: number | undefined;
    id_course: number | undefined;
    id_attendance: number | undefined;
    enrollment: number | undefined;
    name: string | undefined;
    info?: ListItemModel;
}