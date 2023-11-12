import { ListItemModel } from "./ListItemModel";

export type ListDataModel={
    id: number | undefined;
    id_course: number | undefined;
    enrollment: number | undefined;
    name: string | undefined;
    info?: ListItemModel;
}