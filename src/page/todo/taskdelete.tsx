import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps, hashHistory } from "react-router";
import { TaskTabelComponent, TaskComponentProps } from "./components/taskcomponent";
import { Row, Col, Button, message, Modal } from "antd/lib";
import { TaskOperationComponent } from "./components/taskoperationcomponent";
import { lazyInject, TYPES } from '../../util';
import { TaskPriority, TaskStatus, ToDoModel, IToDoService, ToDoRequest } from '../../service/todo';

interface TaskDeletePageProps extends RouteComponentProps<any, any> { }
interface TaskDeletePageStates {
    task?: ToDoModel
}
@withRouter
export class TaskDeletePage extends Component<TaskDeletePageProps, TaskDeletePageStates> {
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
    }
    deleteTask(data: ToDoModel) {
        this.service.delete(data).then(() => {
            message.success('Delete Success');
            hashHistory.goBack();
        }, () => {
            message.warning('Delete Fail');
        });
    }
    render() {
        return <TaskDeleteView
            header={this.props.location.query.title}
            task={this.state.task}
            onSubmit={this.deleteTask.bind(this)}
            form={null} />
    }
}

class TaskDeleteView extends TaskOperationComponent {
    renderFormContent() {
        return <div>
            <Row><Col span={6}>Title</Col><Col>{this.props.task.title}</Col></Row>
            <Row><Col span={6}>Priority</Col><Col>{TaskPriority[this.props.task.priority]}</Col></Row>
            <Row><Col span={6}>StartDate</Col><Col>{this.props.task.startDate}</Col></Row>
            <Row><Col span={6}>EndDate</Col><Col>{this.props.task.endDate}</Col></Row>
            <Row><Col span={6}>Complete</Col><Col>{TaskStatus[this.props.task.complete]}</Col></Row>
        </div>
    }
    renderFormFooter() {
        return <a><Button
            type="primary"
            htmlType="submit"
            onClick={() => {

                Modal.confirm({
                    title: 'Do you Want to delete the item?',
                    content: 'Some descriptions',
                    onOk: () => {
                        this.props.onSubmit({ guid: this.props.task.guid });
                    },
                    onCancel() {
                    },
                });

            }}
        >
            Delete
</Button></a>
    }
}
