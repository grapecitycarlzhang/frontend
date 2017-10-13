import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import { FormattedMessage } from "react-intl";
import { ToDoLocale } from "../../locales/localeid";
import { TaskTabelComponent, TaskComponentProps, PaginationInfo } from "./components/taskcomponent";
import { message } from "antd/lib";
import { GCPageContainer } from "../../components";
import { lazyInject, TYPES } from '../../util/index';
import { IToDoService, ToDoModel, GetToDoRequest } from '../../service/todo/index';

interface TaskPageProps extends RouteComponentProps<any, any> { }
interface TaskPageStates {
    loading?: boolean
}
@withRouter
export class TaskPage extends Component<TaskPageProps, TaskPageStates> {
    @lazyInject(TYPES.IToDoService)
    service: IToDoService
    pagination: PaginationInfo = new PaginationInfo()
    taskTableProps: TaskComponentProps = {
        handleTableChange: this.handleTableChange.bind(this)
    }
    taskList?: ToDoModel[] = []
    componentDidMount() {
        this.getTaskList();
    }

    setTableLoading(isLoading: boolean = true) {
        this.taskTableProps.loading = isLoading;
        this.setState({ loading: isLoading });
    }
    handleTableChange(pagination: any) {
        this.pagination.index = pagination.current;
        this.getTaskList();
    }

    getTaskList() {
        const params: GetToDoRequest = {
            limit: this.pagination.limit,
            index: this.pagination.index,
            title: this.pagination.search,
        };
        this.setTableLoading();

        this.service.getItemsBy(params).then(data => {
            this.pagination.total = (data as any).totalCount;
            this.taskTableProps.pagination = this.pagination;
            this.taskTableProps.taskList = this.service.formatTaskList((data as any).data);
            this.setTableLoading(false);
        });
    }

    render() {
        return <TaskTabelComponent {...this.taskTableProps}></TaskTabelComponent>;
    }
}
