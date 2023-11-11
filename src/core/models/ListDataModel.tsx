import { ListItemModel } from "./ListItemModel";

export type ListDataModel={
    id: number | undefined;
    name: string | undefined;
    info?: ListItemModel;
}