import { GCResponse,GCRequest,GCPagingRequest } from "grapecity-grapeleaf-common";

export interface ToDoModel {
    guid?: string
    title?: string
    priority?: string
    startDate?: string
    endDate?: string
    complete?: string
}
export interface GetToDoRequest extends GCPagingRequest {
    title?: string
}
export interface ToDoRequest extends GCRequest, ToDoModel {
}
export interface ToDoResponse extends GCResponse, ToDoModel {
}