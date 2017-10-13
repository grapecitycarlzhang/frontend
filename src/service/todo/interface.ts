import { GetToDoRequest, ToDoRequest, ToDoModel, } from "./index";
import { ITService } from "grapecity-grapeleaf-common";

export interface IToDoService extends ITService<ToDoRequest, GetToDoRequest> {
    formatTaskList(taskList: ToDoModel[]): ToDoModel[]
    getOther(data:any):any
}