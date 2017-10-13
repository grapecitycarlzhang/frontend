import * as React from 'react'
import { Component } from 'react';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { hashHistory, Link } from "react-router";
import { Table, Menu, Icon, Row, Col } from "antd/lib";
import { PathConfig } from "../../../config/pathconfig";
import { GCArrowDropDown } from "../../../components";
import { SET_A_COLOR_FOR_REDUX } from "../../../actions/actiontypes";
import { GCGlobal } from "grapecity-grapeleaf-common";
import { ToDoModel } from '../../../service/todo/index';

const mapStateToProps = (state) => {
    return {
        isBordered: state.todo && state.todo.todo.tableBorder
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAColorForRedux: () => {
            dispatch({
                type: SET_A_COLOR_FOR_REDUX,
                payload: !GCGlobal.store.getState().todo.todo.aColor
            });
        }
    };
}

class TaskTable extends Table<ToDoModel> { }

export class PaginationInfo {
    total: number;
    index: number;
    limit: number;
    search: string;
    constructor(index: number = 1, total: number = 0, limit: number = 3, search: string = '') {
        this.total = total;
        this.index = index;
        this.limit = limit;
        this.search = search;
    }
}

export interface TaskComponentProps {
    onlyView?: boolean
    loading?: boolean
    taskList?: ToDoModel[]
    pagination?: PaginationInfo
    handleTableChange?: (pagination: any) => void
    isBordered?: boolean
    setAColorForRedux?: () => void
}
interface TaskComponentStates {
}
@connect(mapStateToProps, mapDispatchToProps)
export class TaskTabelComponent extends Component<TaskComponentProps, TaskComponentStates> {
    tableLayout: any = {
        rowKey: 'guid',
        columns: [
            {
                title: 'Title',
                dataIndex: "title",
                width: "25%"
            }, {
                title: 'Priority',
                dataIndex: "priority",
                width: "10%",
            }, {
                title: 'StartDate',
                dataIndex: "startDate",
                width: "10%"
            }, {
                title: 'EndDate',
                dataIndex: "endDate",
                width: "10%"
            }, {
                title: 'Complete',
                dataIndex: "complete",
                width: "10%"
            }, {
                title: "Operation",
                width: "5%",
                hidden: this.props.onlyView,
                render: (text, record, index) => {
                    return <span onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}>{this.renderTaskItemOperationMenu(text, record, index)}</span>;
                }
            }
        ],
        bordered: false,
        onChange: this.props.handleTableChange,
        onRowClick: (record: ToDoModel, index) => {
            hashHistory.push({
                pathname: PathConfig.ToDoDetail,
                query: { guid: record.guid, title: 'tododetail' }
            });
        }
    };

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    componentDidMount() {
    }

    renderLink(param: { title: string, pathname: string, query: any }) {
        return <Link to={{
            pathname: param.pathname,
            query: param.query
        }}>
            {param.title}
            <Icon type="right"></Icon>
        </Link>
    }
    renderTaskItemOperationMenu(text, record: ToDoModel, index) {
        const menu = <Menu>
            <Menu.Item key="1">{this.renderLink({ title: 'tododetail', pathname: PathConfig.ToDoDetail, query: { title: 'tododetail', guid: record.guid } })}</Menu.Item>
            <Menu.Item key="2">{this.renderLink({ title: 'todoedit', pathname: PathConfig.ToDoEdit, query: { title: 'todoedit', guid: record.guid } })}</Menu.Item>
            <Menu.Item key="3">{this.renderLink({ title: 'tododelete', pathname: PathConfig.ToDoDelete, query: { title: 'tododelete', guid: record.guid } })}</Menu.Item>

        </Menu>
        return <GCArrowDropDown menu={menu} />
    }

    renderTaskView() {
        this.tableLayout.dataSource = this.props.taskList;
        this.tableLayout.bordered = this.props.isBordered;
        this.tableLayout.pagination = this.props.pagination;
        this.tableLayout.loading = this.props.loading;
        return <TaskTable {...this.tableLayout}></TaskTable>;
    }

    render() {
        return <Row>
            <Row><Col>{this.renderTaskView()}</Col></Row>
            <Row><Col><a onClick={this.props.setAColorForRedux}>setAColorForRedux</a></Col></Row>
        </Row>;
    }
}
