import { ServiceBase } from 'grapecity-grapeleaf-common'
import { injectable, inject, TYPES } from '../../util';
import * as moment from 'moment';
import { IToDoService, TaskStatus, TaskPriority, ToDoModel, GetToDoRequest, ToDoRequest } from './index';

@injectable()
export class ToDoService extends ServiceBase<ToDoRequest, GetToDoRequest> implements IToDoService {
    routePrefix = { prefix: 'api/v3', itemSuffix: '{guid}' }
    getOther(data) {
        data.otherid = data.guid
        return this.request.get(this.url('others/{otherid}/other'), data);
    }
    filterToDoList(data: string[]) {
        return data.filter(d => d.startsWith('new'));
    }
    formatTaskList(taskList: ToDoModel[]) {
        taskList.map(item => {
            item.startDate = moment(item.startDate).format('YYYY-MM-DD h:mm:ss');
            item.endDate = moment(item.endDate).format('YYYY-MM-DD h:mm:ss');
            item.priority = TaskPriority[item.priority];
            item.complete = TaskStatus[item.complete];
        })
        return taskList;
    }
}