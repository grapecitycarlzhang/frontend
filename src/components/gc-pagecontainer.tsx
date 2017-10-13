import * as React from 'react'
import { Component } from 'react'
import { hashHistory, Link } from "react-router";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Menu } from "antd/lib";
import { SET_TABLE_BORDER_FOR_REDUX } from "../actions/actiontypes";
import { GCGlobal } from "grapecity-grapeleaf-common";
import { PathConfig } from "../config/pathconfig";
const mapStateToProps = (state) => {
    return {
        color: state.todo && state.todo.todo.aColor && state.todo.todo.aColor ? 'white' : 'green'
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setTableBorderForRedux: () => {
            dispatch({
                type: SET_TABLE_BORDER_FOR_REDUX,
                payload: !GCGlobal.store.getState().todo.todo.tableBorder
            });
        }
    };
}
interface GCPageContainerProps {
    // leftHeader?: string | React.ReactNode;
    // rightHeader?: string | React.ReactNode;
    color?: boolean
    setTableBorderForRedux?: () => void
}
interface GCPageContainerStates { }
@connect(mapStateToProps, mapDispatchToProps)
export class GCPageContainer extends Component<GCPageContainerProps, GCPageContainerStates> {
    renderLink(param: { title: string, pathname: string, query: any }) {
        return <Link to={{
            pathname: param.pathname,
            query: param.query
        }}>
            {param.title}
            <Icon type="right"></Icon>
        </Link>
    }
    renderMenu() {
        return <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="1">{this.renderLink({ title: 'home', pathname: PathConfig.Home, query: { title: 'home' } })}</Menu.Item>
            <Menu.Item key="2">{this.renderLink({ title: 'todo', pathname: PathConfig.ToDo, query: { title: 'todo' } })}</Menu.Item>
            <Menu.Item key="3">{this.renderLink({ title: 'todocreate', pathname: PathConfig.ToDoCreate, query: { title: 'todocreate' } })}</Menu.Item>
        </Menu>
    }
    render() {
        const { color } = this.props;

        return <Layout>
            <Layout.Header>
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        {this.renderMenu()}
                    </Col>
                    <Col><a style={{ color: color }} onClick={this.props.setTableBorderForRedux}>setTableBorderForRedux</a></Col>
                </Row>
            </Layout.Header>
            <Layout.Content>
                {this.props.children}
            </Layout.Content>
        </Layout>
    }
}
