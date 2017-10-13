import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col, message } from "antd/lib";
import { TaskOperationComponent } from "./components/taskoperationcomponent";
import { lazyInject, TYPES } from '../../util';
import { TaskPriority, TaskStatus, ToDoModel, IToDoService, ToDoRequest } from '../../service/todo';

interface TaskDetailPageProps extends RouteComponentProps<any, any> { }
interface TaskDetailPageStates {
    task?: ToDoModel
}
@withRouter
export class TaskDetailPage extends Component<TaskDetailPageProps, TaskDetailPageStates> {
    @lazyInject(TYPES.IToDoService)
    service: IToDoService
    constructor(props, context) {
        super(props, context);
        this.state = {
            task: {}
        };
    }
    componentDidMount() {
        this.loadTasks();
    }

    loadTasks() {
        this.service.get({ guid: this.props.location.query.guid } as ToDoRequest).then(data => {
            this.setState({ task: data });
        });

        this.service.getOther({ guid: this.props.location.query.guid } as ToDoRequest)
    }

    render() {
        return <TaskDetailView
            header={this.props.location.query.title}
            task={this.state.task}
            form={null} />
    }
}

class TaskDetailView extends TaskOperationComponent {
    renderFormContent() {
        return <div>
            <Row><Col span={6}>Title</Col><Col>{this.props.task.title}</Col></Row>
            <Row><Col span={6}>Priority</Col><Col>{TaskPriority[this.props.task.priority]}</Col></Row>
            <Row><Col span={6}>StartDate</Col><Col>{this.props.task.startDate}</Col></Row>
            <Row><Col span={6}>EndDate</Col><Col>{this.props.task.endDate}</Col></Row>
            <Row><Col span={6}>Complete</Col><Col>{TaskStatus[this.props.task.complete]}</Col></Row>
        </div>
    }
}
