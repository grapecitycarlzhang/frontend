import * as React from 'react'
import { Component } from 'react'
import { withRouter, RouteComponentProps, Link } from "react-router";
import { GCGlobal } from "grapecity-grapeleaf-common";
import { ToDoLocale } from "../locales/localeid";
import { FormattedMessage } from "react-intl";

interface ToDoHomePageProps extends RouteComponentProps<any, any> {
}
interface ToDoHomePageStates {
    loading?: boolean
}

@withRouter
export class ToDoHomePage extends Component<ToDoHomePageProps, ToDoHomePageStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    render() {
        return <div style={{ background: '#fff', padding: 124, minHeight: 280, textAlign: 'center' }}>
            <h1>{GCGlobal.intl.formatMessage({ id: ToDoLocale.WelcomeTitle })}</h1>
            <h1><FormattedMessage id={ToDoLocale.WelcomeContent}></FormattedMessage></h1>
        </div>
    }
}
