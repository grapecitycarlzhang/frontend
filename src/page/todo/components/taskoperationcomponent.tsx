import * as React from 'react'
import { Component } from 'react'
import { Link } from "react-router";
import { Select, Row, Col, Icon } from "antd/lib";
import { FormComponentProps } from "antd/lib/form/Form";
import { PathConfig } from "../../../config/pathconfig";
import { GCFormComponentProps } from "grapecity-grapeleaf-common";
import { TaskStatus, TaskPriority, ToDoModel } from '../../../service/todo';

export interface TaskOperationComponentProps {
    header?: string | React.ReactNode
    footer?: string | React.ReactNode
    task?: ToDoModel
    onSubmit?: (data: ToDoModel) => void
}
interface TaskOperationComponentStates { }
export abstract class TaskOperationComponent extends Component<TaskOperationComponentProps & GCFormComponentProps, TaskOperationComponentStates> {
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    statusOptions: JSX.Element[] | null = this.getOptionsBy(TaskStatus, this.getOption);
    priorityOptions: JSX.Element[] | null = this.getOptionsBy(TaskPriority, this.getOption);
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                (values as ToDoModel).guid = this.props.task.guid;
                this.props.onSubmit && this.props.onSubmit(values);
            }
        });
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    renderFormHeader() {
        return this.props.header
    }
    abstract renderFormContent()
    renderFormFooter() {
        return this.props.footer || <Link to={{
            pathname: PathConfig.ToDo
        }}>
            Back
            <Icon type="left"></Icon>
        </Link>
    }

    getOptionsBy(enumObj: any, getOption: (enumObj, value) => any) {
        let options = [];
        Object.keys(enumObj).forEach((value) => {
            if (Number.isInteger(+value)) {
                options.push(getOption(enumObj, value));
            }
        });
        return options.reverse();
    }
    getOption(enumObj, value) {
        return <Select.Option key={value} value={value}>{enumObj[value]}</Select.Option>
    }

    render() {
        return <Row><Col>
            <Row><Col>{this.renderFormHeader()}</Col></Row>
            <Row><Col>{this.renderFormContent()}</Col></Row>
            <Row><Col>{this.renderFormFooter()}</Col></Row>
        </Col></Row>
    }
}
