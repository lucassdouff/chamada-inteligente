import { ListItemModel } from "./ListItemModel";

export type ListDataModel={
    name:string;
    photo?:string;
    info?: ListItemModel;
}